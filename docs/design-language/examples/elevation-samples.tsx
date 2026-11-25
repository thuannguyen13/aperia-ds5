import { cn } from "../../../lib/utils"

const STEPS = [
  { label: "shadow-sm", className: "shadow-sm" },
  { label: "shadow-md", className: "shadow-md" },
  { label: "shadow-lg", className: "shadow-lg" },
  { label: "shadow-xl", className: "shadow-xl" },
  { label: "bg-overlay", className: "" },
]

/** Each shadow step on a card, and the overlay over half a card, on the Light page and on the Dark page. */
export function ElevationSamples() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {["", "dark"].map((mode) => (
        <div
          key={mode}
          className={cn(
            mode,
            "grid grid-cols-5 gap-3 rounded-lg bg-background p-4"
          )}
        >
          {STEPS.map((step) => (
            <div key={step.label} className="grid justify-items-center gap-2">
              <div
                className={cn(
                  "relative h-12 w-full overflow-hidden rounded-xl bg-card ring-[0.5px] ring-border",
                  step.className
                )}
              >
                {step.label === "bg-overlay" && (
                  <div className="absolute inset-y-0 right-0 left-1/2 bg-overlay" />
                )}
              </div>
              <code className="text-[10px] text-muted-foreground">
                {step.label}
              </code>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
