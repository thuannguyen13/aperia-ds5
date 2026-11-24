// Checks every page of the design skill against the docs' page structure and writing standard, and reports each
// finding with its file and line. It changes nothing. Run it after editing a page:
//   node scripts/check-docs.mjs             every page
//   node scripts/check-docs.mjs <file.md>…  only these pages (paths from the repo root or the skill's root)
//   node scripts/check-docs.mjs --errors    errors only, no warnings
// An error breaks the standard for certain. A warning is worth a look but can be right as it is (a rule with no live
// example yet, a section a page adds of its own). It exits 1 when any error is found.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const SKILL = join(ROOT, "plugins/aperia-ds5/skills/design")
const DOCS = join(ROOT, "docs/design-language")

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
const read = (p) => readFileSync(p, "utf8")
const rel = (p) => relative(ROOT, p)

// ── The page structure ───────────────────────────────────────────────────────────────────────────────────────────────

// Every page's sections, in order. "Anatomy" is optional and sits after What is available.
const STANDARD = [
  "When to use",
  "What is available",
  "Anatomy?",
  "How it looks and behaves",
  "Rules",
  "When you can do it differently",
  "Works with",
  "In code",
]
// An Examples page shows a screen: it has no What is available, adds Before and after ahead of Rules, and names the
// patterns it uses instead of Works with.
const EXAMPLE = [
  "When to use",
  "How it looks and behaves",
  "Before and after",
  "Rules",
  "When you can do it differently",
  "Which patterns it uses",
  "In code",
]
/** The sections a page must have, by its folder; undefined for a page with its own layout (Get Started, SKILL.md). */
function layoutOf(file) {
  if (file.startsWith("examples/")) return EXAMPLE
  if (/^(foundations|styles|components|patterns)\//.test(file)) return STANDARD
  return undefined
}

// ── Reading a page ───────────────────────────────────────────────────────────────────────────────────────────────────

/** A page's lines with what each one is: front matter, a fenced code line, a table row, a heading, or prose. */
function linesOf(text) {
  const lines = text.split("\n")
  const out = []
  let fence = false
  let front = lines[0]?.startsWith("---")
  let section = ""
  lines.forEach((line, i) => {
    let kind = "prose"
    if (front) {
      kind = "front"
      // Front matter ends at a line that ends with ---, even when the closing --- shares a line with text.
      if (i > 0 && /---\s*$/.test(line)) front = false
      else if (i === 0 && /---\s*$/.test(line.slice(3))) front = false
    } else if (/^\s*(```|~~~)/.test(line)) {
      kind = "code"
      fence = !fence
    } else if (fence) kind = "code"
    else if (/^\s*\|/.test(line)) kind = "table"
    else if (/^#{1,6} /.test(line)) {
      kind = "heading"
      if (line.startsWith("## ")) section = line.slice(3).trim()
    } else if (!line.trim()) kind = "blank"
    else if (/^\s*<!--/.test(line)) kind = "comment"
    out.push({ n: i + 1, text: line, kind, section })
  })
  return out
}

/** Prose blocks: a paragraph, or one list item with its indented continuation lines. */
function blocksOf(lines) {
  const blocks = []
  let block = null
  for (const line of lines) {
    if (line.kind !== "prose" && line.kind !== "heading") {
      if (block) blocks.push(block)
      block = null
      continue
    }
    const item = /^\s*([-*+]|\d+\.)\s/.test(line.text)
    if (line.kind === "heading" || item || !block) {
      if (block) blocks.push(block)
      block = { lines: [line], heading: line.kind === "heading" }
      if (line.kind === "heading") {
        blocks.push(block)
        block = null
      }
    } else block.lines.push(line)
  }
  if (block) blocks.push(block)
  return blocks
}

/**
 * A block's text with code spans, link targets, and quoted UI text masked out, keeping every other character at its
 * place, so an offset still points at its line.
 */
function maskOf(text) {
  const blank = (s) => s.replace(/[^\n]/g, " ")
  return text
    .replace(/`[^`]*`/g, blank)
    .replace(/\]\([^)]*\)/g, (m) => "]" + blank(m.slice(1)))
    .replace(/<https?:[^>]*>|https?:\/\/\S+/g, blank)
    .replace(/"[^"]*"|“[^”]*”/g, blank)
}

/** The line number of an offset in a block's joined text. */
function lineAt(block, offset) {
  let at = 0
  for (const line of block.lines) {
    at += line.text.length + 1
    if (offset < at) return line.n
  }
  return block.lines.at(-1).n
}

const joined = (block) => block.lines.map((l) => l.text).join("\n")

/** The sentences of a run of prose, with links reduced to their text. */
function sentencesOf(text) {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.?!]["”)]?)\s+(?=["“(\[`*]?[A-Z0-9])/)
    .filter(Boolean)
}

/** Headings in GitHub's anchor form: lowercase, punctuation dropped, spaces as dashes. */
const slug = (heading) =>
  heading
    .toLowerCase()
    .replace(/[^\w\- ]/g, "")
    .replace(/ /g, "-")

// ── The live examples a page's .mdx attaches ─────────────────────────────────────────────────────────────────────────

/** The top-level keys and spreads of the object literal that opens at `lines[start]`, read by its indentation. */
function objectKeys(lines, start) {
  const keys = []
  const spreads = []
  let indent
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue
    const own = line.match(/^\s*/)[0].length
    indent ??= own
    if (own < indent) break
    if (own > indent) continue
    const key = line.match(/^\s*(?:"([^"]+)"|'([^']+)'|([@\w$]+))\s*:/)
    if (key) keys.push(key[1] ?? key[2] ?? key[3])
    const spread = line.match(/^\s*\.\.\.([\w$]+)/)
    if (spread) spreads.push(spread[1])
  }
  return { keys, spreads }
}

/** The keys of `export const name = {…}` in a module, following its spreads inside the same module. */
function exportedKeys(file, name, seen = new Set()) {
  if (seen.has(name) || !existsSync(file)) return []
  seen.add(name)
  const lines = read(file).split("\n")
  const start = lines.findIndex((l) =>
    new RegExp(`^export const ${name}\\b[^=]*=\\s*\\{\\s*$`).test(l)
  )
  if (start < 0) return []
  const { keys, spreads } = objectKeys(lines, start)
  return [...keys, ...spreads.flatMap((s) => exportedKeys(file, s, seen))]
}

/** The module an .mdx imports a name from, as a file path. */
function importedFrom(mdx, text, name) {
  for (const m of text.matchAll(/import\s*\{([^}]*)\}\s*from\s*"([^"]+)"/g)) {
    const names = m[1].split(",").map((n) =>
      n
        .trim()
        .split(/\s+as\s+/)
        .pop()
    )
    if (!names.includes(name)) continue
    const base = resolve(dirname(mdx), m[2])
    return [".tsx", ".ts", "/index.tsx", "/index.ts"]
      .map((ext) => base + ext)
      .find(existsSync)
  }
  return undefined
}

/** Every skill page's .mdx and the headings its live examples are keyed to (`after`). */
function examplesByPage() {
  const byPage = new Map()
  for (const mdx of walk(DOCS).filter((f) => f.endsWith(".mdx"))) {
    const text = read(mdx)
    const page =
      text.match(/skills\/design\/([^"?]+\.md)\?raw/)?.[1] ??
      text.match(/<ComponentHome\s+guide="([^"]+)"/)?.[1]
    if (!page) continue
    // Keys written in the .mdx itself, and keys that come with a shared examples object (`after={x}` or `...x`),
    // which may hold examples meant for other pages.
    const own = []
    const pooled = []
    const lines = text.split("\n")
    const resolveName = (name) => {
      const from = importedFrom(mdx, text, name)
      return from ? exportedKeys(from, name) : []
    }
    lines.forEach((line, i) => {
      const inline = line.match(/\bafter=\{\{\s*$/)
      if (inline) {
        const found = objectKeys(lines, i)
        own.push(...found.keys)
        pooled.push(...found.spreads.flatMap(resolveName))
      }
      const named = line.match(/\bafter=\{([\w$]+)\}/)
      if (named) pooled.push(...resolveName(named[1]))
    })
    byPage.set(page, {
      mdx: rel(mdx),
      own: new Set(own),
      pooled: new Set(pooled),
      keys: new Set([...own, ...pooled]),
    })
  }
  return byPage
}

/** Every `x["…"]` an .mdx picks out of an examples object, so a pooled example used elsewhere is not stale. */
function pickedKeys() {
  const picked = new Set()
  for (const mdx of walk(DOCS).filter((f) => f.endsWith(".mdx")))
    for (const m of read(mdx).matchAll(/\[\s*"([^"]+)"\s*\]/g)) picked.add(m[1])
  return picked
}

// ── The checks ───────────────────────────────────────────────────────────────────────────────────────────────────────

const CONTRACTION =
  /\b(?:[a-z]+n['’]t|(?:it|that|there|here|what|who|let)['’]s|(?:they|we|you)['’](?:re|ll|ve|d)|i['’](?:m|ve|d|ll)|(?:it|that)['’]ll)\b/gi

/** The verdict labels and their names ("a Do and a Don't", "Don'ts") are the structure, not a contraction. */
const VERDICT_NAME =
  /\*\*Don['’]t:?\*\*|\bDon['’]ts?\b(?=\W|$)(?<=(?:\ba |\band |\/ |\bDo, |^)Don['’]ts?)/g

const LONG = 30
const VAGUE = [
  [/\bthe rest\b/gi, 'say what it is ("every entry", "the other filters")'],
  [/\bthe system\b/gi, 'name the thing ("the app", "an import")'],
  [/\bhairlines?\b/gi, 'say "divider" for a line between rows or sections, "border" for the line around a box'],
  [
    /\bowns\b|\bown space\b/gi,
    "define the parts instead of saying what a part owns",
  ],
]
/** "It is", "This keeps", "These show": a pronoun standing for something, not "This button". */
const THIS_VERB =
  /^(?:It|This|These)\s+(?:is|are|was|were|has|have|can|cannot|does|do|will|would|should|must|keeps?|makes?|means?|lets?|shows?|holds?|gives?|sits?|works?|opens?|closes?|stays?|takes?|reads?|says?|goes|go|tells?|uses?|needs?|helps?|applies|apply|matches|match|leaves?|puts?|sets?|adds?|comes?|runs?|changes?|moves?|fills?|follows?|avoids?|stops?)\b/
/** A sentence that names two or more things: a series ("A, B, and C") or two capitalized names joined by and / or. */
const namesSeveral = (sentence) =>
  /\w,\s+\w[^,.]*,?\s+(?:and|or)\s+\w/.test(sentence) ||
  /\b[A-Z][\w-]*(?:\s+[A-Z][\w-]*)*\s+(?:and|or)\s+(?:an?\s+|the\s+)?[A-Z][\w-]*/.test(
    sentence.slice(1)
  )

/** A sentence reduced for comparison: links to their text, lowercase, letters and digits only. */
const normalized = (text) =>
  text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()

/** The sentences of a run of text, each with its offset. */
function sentenceSpans(text) {
  const spans = []
  const re = /(?<=[.?!]["”)]?)\s+(?=["“(\[`*]?[A-Z0-9])/g
  let at = 0
  for (const m of text.matchAll(re)) {
    spans.push({ text: text.slice(at, m.index), at })
    at = m.index + m[0].length
  }
  spans.push({ text: text.slice(at), at })
  return spans.filter((s) => s.text.trim())
}

function checkPage(file, text, ctx) {
  const findings = []
  const add = (n, level, check, message) =>
    findings.push({ file, n, level, check, message })
  const lines = linesOf(text)
  const blocks = blocksOf(lines)
  const headings = lines.filter((l) => l.kind === "heading")
  const h2 = headings
    .filter((l) => l.text.startsWith("## "))
    .map((l) => ({ n: l.n, title: l.text.slice(3).trim() }))

  // Structure: the standard sections, each once, in order.
  const layout = layoutOf(file)
  if (layout) {
    const required = layout.filter((s) => !s.endsWith("?"))
    const known = layout.map((s) => s.replace(/\?$/, ""))
    for (const name of required)
      if (!h2.some((h) => h.title === name))
        add(h2[0]?.n ?? 1, "error", "structure", `missing section "${name}"`)
    let last = -1
    for (const h of h2) {
      const at = known.indexOf(h.title)
      if (at < 0) {
        add(
          h.n,
          "warning",
          "structure",
          `section "${h.title}" is not one of the page's standard sections`
        )
        continue
      }
      if (at < last)
        add(
          h.n,
          "error",
          "structure",
          `section "${h.title}" is out of order (expected after "${known[last]}")`
        )
      last = Math.max(last, at)
    }
    for (const name of known) {
      const dup = h2.filter((h) => h.title === name)
      if (dup.length > 1)
        add(dup[1].n, "error", "structure", `section "${name}" appears twice`)
    }
  }

  // The lead: the prose between the title and the first section.
  if (file !== "SKILL.md") {
    const title = lines.find((l) => /^# /.test(l.text))
    const firstH2 = lines.find((l) => /^## /.test(l.text))
    if (!title) add(1, "error", "lead", "no # title")
    else {
      const lead = lines.filter(
        (l) =>
          l.n > title.n && (!firstH2 || l.n < firstH2.n) && l.kind === "prose"
      )
      const sentences = sentencesOf(lead.map((l) => l.text).join(" "))
      const at = lead[0]?.n ?? title.n
      if (!sentences.length)
        add(title.n, "error", "lead", "no lead under the title")
      if (sentences.length > 2)
        add(
          at,
          "error",
          "lead",
          `lead is ${sentences.length} sentences (one, plus at most one "See …" sentence)`
        )
      else if (sentences.length === 2 && !/^See\b/.test(sentences[1]))
        add(
          at,
          "warning",
          "lead",
          `lead's second sentence is not a "See …" sentence: "${sentences[1].slice(0, 60)}…"`
        )
      if (sentences[0] && /^The\b/.test(sentences[0]))
        add(
          at,
          "error",
          "lead",
          `lead opens with "The" before the subject is introduced: "${sentences[0].slice(0, 60)}…"`
        )
    }
  }

  // Rules: each ### under Rules has a Do and a Don't, and (as a warning) a live example in the .mdx.
  const rules = h2.find((h) => h.title === "Rules")
  if (rules && layout) {
    const end = h2.find((h) => h.n > rules.n)?.n ?? Infinity
    const inRules = lines.filter((l) => l.n > rules.n && l.n < end)
    const ruleHeads = inRules.filter((l) => l.text.startsWith("### "))
    // An Examples page may point at its patterns' rules in a sentence instead of stating its own.
    if (!ruleHeads.length) {
      const prose = inRules.some((l) => l.kind === "prose")
      add(
        rules.n,
        prose ? "warning" : "error",
        "rules",
        prose
          ? "Rules states no rule of its own (no ### heading with a Do and a Don't)"
          : "Rules is empty"
      )
    }
    const examples = ctx.examples.get(file)
    ruleHeads.forEach((head, i) => {
      const stop = ruleHeads[i + 1]?.n ?? end
      const body = inRules.filter((l) => l.n > head.n && l.n < stop)
      const name = head.text.slice(4).trim()
      const has = (label) =>
        body.some((l) => new RegExp(`^- \\*\\*${label}:\\*\\*`).test(l.text))
      if (!has("Do") || !has("Don't"))
        add(
          head.n,
          "error",
          "rules",
          `rule "${name}" needs both a **Do:** and a **Don't:**`
        )
      if (!examples?.keys.has(name))
        add(
          head.n,
          "warning",
          "example",
          `rule "${name}" has no live example${examples ? ` in ${examples.mdx}` : " (the page has no .mdx)"}`
        )
    })
  }

  // Live examples keyed to a heading the page does not have never show.
  const examples = ctx.examples.get(file)
  if (examples) {
    const titles = new Set(
      headings.map((l) => l.text.replace(/^#+ /, "").trim())
    )
    for (const key of examples.keys) {
      if (key === "@intro" || titles.has(key)) continue
      // A key the .mdx writes itself is a mistake for certain. One that comes with a shared examples object may serve
      // another page (picked there as x["…"]); only one that no page picks is stale.
      if (examples.own.has(key))
        add(
          1,
          "error",
          "example",
          `${examples.mdx} keys a live example to "${key}", which is not a heading of the page`
        )
      else if (!ctx.picked.has(key))
        add(
          1,
          "warning",
          "example",
          `${examples.mdx} brings a live example keyed "${key}", which is not a heading of the page and no other page picks`
        )
    }
  }

  // Writing. Contractions and "&" are checked everywhere outside code and quoted UI text. The guidance checks (colons,
  // vague references, long sentences, rules repeated across pages) skip In code, which is written for developers.
  // SKILL.md is the agents' checklist, terse by design: it gets only the contraction, "&", and repeated-rule checks.
  const guidance = file !== "SKILL.md"
  let previous = ""
  for (const block of blocks) {
    const raw = joined(block)
    const masked = maskOf(raw)
    const noVerdicts = masked.replace(VERDICT_NAME, (m) => " ".repeat(m.length))
    for (const m of noVerdicts.matchAll(CONTRACTION))
      add(lineAt(block, m.index), "error", "contraction", `"${m[0]}"`)
    for (const m of masked.matchAll(/&(?![a-z]+;|#\d+;)/g))
      add(
        lineAt(block, m.index),
        "error",
        "ampersand",
        `"&" outside code and tables: "${context(raw, m.index)}"`
      )
    if (block.heading || block.lines[0].section === "In code") {
      previous = ""
      continue
    }

    // A colon may only end the block, to introduce the list or table under it. The verdict and Before / After labels
    // are structure; any other bold label is a warning.
    const colons = masked
      .replace(/\*\*(Do|Don['’]t|Before|After):\*\*/g, (m) =>
        " ".repeat(m.length)
      )
      .replace(/\d:\d/g, "   ")
    const tail = colons.trimEnd().length - 1
    for (const m of colons.matchAll(/:/g)) {
      if (!guidance || m.index === tail) continue
      const label =
        /^\s*(?:[-*+]|\d+\.)\s+\*\*[^*]+:\*\*/.test(raw) &&
        m.index < raw.indexOf(":**") + 2
      add(
        lineAt(block, m.index),
        label ? "warning" : "error",
        "colon",
        `${label ? "bold label with a colon" : "colon inside a sentence"}: "${context(raw, m.index)}"`
      )
    }

    // Vague references: name the thing instead.
    for (const [pattern, say] of guidance ? VAGUE : [])
      for (const m of masked.matchAll(pattern))
        add(lineAt(block, m.index), "warning", "vague", `"${m[0]}": ${say}`)

    // Sentences: long ones, an "It" or "This" whose referent is unclear, and sentences other pages repeat.
    const lead = masked.match(
      /^\s*(?:(?:[-*+]|\d+\.)\s+)?(?:\*\*(?:Do|Don['’]t|Before|After):\*\*\s*)?/
    )[0].length
    const prose = masked.slice(lead)
    for (const { text: sentence, at } of sentenceSpans(prose)) {
      const offset = lead + at
      const original = raw.slice(offset, offset + sentence.length)
      // Words as a reader meets them: quoted UI text and code spans count, link targets do not.
      const words = original
        .replace(/\]\([^)]*\)/g, "]")
        .split(/\s+/)
        .filter((w) => /\w/.test(w)).length
      if (guidance && words >= LONG)
        add(
          lineAt(block, offset),
          "warning",
          "long",
          `${words} words: "${raw
            .slice(offset, offset + 70)
            .replace(/\s+/g, " ")
            .trim()}…"`
        )
      if (
        guidance &&
        /^(It|This|These)\b/.test(sentence) &&
        THIS_VERB.test(sentence) &&
        namesSeveral(previous)
      )
        add(
          lineAt(block, offset),
          "warning",
          "referent",
          `"${sentence.split(/\s+/)[0]}" after a sentence that names several things: "${sentence.trim().slice(0, 50)}…"`
        )
      previous = sentence
      const key = normalized(original)
      // A sentence that introduces a list ("Read the pages in this order:") or points at a page is meant to repeat.
      if (
        key.split(" ").length >= 6 &&
        !/^see /.test(key) &&
        !/:\s*$/.test(original)
      )
        ctx.sentences.push({
          key,
          file,
          n: lineAt(block, offset),
          text: original.replace(/\s+/g, " ").trim(),
        })
    }
  }

  // A rule's heading, for the same rule stated on another page.
  if (rules) {
    const end = h2.find((h) => h.n > rules.n)?.n ?? Infinity
    for (const l of lines)
      if (l.n > rules.n && l.n < end && l.text.startsWith("### "))
        ctx.ruleHeads.push({
          key: normalized(l.text.slice(4)),
          file,
          n: l.n,
          text: l.text.slice(4).trim(),
        })
  }

  // Links: relative .md links must reach a page, and an anchor a heading on it.
  for (const line of lines) {
    if (line.kind === "code" || line.kind === "front") continue
    const text = line.text.replace(/`[^`]*`/g, "")
    for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
      const href = m[1]
      if (/^[a-z]+:/i.test(href) || href.startsWith("#")) continue
      const [path, anchor] = href.split("#")
      if (!path.endsWith(".md")) continue
      const target = join(dirname(join(SKILL, file)), path)
      const page = relative(SKILL, target)
      if (!existsSync(target)) {
        add(
          line.n,
          "error",
          "link",
          `link to a page that does not exist: ${href}`
        )
        continue
      }
      if (
        !ctx.inSite.has(page) &&
        page !== "SKILL.md" &&
        page !== "overview.md"
      )
        add(
          line.n,
          "warning",
          "link",
          `link to ${page}, which is not in the site map (site.ts), so Storybook opens it on GitHub`
        )
      if (anchor) {
        const slugs = read(target)
          .split("\n")
          .filter((l) => /^#{1,6} /.test(l))
          .map((l) => slug(l.replace(/^#+ /, "").trim()))
        if (!slugs.includes(anchor))
          add(
            line.n,
            "warning",
            "link",
            `link to #${anchor}, which is not a heading of ${page}`
          )
      }
    }
  }
  return findings
}

/** Up to 50 characters around an offset, on one line. */
const context = (text, at) =>
  text
    .slice(Math.max(0, at - 30), at + 20)
    .replace(/\s+/g, " ")
    .trim()

// ── Run ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const errorsOnly = args.includes("--errors")
const only = args
  .filter((a) => !a.startsWith("--"))
  .map((a) =>
    relative(
      SKILL,
      resolve(
        ROOT,
        a.startsWith("plugins/") || a.startsWith("/") ? a : join(SKILL, a)
      )
    )
  )

const site = read(join(DOCS, "site.ts"))
const inSite = new Set(
  [...site.matchAll(/\b(?:file|guide): "([^"]+)"/g)].map((m) => m[1])
)
const ctx = {
  examples: examplesByPage(),
  picked: pickedKeys(),
  inSite,
  sentences: [],
  ruleHeads: [],
}
const pages = walk(SKILL)
  .filter((f) => f.endsWith(".md"))
  .map((f) => relative(SKILL, f))
  .filter((f) => !only.length || only.includes(f))
  .sort()

// Every page is read for the cross-page checks, but only the pages asked for are reported.
const all = walk(SKILL)
  .filter((f) => f.endsWith(".md"))
  .map((f) => relative(SKILL, f))
  .sort()
const findings = all
  .flatMap((file) => checkPage(file, read(join(SKILL, file)), ctx))
  .filter((f) => pages.includes(f.file))

// A rule stated on more than one page: the same rule heading, or sentences that share most of their words (a rule
// copied and lightly reworded, such as "Each part of a card owns its space" and "Each part of a card brings its own
// space").
const SAME = 0.7
const wordsOf = (key) => new Set(key.split(" "))
function similar(a, b) {
  let shared = 0
  for (const w of a.words) if (b.words.has(w)) shared++
  return shared / (a.words.size + b.words.size - shared)
}
function repeats(items, what) {
  for (const item of items) item.words = wordsOf(item.key)
  for (const item of items) {
    if (!pages.includes(item.file)) continue
    const others = new Set()
    for (const other of items) {
      if (other.file === item.file || others.has(other.file)) continue
      if (Math.abs(other.words.size - item.words.size) > item.words.size * 0.5)
        continue
      if (other.key === item.key || similar(item, other) >= SAME)
        others.add(other.file)
    }
    if (!others.size) continue
    findings.push({
      file: item.file,
      n: item.n,
      level: "warning",
      check: "repeated",
      message: `${what} also on ${[...others].join(", ")}: "${item.text.slice(0, 60)}${item.text.length > 60 ? "…" : ""}"`,
    })
  }
}
repeats(ctx.ruleHeads, "rule heading")
repeats(ctx.sentences, "sentence")
findings.sort((a, b) => a.file.localeCompare(b.file) || a.n - b.n)
const shown = findings.filter((f) => !errorsOnly || f.level === "error")
let current
for (const f of shown) {
  if (f.file !== current) {
    current = f.file
    console.log(`\n${rel(join(SKILL, f.file))}`)
  }
  console.log(
    `  ${String(f.n).padStart(4)}  ${f.level.padEnd(7)}  ${f.check.padEnd(11)}  ${f.message}`
  )
}
const errors = findings.filter((f) => f.level === "error").length
const warnings = findings.length - errors
console.log(
  `\n${pages.length} page(s): ${errors} error(s), ${warnings} warning(s)${errorsOnly && warnings ? " (warnings hidden)" : ""}`
)
process.exit(errors ? 1 : 0)
