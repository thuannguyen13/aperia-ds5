// Read-only check of the Code Connect templates against the Figma file.
// Runs as one use_figma call; `node scripts/audit-code-connect.mjs` prints this
// file with the SPEC constant it expects prepended. Nothing in the file is changed.

const ownerCache = new Map()

function stripKey(key) {
  return key.replace(/#[^#]*$/, "")
}

function propertyOwner(node) {
  if (node.type === "COMPONENT" && node.parent && node.parent.type === "COMPONENT_SET") {
    return node.parent
  }
  return node
}

function definitionsOf(owner) {
  if (ownerCache.has(owner.id)) return ownerCache.get(owner.id)
  const defs = new Map()
  for (const [key, def] of Object.entries(owner.componentPropertyDefinitions)) {
    const options =
      def.type === "VARIANT" ? def.variantOptions : def.type === "BOOLEAN" ? ["true", "false"] : null
    // Templates may name a property by its full key ("Items#21418:2") or plain name.
    defs.set(key, { type: def.type, options })
    defs.set(stripKey(key), { type: def.type, options })
  }
  ownerCache.set(owner.id, defs)
  return defs
}

function variantLabel(variant) {
  const props = variant.variantProperties
  return props ? Object.entries(props).map(([k, v]) => `${k}=${v}`).join(", ") : variant.name
}

function predicateHolds(pred, props, defs) {
  if (pred.nand) return !pred.nand.every((c) => predicateHolds({ p: c.p, in: [c.v] }, props, defs))
  const def = defs.get(pred.p)
  if (!def || def.type !== "VARIANT" || !props) return true
  const value = props[pred.p]
  return pred.in ? pred.in.includes(value) : !pred.out.includes(value)
}

function relevantVariants(variants, when, defs) {
  if (!when) return variants
  return variants.filter((v) =>
    when.some((alternative) => alternative.every((pred) => predicateHolds(pred, v.variantProperties, defs)))
  )
}

function nameMatcher(name) {
  if (!name.includes("*")) return (n) => n === name
  const re = new RegExp(`^${name.split("*").map((s) => s.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`)
  return (n) => re.test(n)
}

// Template lookups stop at nested instance boundaries unless traverseInstances
// is set, so the plain search does the same and a deep search explains misses.
function findLayer(start, name, type, deep) {
  const matches = nameMatcher(name)
  const stack = [...(start.children || [])]
  while (stack.length) {
    const node = stack.shift()
    if (matches(node.name) && node.type === type) return node
    if ("children" in node && (deep || node.type !== "INSTANCE")) stack.push(...node.children)
  }
  return null
}

function layerAt(variant, path, type, deep) {
  let node = variant
  for (let i = 0; i < path.length; i++) {
    node = findLayer(node, path[i], i === path.length - 1 ? type : "INSTANCE", deep)
    if (!node) return null
  }
  return node
}

function sample(list) {
  return list.length > 3 ? `${list.slice(0, 3).join("; ")}; +${list.length - 3} more` : list.join("; ")
}

function checkProperty(ref, defs, where) {
  const problems = []
  const def = defs.get(ref.p)
  if (!def) return [`${where}property "${ref.p}" not found (expected ${ref.k})`]
  if (ref.k !== "ANY" && ref.k !== "CMP" && def.type !== ref.k) {
    const enumOnBoolean = ref.k === "VARIANT" && def.type === "BOOLEAN"
    if (!enumOnBoolean) problems.push(`${where}property "${ref.p}" is ${def.type}, template reads it as ${ref.k}`)
  }
  if (ref.keys && def.options) {
    const unknown = ref.keys.filter((k) => !def.options.includes(k))
    const unmapped = def.options.filter((o) => !ref.keys.includes(o))
    if (unknown.length) problems.push(`${where}enum "${ref.p}" maps unknown values: ${unknown.join(", ")}`)
    if (unmapped.length) problems.push(`${where}enum "${ref.p}" leaves options unmapped (undefined): ${unmapped.join(", ")}`)
  }
  if (ref.k === "CMP") {
    const value = String(ref.v)
    if (def.options && !def.options.includes(value)) {
      problems.push(`${where}compares "${ref.p}" to "${value}", options are: ${def.options.join(", ")}`)
    }
  }
  return problems
}

async function checkFile(file) {
  const problems = []
  const node = file.node && (await figma.getNodeByIdAsync(file.node))
  if (!node) return { problems: [`node ${file.node} not found`] }
  if (node.type === "COMPONENT" && node.parent && node.parent.type === "COMPONENT_SET") {
    problems.push(`node is one variant (${node.name}) of set "${node.parent.name}" ${node.parent.id}; connect the set`)
  } else if (node.type !== "COMPONENT" && node.type !== "COMPONENT_SET") {
    return { name: node.name, problems: [`node is a ${node.type}, not a COMPONENT or COMPONENT_SET`] }
  }
  const owner = propertyOwner(node)
  const defs = definitionsOf(owner)
  const variants = owner.type === "COMPONENT_SET" ? owner.children.filter((c) => c.type === "COMPONENT") : [owner]

  for (const ref of file.refs) {
    if (ref.k === "CHAIN") {
      const def = defs.get(ref.p)
      const missing = def && def.options ? def.options.filter((o) => !ref.vals.map(String).includes(o)) : []
      if (missing.length) {
        problems.push(
          `if-chain on "${ref.p}" has no branch for: ${missing.join(", ")} (${ref.hasElse ? "falls to else" : "renders nothing"})`
        )
      }
      continue
    }
    if (ref.k !== "LAYER" && !ref.at) {
      problems.push(...checkProperty(ref, defs, ""))
      continue
    }

    const targets = relevantVariants(variants, ref.when, defs)
    const path = ref.k === "LAYER" ? [...(ref.at || []), ref.n] : ref.at
    const type = ref.k === "LAYER" ? ref.t : "INSTANCE"
    const deep = Boolean(ref.opts && ref.opts.includes("traverseInstances"))
    const label = `${ref.k === "LAYER" ? ref.t.toLowerCase() : "layer"} "${path.join(" > ")}"`
    const missing = []
    const onlyDeep = []
    const found = []
    for (const variant of targets) {
      const layer = layerAt(variant, path, type, deep)
      if (layer) {
        found.push(layer)
      } else if (!deep && layerAt(variant, path, type, true)) {
        onlyDeep.push(variantLabel(variant))
      } else {
        missing.push(variantLabel(variant))
      }
    }
    // A read on a found layer shares its lookup with that layer's own LAYER ref,
    // which already reports where the layer is missing.
    if (ref.k === "LAYER") {
      if (targets.length && !found.length && !onlyDeep.length) {
        problems.push(`${label} not found in any of ${targets.length} relevant variant(s)`)
      } else if (missing.length) {
        problems.push(`${label} missing in ${missing.length}/${targets.length} relevant variant(s): ${sample(missing)}`)
      }
      if (onlyDeep.length) {
        problems.push(`${label} only exists inside a nested instance in ${onlyDeep.length} variant(s) (needs traverseInstances): ${sample(onlyDeep)}`)
      }
      continue
    }

    const owners = new Map()
    for (const layer of found) {
      const main = await layer.getMainComponentAsync()
      if (main) owners.set(propertyOwner(main).id, propertyOwner(main))
    }
    const nested = new Set()
    for (const nestedOwner of owners.values()) {
      for (const p of checkProperty(ref, definitionsOf(nestedOwner), `${label} (${nestedOwner.name}): `)) nested.add(p)
    }
    problems.push(...nested)
  }
  return { name: node.name, problems }
}

const results = []
let clean = 0
for (const file of SPEC.files) {
  const { name, problems } = await checkFile(file)
  if (problems.length) results.push({ file: file.f, node: file.node, name, problems })
  else clean++
}
return { checked: SPEC.files.length, clean, withProblems: results }
