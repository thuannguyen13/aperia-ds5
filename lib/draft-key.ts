// A key a row of a form's list keeps as it moves, so React and a drag keep track of it. The save drops it.
let drafted = 0
// A draft kept from before a reload brings its keys back, so a count restarted at 0 could give one twice.
const load = Math.random().toString(36).slice(2, 8)

/** A key for a row added on a form ("file-k3x9q2-4"), unique on the page and across a reload. */
export const draftKey = (prefix: string) => `${prefix}-${load}-${drafted++}`
