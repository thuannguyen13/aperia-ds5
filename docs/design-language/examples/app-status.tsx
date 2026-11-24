import brandCss from "../../../plugins/aperia-ds5/skills/design/assets/brand.example.css?raw"

// Status colors are the app's own: the library ships none, so Storybook has no `bg-status-*` classes. These examples
// stand in for an app's brand file by reading the model file (assets/brand.example.css) and writing the classes an
// app's Tailwind would generate from it, so the examples use the same class names the pages tell an app to use.

const pairs = (block: string) =>
  [...block.matchAll(/--color-(status-[\w-]+):\s*([^;]+);/g)].map(
    ([, name, value]) => [name, value.trim()] as const
  )

const light = pairs(brandCss.slice(0, brandCss.indexOf(".dark")))
const dark = pairs(brandCss.slice(brandCss.indexOf(".dark")))

const CSS = [
  `:root { ${light.map(([n, v]) => `--color-${n}: ${v};`).join(" ")} }`,
  `.dark { ${dark.map(([n, v]) => `--color-${n}: ${v};`).join(" ")} }`,
  ...light.flatMap(([name]) => [
    `.bg-${name} { background-color: var(--color-${name}); }`,
    `.text-${name} { color: var(--color-${name}); }`,
  ]),
  // The warning alert's description, which `*:data-[slot=alert-description]:text-status-amber-foreground` sets in an app.
  `[data-slot="alert"].bg-status-amber > [data-slot="alert-description"] { color: var(--color-status-amber-foreground); }`,
].join("\n")

/** The app's status classes, for an example that shows them. Render it once inside the example. */
export function AppStatusColors() {
  return <style>{CSS}</style>
}

/** A state's word and its classes, mapped once as the Status page tells an app to. */
export const STATES = {
  draft: {
    label: "Draft",
    className: "bg-status-gray text-status-gray-foreground",
  },
  inProgress: {
    label: "In Progress",
    className: "bg-status-blue text-status-blue-foreground",
  },
  active: {
    label: "Active",
    className: "bg-status-green text-status-green-foreground",
  },
  review: {
    label: "Needs Review",
    className: "bg-status-amber text-status-amber-foreground",
  },
  overdue: {
    label: "Overdue",
    className: "bg-status-red text-status-red-foreground",
  },
} as const
