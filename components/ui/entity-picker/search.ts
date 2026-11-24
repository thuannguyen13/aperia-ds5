// How text is searched, for list searches and pickers alike: case, accents and punctuation aside; spaces count. Pure.

/** The text as a search reads it: accents, case and punctuation dropped, once per string rather than per position. */
const folded = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\p{M}\p{P}\p{S}]/gu, "")
    .toLocaleLowerCase()

/** Whether `text` holds what was typed. Callers trim `query`; empty matches everything. */
export function matches(text: string, query: string) {
  if (!query) return true
  return folded(text).includes(folded(query))
}

/** Whether `text` begins with what was typed, read as `matches` reads it: to rank those first. */
export const startsWith = (text: string, query: string) =>
  folded(text).startsWith(folded(query))

/**
 * Where in `text` what was typed is found, as `matches` finds it, as [start, end) in `text` itself: each character
 * folded on its own, so a match over an accent or punctuation still marks the characters as written. Null when it is
 * not there.
 */
export function matchRange(
  text: string,
  query: string
): [number, number] | null {
  const needle = folded(query)
  if (needle === "") return null
  // The folded text, and for each of its characters the place in `text` of the character it came from.
  let flat = ""
  const from: number[] = []
  const ends: number[] = []
  for (let at = 0; at < text.length; ) {
    const char = String.fromCodePoint(text.codePointAt(at)!)
    for (const each of folded(char)) {
      flat += each
      from.push(at)
      ends.push(at + char.length)
    }
    at += char.length
  }
  const start = flat.indexOf(needle)
  return start === -1 ? null : [from[start], ends[start + needle.length - 1]]
}
