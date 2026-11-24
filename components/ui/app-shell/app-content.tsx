import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page's pane and column, from Sales Portal's layout. Put it inside `AppHeader`, around the page.
 *
 * The pane is the page's one scroll, with 20px around the column. The column is centered and at most 1440px wide, and
 * puts 20px between the page's sections (its `PageHeader`, tiles, toolbar, cards): sections stack with this gap, and
 * each owns the space inside it. A section that isn't rendered takes its gap with it. A page that needs the whole pane
 * (a board, a wide table) renders `<FullWidth />` anywhere in its markup. The column is a container, so a page lays out
 * by the width it gets (`@min-page-md:grid-cols-4`), and it's the target of a "Skip to content" link (`#content`).
 */
function AppContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="app-content"
      className="group/content flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-5"
    >
      <div
        id="content"
        tabIndex={-1}
        className={cn(
          "@container mx-auto flex w-full max-w-360 flex-1 flex-col gap-5 outline-none group-has-[[data-layout=full]]/content:max-w-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

/** Put in a page that should fill the pane instead of the centered 1440px column. It renders nothing visible. */
function FullWidth() {
  return <span data-layout="full" hidden />
}

export { AppContent, FullWidth }
