"use client"

import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb/breadcrumb"
import { SidebarToggle, type AppLinkComponent } from "@/components/ui/app-shell/app-sidebar"

/** Crumbs before the page's own title. One without `href` names a level that has no page of its own. */
export type AppCrumbs = { label: string; href?: string }[]

const Crumb = React.createContext<HTMLElement | null>(null)
const SetTrail = React.createContext<(trail: AppCrumbs | null) => void>(() => {})

/**
 * The top bar, the same on every page: the sidebar toggle (below md, where the rail is a sheet) and the breadcrumb,
 * nothing else. No title, status or filters: each page names itself in its own `PageHeader`, whose title fills the
 * breadcrumb's last crumb. `crumbs` are those before it, from the route: the section on a record's page, none on the
 * section's own page. Without `crumbs` (a page outside every section) the bar shows `fallback`, such as the product
 * name. Wrap the page content in it, inside `SidebarInset`.
 */
export function AppHeader({
  crumbs,
  fallback,
  link: Link = "a",
  className,
  children,
}: {
  crumbs?: AppCrumbs
  fallback?: React.ReactNode
  link?: AppLinkComponent
  className?: string
  children: React.ReactNode
}) {
  // Held in state rather than looked up by id, so a page mounting in the same commit as its crumb still finds it.
  const [crumb, setCrumb] = React.useState<HTMLElement | null>(null)
  // The crumbs before the last, set by a page that sits under another record rather than under its section.
  const [trail, setTrail] = React.useState<AppCrumbs | null>(null)
  const shown = trail ?? crumbs

  return (
    <Crumb value={crumb}>
      <SetTrail value={setTrail}>
        <header className={cn("flex h-14 shrink-0 items-center gap-2 border-b bg-background px-5", className)}>
          {/* Wider than md the toggle lives in the rail's header. */}
          <SidebarToggle className="-ml-1.5 md:hidden" />
          {shown ? (
            <Breadcrumb className="min-w-0">
              <BreadcrumbList className="flex-nowrap text-base font-medium tracking-tight">
                {shown.map((item, at, all) => (
                  <React.Fragment key={at}>
                    {/* On a phone a long trail would cut every crumb short, so it keeps only the nearest. */}
                    <BreadcrumbItem className={cn("min-w-0", at < all.length - 1 && "max-sm:hidden")}>
                      {item.href ? (
                        <BreadcrumbLink asChild>
                          <Link href={item.href} className="truncate">
                            {item.label}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                        <span className="truncate">{item.label}</span>
                      )}
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className={cn(at < all.length - 1 && "max-sm:hidden")} />
                  </React.Fragment>
                ))}
                <BreadcrumbItem ref={setCrumb} className="min-w-0" />
              </BreadcrumbList>
            </Breadcrumb>
          ) : (
            <span className="text-base font-medium tracking-tight">{fallback}</span>
          )}
        </header>
        {children}
      </SetTrail>
    </Crumb>
  )
}

/**
 * The top bar's last crumb alone, for a page that names its record in its content rather than a `PageHeader`.
 * `parents` replace the route's crumbs, for a page that sits under another record wherever it is opened from.
 */
export function PageCrumb({ title, parents }: { title: string; parents?: AppCrumbs }) {
  const crumb = React.use(Crumb)
  const setTrail = React.use(SetTrail)
  // Compared by value: a page passes a new array each render.
  const trail = parents && JSON.stringify(parents)
  React.useEffect(() => {
    if (!trail) return
    setTrail(JSON.parse(trail))
    return () => setTrail(null)
  }, [trail, setTrail])
  return crumb && createPortal(<BreadcrumbPage className="truncate font-medium">{title}</BreadcrumbPage>, crumb)
}

/** A small label over its value, one of a `PageHeader`'s properties, or any row of facts in a `<dl>`. */
export function PageProperty({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="flex min-h-5 items-center">{children}</dd>
    </div>
  )
}

/**
 * Every page's header, in one layout: `media` (a 48px picture), the title, which is also the top bar's last crumb, and
 * a one-line `subtitle` under it; `actions` (secondary buttons, then the primary) and `menu` (such as `RecordActions`)
 * at the end of the title's line; then `properties`, label over value. Filters, tiles, toolbars and tabs are content,
 * not header. The title's line is at least a button's height, so a page without actions lines up with one that has
 * them. On a phone the menu stays on the title's line and the buttons take a full-width row under it, primary first.
 */
export function PageHeader({
  title,
  parents,
  media,
  subtitle,
  actions,
  menu,
  properties,
  className,
}: {
  title: string
  /** The crumbs before the title, for a record that sits under another one; see `PageCrumb`. */
  parents?: AppCrumbs
  media?: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactNode
  menu?: React.ReactNode
  /** Label and value pairs; a false entry is left out. */
  properties?: (readonly [string, React.ReactNode] | false)[]
  className?: string
}) {
  const shown = properties?.filter((pair) => pair !== false) ?? []
  return (
    <header data-slot="page-header" className={cn("flex shrink-0 flex-col gap-4", className)}>
      <PageCrumb title={title} parents={parents} />
      {/* Buttons 8px apart, the actions' and the menu's alike; the media keeps 14px to the title. */}
      <div className="flex min-h-9 flex-wrap items-center gap-x-2 gap-y-4">
        {media && <div className="mr-1.5 flex shrink-0">{media}</div>}
        <div className="flex min-w-0 flex-1 basis-0 flex-col">
          {/* A 36px line, the row's own height: the title starts at the same place with a subtitle or without. */}
          <h1 className="text-2xl leading-9 font-semibold tracking-tight wrap-anywhere">{title}</h1>
          {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
        </div>
        {actions && (
          <div className="flex shrink-0 gap-2 max-sm:order-last max-sm:basis-full max-sm:flex-row-reverse max-sm:*:flex-1">
            {actions}
          </div>
        )}
        {menu && <div className="flex shrink-0">{menu}</div>}
      </div>
      {shown.length > 0 && (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:flex sm:flex-wrap sm:gap-x-9">
          {shown.map(([label, value]) => (
            <PageProperty key={label} label={label}>
              {value}
            </PageProperty>
          ))}
        </dl>
      )}
    </header>
  )
}
