#!/usr/bin/env node
/**
 * audit-code-connect.mjs
 *
 * Reads every Code Connect template (components/**\/*.figma.ts, icons excluded)
 * and lists each Figma reference it makes: properties, enum keys, compared
 * variant values and layer names, with the variant conditions they sit under.
 * scripts/audit-code-connect.figma.js checks that list against the Figma file.
 *
 * Usage (from aperia-ds5/):
 *   node scripts/audit-code-connect.mjs          # code to paste into one use_figma call
 *   node scripts/audit-code-connect.mjs --spec   # the JSON spec only
 */

import { readdirSync, readFileSync } from "fs"
import { join, dirname, relative } from "path"
import { fileURLToPath } from "url"
import ts from "typescript"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const COMPONENTS_DIR = join(ROOT, "components")
const ICON_DIR = join(COMPONENTS_DIR, "ui", "icon")

const METHOD_KIND = {
  getString: "TEXT",
  string: "TEXT",
  getBoolean: "BOOLEAN",
  boolean: "BOOLEAN",
  getEnum: "VARIANT",
  enum: "VARIANT",
  getInstanceSwap: "INSTANCE_SWAP",
  instance: "INSTANCE_SWAP",
  getSlot: "SLOT",
  slot: "SLOT",
  getPropertyValue: "ANY",
}

function templateFiles() {
  return readdirSync(COMPONENTS_DIR, { recursive: true })
    .filter((f) => f.endsWith(".figma.ts"))
    .map((f) => join(COMPONENTS_DIR, f))
    .filter((f) => !f.startsWith(ICON_DIR))
    .sort()
}

function unwrap(node) {
  while (
    ts.isParenthesizedExpression(node) ||
    ts.isNonNullExpression(node) ||
    ts.isAsExpression(node)
  ) {
    node = node.expression
  }
  return node
}

function literalValue(node) {
  node = unwrap(node)
  if (ts.isStringLiteralLike(node)) return node.text
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  return undefined
}

function keyText(name) {
  return ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)
    ? name.text
    : name.getText()
}

function auditFile(path) {
  const text = readFileSync(path, "utf8")
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true)
  const nodeId = text.match(/^\/\/ url=\S*node-id=([\d]+)[-:]([\d]+)/m)
  const refs = new Map()
  const notes = []
  const vars = new Map()

  // Property definitions are set-wide, so only layer lookups and reads on a
  // found layer depend on which variants a branch runs in.
  function addRef(ref, when) {
    const key = JSON.stringify(ref)
    const entry = refs.get(key) ?? { ...ref, when: [] }
    entry.when.push(ref.k === "LAYER" || ref.at ? normalize(when) : [])
    refs.set(key, entry)
  }

  // A target is the instance a call reads from: the selected instance (at = [])
  // or a layer reached through findInstance (at = its layer path).
  function resolveTarget(expr) {
    expr = unwrap(expr)
    if (ts.isPropertyAccessExpression(expr) && expr.expression.getText() === "figma") {
      const name = expr.name.text
      if (name === "selectedInstance" || name === "currentLayer" || name === "properties") {
        return { at: [] }
      }
    }
    if (ts.isIdentifier(expr)) return vars.get(expr.text) ?? null
    if (
      ts.isCallExpression(expr) &&
      ts.isPropertyAccessExpression(expr.expression) &&
      expr.expression.name.text === "findInstance"
    ) {
      const parent = resolveTarget(expr.expression.expression)
      const name = literalValue(expr.arguments[0])
      if (parent && typeof name === "string") return { at: [...parent.at, name] }
    }
    return null
  }

  function parseCondition(expr) {
    expr = unwrap(expr)
    if (ts.isBinaryExpression(expr)) {
      const op = expr.operatorToken.kind
      // Migrated nested reads guard with `layer.type !== "ERROR"`: no variant constraint.
      if (ts.isPropertyAccessExpression(expr.left) && expr.left.name.text === "type") return []
      if (op === ts.SyntaxKind.AmpersandAmpersandToken) {
        const left = parseCondition(expr.left)
        const right = parseCondition(expr.right)
        return left && right ? [...left, ...right] : null
      }
      if (op === ts.SyntaxKind.EqualsEqualsEqualsToken || op === ts.SyntaxKind.EqualsEqualsToken) {
        for (const [call, value] of [
          [expr.left, expr.right],
          [expr.right, expr.left],
        ]) {
          const c = unwrap(call)
          const v = literalValue(value)
          if (
            v !== undefined &&
            ts.isCallExpression(c) &&
            ts.isPropertyAccessExpression(c.expression) &&
            c.expression.name.text === "getPropertyValue"
          ) {
            const target = resolveTarget(c.expression.expression)
            const p = literalValue(c.arguments[0])
            if (target && target.at.length === 0 && typeof p === "string") return [{ p, v }]
          }
        }
      }
    }
    return null
  }

  function normalize(when) {
    const byProp = new Map()
    const rest = []
    for (const pred of when) {
      if (!pred.p) {
        rest.push(pred)
        continue
      }
      const cur = byProp.get(pred.p) ?? { p: pred.p, out: [] }
      if (pred.in) cur.in = cur.in ? cur.in.filter((v) => pred.in.includes(v)) : [...pred.in]
      if (pred.out) cur.out.push(...pred.out)
      byProp.set(pred.p, cur)
    }
    const merged = [...byProp.values()].map((c) =>
      c.in ? { p: c.p, in: c.in.filter((v) => !c.out.includes(v)) } : { p: c.p, out: c.out }
    )
    return [...merged, ...rest]
  }

  function negate(conds) {
    return conds.length === 1 ? { p: conds[0].p, out: [conds[0].v] } : { nand: conds }
  }

  function visitBranches(node, when, test, whenTrue, whenFalse) {
    const conds = parseCondition(test)
    if (!conds) {
      notes.push(`unparsed condition: ${test.getText().replace(/\s+/g, " ")}`)
      visit(test, when)
      visit(whenTrue, when)
      if (whenFalse) visit(whenFalse, when)
      return
    }
    for (const { p, v } of conds) addRef({ k: "CMP", p, v }, when)
    visit(whenTrue, [...when, ...conds.map(({ p, v }) => ({ p, in: [v] }))])
    if (whenFalse) visit(whenFalse, conds.length ? [...when, negate(conds)] : when)
  }

  // An if / else-if chain that tests one property gets a coverage check.
  function recordChain(node, when) {
    const vals = []
    let p
    let link = node
    while (link && ts.isIfStatement(link)) {
      const conds = parseCondition(link.expression)
      if (!conds || conds.length !== 1 || (p && conds[0].p !== p)) return
      p = conds[0].p
      vals.push(conds[0].v)
      link = link.elseStatement
    }
    addRef({ k: "CHAIN", p, vals, hasElse: Boolean(link) }, when)
  }

  function visitCall(node, when) {
    const callee = node.expression
    if (!ts.isPropertyAccessExpression(callee)) return false
    const method = callee.name.text
    const target = resolveTarget(callee.expression)
    if (!target) return false
    const at = target.at.length ? { at: target.at } : {}
    const [first, second] = node.arguments
    const name = first && literalValue(first)

    if (method === "findInstance" || method === "findText") {
      if (typeof name !== "string") return false
      const opts = second && ts.isObjectLiteralExpression(second) ? { opts: second.getText() } : {}
      addRef({ k: "LAYER", t: method === "findText" ? "TEXT" : "INSTANCE", n: name, ...at, ...opts }, when)
      visit(callee.expression, when)
      return true
    }
    if (method === "children") {
      const list = first && ts.isArrayLiteralExpression(unwrap(first)) ? unwrap(first).elements : [first]
      for (const el of list) {
        const n = el && literalValue(el)
        if (typeof n === "string") addRef({ k: "LAYER", t: "INSTANCE", n, ...at }, when)
      }
      return true
    }
    const kind = METHOD_KIND[method]
    if (!kind || typeof name !== "string") return false

    const mapping = second && unwrap(second)
    if (kind === "VARIANT" && mapping && ts.isObjectLiteralExpression(mapping)) {
      const props = mapping.properties.filter(ts.isPropertyAssignment)
      addRef({ k: kind, p: name, keys: props.map((a) => keyText(a.name)), ...at }, when)
      for (const a of props) {
        visit(a.initializer, at.at ? when : [...when, { p: name, in: [keyText(a.name)] }])
      }
    } else {
      addRef({ k: kind, p: name, ...at }, when)
      if (mapping) visit(mapping, when)
    }
    visit(callee.expression, when)
    return true
  }

  function visit(node, when) {
    if (!node) return
    if (ts.isIfStatement(node)) {
      if (!(ts.isIfStatement(node.parent) && node.parent.elseStatement === node)) {
        recordChain(node, when)
      }
      return visitBranches(node, when, node.expression, node.thenStatement, node.elseStatement)
    }
    if (ts.isConditionalExpression(node)) {
      return visitBranches(node, when, node.condition, node.whenTrue, node.whenFalse)
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const target = resolveTarget(node.initializer)
      if (target && target.at.length) vars.set(node.name.text, target)
    }
    if (ts.isCallExpression(node)) {
      const method = ts.isPropertyAccessExpression(node.expression) && node.expression.name.text
      if (/^find(Connected|Layers)/.test(method || "")) notes.push(`not audited: ${method}()`)
      if (visitCall(node, when)) return
    }
    ts.forEachChild(node, (child) => visit(child, when))
  }

  visit(source, [])

  return {
    f: relative(ROOT, path),
    node: nodeId ? `${nodeId[1]}:${nodeId[2]}` : null,
    refs: [...refs.values()].map(({ when, ...ref }) => {
      const alternatives = [...new Set(when.map((w) => JSON.stringify(w)))].map((w) => JSON.parse(w))
      if (alternatives.some((w) => w.length === 0)) return ref
      const single = alternatives.every((w) => w.length === 1 && w[0].in && w[0].p === alternatives[0][0].p)
      return single
        ? { ...ref, when: [[{ p: alternatives[0][0].p, in: alternatives.flatMap((w) => w[0].in) }]] }
        : { ...ref, when: alternatives }
    }),
    ...(notes.length ? { notes: [...new Set(notes)] } : {}),
  }
}

const spec = { files: templateFiles().map(auditFile) }

if (process.argv.includes("--spec")) {
  console.log(JSON.stringify(spec))
} else {
  const check = readFileSync(join(__dirname, "audit-code-connect.figma.js"), "utf8")
  console.log(`const SPEC = ${JSON.stringify(spec)}\n\n${check}`)
}
