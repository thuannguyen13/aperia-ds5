import * as React from "react"
import type { ReactNode } from "react"
import { Unstyled } from "@storybook/addon-docs/blocks"
import { TooltipProvider } from "aperia-ds5"
import { cn } from "@/lib/utils"

// Live states for the docs: a component shown hovered, focused or pressed without a pointer or a keyboard. Nothing is
// restyled. Every rule in the page's stylesheets that reacts to :hover, :focus-visible, :focus, :focus-within or
// :active also matches inside an element marked `data-force`, so the component's own classes draw the state.

export type ForcedState = "hover" | "focus" | "active"

const PSEUDO = /:(hover|focus-visible|focus-within|focus|active)(?![\w-])/g
const STATE_OF: Record<string, ForcedState> = {
  hover: "hover",
  "focus-visible": "focus",
  "focus-within": "focus",
  focus: "focus",
  active: "active",
}

/** `:hover` → `:is(:hover, [data-force~="hover"], [data-force~="hover"] *)`, so the rule's specificity is unchanged. */
const widen = (selector: string) =>
  selector.replace(PSEUDO, (match, name: string) => {
    const mark = `[data-force~="${STATE_OF[name]}"]`
    return `:is(${match}, ${mark}, ${mark} *)`
  })

function visit(rules: CSSRuleList) {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) {
      const text = rule.selectorText
      if (text && !text.includes("data-force") && text.match(PSEUDO)) {
        try {
          rule.selectorText = widen(text)
        } catch {
          // A selector the browser will not take back (a pseudo-element before the state) stays as it was.
        }
      }
    }
    if (rule instanceof CSSImportRule && rule.styleSheet) {
      try {
        visit(rule.styleSheet.cssRules)
      } catch {
        // Another origin's sheet cannot be read.
      }
    }
    // Media, layers, supports, and nested style rules hold rules of their own.
    const inner = (rule as CSSRule & { cssRules?: CSSRuleList }).cssRules
    if (inner) visit(inner)
  }
}

function widenAll() {
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      visit(sheet.cssRules)
    } catch {
      // Another origin's sheet cannot be read.
    }
  }
}

let installed = false

/** Widens the page's state rules once, and again when a stylesheet changes (a reload of the styles in development). */
function install() {
  if (installed || typeof document === "undefined") return
  installed = true
  widenAll()
  let timer = 0
  new MutationObserver(() => {
    window.clearTimeout(timer)
    timer = window.setTimeout(widenAll, 50)
  }).observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true,
  })
}

/** Props that show an element (and what it holds) in a state: `<Button {...forceState("hover")}>`. */
export const forceState = (...states: ForcedState[]) => ({
  "data-force": states.join(" "),
})

/**
 * A component's states side by side: one column per state, and one row per variant when `rows` has several. Each cell
 * is the real component, with `forceState` on it for a hover, focus or pressed look.
 */
export function StateTable({
  states,
  rows,
  caption,
}: {
  states: string[]
  rows: { label?: string; cells: ReactNode[] }[]
  caption?: ReactNode
}) {
  React.useEffect(install, [])
  const labelled = rows.some((row) => row.label)
  return (
    <Unstyled>
      <TooltipProvider>
        <figure className="my-4">
          <div className="overflow-x-auto rounded-xl bg-background text-sm text-foreground ring-[0.5px] ring-border">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {labelled && <th aria-label="Type" />}
                  {states.map((state) => (
                    <th
                      key={state}
                      scope="col"
                      className="px-4 pt-5 pb-1 text-center text-xs font-medium text-muted-foreground"
                    >
                      {state}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, r) => (
                  <tr key={r}>
                    {labelled && (
                      <th
                        scope="row"
                        className="py-3 pr-2 pl-5 text-left text-xs font-medium whitespace-nowrap text-muted-foreground"
                      >
                        {row.label}
                      </th>
                    )}
                    {row.cells.map((cell, c) => (
                      <td
                        key={c}
                        className={cn(
                          "px-4 py-3 text-center",
                          r === rows.length - 1 && "pb-6"
                        )}
                      >
                        <span className="inline-flex justify-center">
                          {cell}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {caption && (
            <figcaption className="mt-2 text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </figure>
      </TooltipProvider>
    </Unstyled>
  )
}

/**
 * States too large for a table cell (a card, a dialog), each in its own frame with its name under it. `flush` drops the
 * frame's padding, for a state drawn in its own story frame (a dialog over its overlay).
 */
export function StateCards({
  items,
  flush = false,
  className,
}: {
  items: { label: string; node: ReactNode }[]
  flush?: boolean
  className?: string
}) {
  React.useEffect(install, [])
  return (
    <Unstyled>
      <TooltipProvider>
        <div
          className={cn(
            "my-4 grid gap-4",
            items.length >= 3 ? "md:grid-cols-3" : "sm:grid-cols-2",
            className
          )}
        >
          {items.map((item) => (
            <figure key={item.label} className="flex min-w-0 flex-col">
              <div
                className={cn(
                  "flex-1 overflow-hidden rounded-xl bg-background text-sm text-foreground ring-[0.5px] ring-border",
                  flush ? "block" : "flex items-center justify-center p-6"
                )}
              >
                {item.node}
              </div>
              <figcaption className="mt-2 text-sm text-muted-foreground">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </TooltipProvider>
    </Unstyled>
  )
}

/** Installs the state rules for a page whose states sit in a plain example (a table's rows). */
export function useForcedStates() {
  React.useEffect(install, [])
}
