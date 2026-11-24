import { useLayoutEffect, useRef, useState } from "react"
import { Unstyled } from "@storybook/addon-docs/blocks"
import { Separator, ToggleGroup, ToggleGroupItem } from "aperia-ds5"
import { cn } from "@/lib/utils"

import titanQueue1280 from "../assets/before/titan-queue-1280.jpg"
import titanQueue390 from "../assets/before/titan-queue-390.jpg"
import titanList1280 from "../assets/before/titan-list-1280.jpg"
import titanList390 from "../assets/before/titan-list-390.jpg"
import titanRecord1280 from "../assets/before/titan-record-1280.jpg"
import titanRecord390 from "../assets/before/titan-record-390.jpg"
import portalDashboard1280 from "../assets/before/sales-portal-dashboard-1280.jpg"
import portalDashboard390 from "../assets/before/sales-portal-dashboard-390.jpg"
import portalList1280 from "../assets/before/sales-portal-list-1280.jpg"
import portalList390 from "../assets/before/sales-portal-list-390.jpg"
import portalRecord1280 from "../assets/before/sales-portal-record-1280.jpg"
import portalRecord390 from "../assets/before/sales-portal-record-390.jpg"

// Titan and Sales Portal before aperia-ds5 0.3, as screenshots, against the same screens built from aperia-ds5, as live
// stories in the app shell. One grid per kind of screen: Before and After down the side, the two apps across the top.

type Device = "desktop" | "phone"
const SIZE = {
  desktop: { width: 1280, height: 800 },
  phone: { width: 390, height: 844 },
}

/** One app's screen: its screenshots before, and the story id of the screen built from aperia-ds5. */
type AppScreen = {
  before: Record<Device, string>
  after: string
}

/** One window, scaled to the cell's width: a screenshot, or a story in its own window so it lays out by that width. */
function Window({
  device,
  image,
  story,
  label,
}: {
  device: Device
  image?: string
  story?: string
  label: string
}) {
  const box = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const element = box.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width)
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const size = SIZE[device]
  // A phone shows at most 320px wide, its Before and After side by side.
  const shown = device === "phone" ? Math.min(width, 320) : width
  const scale = shown / size.width
  const src = story ? `iframe.html?id=${story}&viewMode=story` : image
  return (
    <div ref={box} className="min-w-0">
      {scale > 0 && (
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${label} in a new tab`}
          className="block overflow-hidden rounded-xl ring-[0.5px] ring-border transition-shadow hover:shadow-md"
          style={{ width: shown, height: size.height * scale }}
        >
          {story ? (
            <iframe
              src={src}
              title={label}
              loading="lazy"
              tabIndex={-1}
              className="pointer-events-none origin-top-left border-0"
              style={{
                width: size.width,
                height: size.height,
                transform: `scale(${scale})`,
              }}
            />
          ) : (
            <img src={image} alt={label} className="block w-full" />
          )}
        </a>
      )}
    </div>
  )
}

/**
 * A screen of both apps, one app at a time: its Before and its After, each at the page's full width on a desktop and
 * side by side on a phone, so the screen reads at a usable size.
 */
function Compare({
  titan,
  portal,
  name,
}: {
  titan: AppScreen
  portal: AppScreen
  name: string
}) {
  const [app, setApp] = useState<"Titan" | "Sales Portal">("Titan")
  const [device, setDevice] = useState<Device>("desktop")
  const screen = app === "Titan" ? titan : portal
  return (
    <Unstyled>
      <figure className="my-4 flex flex-col gap-3 text-sm text-foreground">
        <div className="flex flex-wrap items-center gap-2">
          {/* Two choices, each a joined group, with a line between them. */}
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            spacing={0}
            aria-label="App"
            value={app}
            onValueChange={(next) => next && setApp(next as typeof app)}
          >
            <ToggleGroupItem value="Titan">Titan</ToggleGroupItem>
            <ToggleGroupItem value="Sales Portal">Sales Portal</ToggleGroupItem>
          </ToggleGroup>
          <Separator orientation="vertical" className="mx-1 h-5" />
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            spacing={0}
            aria-label="Screen width"
            value={device}
            onValueChange={(next) => next && setDevice(next as Device)}
          >
            <ToggleGroupItem value="desktop">Desktop</ToggleGroupItem>
            <ToggleGroupItem value="phone">Phone</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div
          className={cn(
            "grid gap-4 rounded-xl bg-muted/50 p-4 ring-[0.5px] ring-border",
            device === "phone" && "grid-cols-2 justify-items-center"
          )}
        >
          {(["Before", "After"] as const).map((when) => (
            <div key={when} className="flex min-w-0 flex-col gap-2">
              <span
                className={cn(
                  "text-xs font-semibold tracking-wide uppercase",
                  when === "Before" ? "text-destructive" : "text-primary"
                )}
              >
                {when}
              </span>
              <Window
                device={device}
                label={`${app} ${name}, ${when.toLowerCase()}`}
                {...(when === "Before"
                  ? { image: screen.before[device] }
                  : { story: screen.after })}
              />
            </div>
          ))}
        </div>
        <figcaption className="text-muted-foreground">
          Before is the app as it ships on its own styles. After is the same
          screen built from aperia-ds5. Select a screen to open it at full size.
        </figcaption>
      </figure>
    </Unstyled>
  )
}

const titanStory = (name: string) =>
  `design-language-examples-titan-screens--${name}`
const screenStory = (name: string) =>
  `design-language-examples-screens--${name}`

export const twoAppsExamples = {
  "The home screen": (
    <Compare
      name="home screen"
      titan={{
        before: { desktop: titanQueue1280, phone: titanQueue390 },
        after: titanStory("queues"),
      }}
      portal={{
        before: { desktop: portalDashboard1280, phone: portalDashboard390 },
        after: screenStory("dashboard"),
      }}
    />
  ),
  "A list": (
    <Compare
      name="list"
      titan={{
        before: { desktop: titanList1280, phone: titanList390 },
        after: titanStory("merchants"),
      }}
      portal={{
        before: { desktop: portalList1280, phone: portalList390 },
        after: screenStory("list-page"),
      }}
    />
  ),
  "A record": (
    <Compare
      name="record"
      titan={{
        before: { desktop: titanRecord1280, phone: titanRecord390 },
        after: titanStory("merchant-record"),
      }}
      portal={{
        before: { desktop: portalRecord1280, phone: portalRecord390 },
        after: screenStory("record-page"),
      }}
    />
  ),
}
