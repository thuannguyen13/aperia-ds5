import * as React from "react"

// A color as the browser resolves it, so the docs never hold a copy of a value: `styles/base.css` stays the one source.
// Inside a `.dark` cell, the swatch takes the Dark value of its token.

/** "#0058cc", or "#000000 at 10%" for a see-through color, read by painting the computed color on a canvas. */
function readable(color: string) {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 1
  const context = canvas.getContext("2d")
  if (!context) return color
  context.fillStyle = color
  context.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data
  const hex = `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`
  return a === 255 ? hex : `${hex} at ${Math.round((a / 255) * 100)}%`
}

/** Each token's swatch and the value the browser reads, in the mode of the cell it sits in. */
export function LiveColor({ tokens }: { tokens: string[] }) {
  return (
    <span className="flex flex-col gap-1.5">
      {tokens.map((token) => (
        <Swatch key={token} token={token} />
      ))}
    </span>
  )
}

function Swatch({ token }: { token: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [value, setValue] = React.useState("")
  React.useEffect(() => {
    if (ref.current)
      setValue(readable(getComputedStyle(ref.current).backgroundColor))
  }, [token])
  return (
    <span className="flex items-center gap-2.5">
      <span
        ref={ref}
        className="size-6 shrink-0 rounded-md ring-[0.5px] ring-foreground/20"
        style={{ background: `var(${token})` }}
      />
      <span className="font-mono text-xs whitespace-nowrap text-foreground tabular-nums">
        {value}
      </span>
    </span>
  )
}
