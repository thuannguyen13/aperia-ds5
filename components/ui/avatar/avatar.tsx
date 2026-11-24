"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// A record's picture. People are circles; companies, products and teams are `shape="square"`. The root owns the shape
// and every slot (the inner line, the image, the fallback) inherits its radius, so a square is square all the way
// through. The square's radius steps down with the size, so a small square never reads as a circle.
//
// The image fades in over the fallback once it has loaded, so the initials show at once and stay wherever there is no
// picture or it fails. What the picture is and which colors the initials take (by record id, say) belong to the app;
// Avatar only draws them.

type AvatarSize = "xs" | "sm" | "default" | "lg" | "xl"

type AvatarState = {
  /** The image URL that has loaded, so another record's picture never shows while this one loads. */
  loaded: string | null
  setLoaded: (src: string | null) => void
  /** The image URL the avatar is showing now, or null when it has none or it failed. */
  current: string | null
  setCurrent: (src: string | null) => void
  colors?: { fill: string; text: string }
}

const AvatarContext = React.createContext<AvatarState | null>(null)

function Avatar({
  className,
  size = "default",
  shape = "circle",
  colors,
  empty = false,
  label,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize
  shape?: "circle" | "square"
  /** The fallback's fill and text, as CSS colors the app picks, such as a pair fixed by the record's id. */
  colors?: { fill: string; text: string }
  /** No one, such as an unassigned owner: a dashed outline in the avatar's shape. */
  empty?: boolean
  /** Names an avatar with no name beside it: read aloud and shown on hover. Without it the avatar is hidden from
   *  screen readers, as the name next to it says who it is. */
  label?: string
}) {
  const [loaded, setLoaded] = React.useState<string | null>(null)
  const [current, setCurrent] = React.useState<string | null>(null)
  const named = label
    ? { role: "img", "aria-label": label, title: label }
    : { "aria-hidden": true }
  return (
    <AvatarContext.Provider
      value={{ loaded, setLoaded, current, setCurrent, colors }}
    >
      <AvatarPrimitive.Root
        data-slot="avatar"
        data-size={size}
        data-shape={shape}
        data-empty={empty || undefined}
        {...named}
        className={cn(
          "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--shadow-color)_10%,transparent)] data-[size=lg]:size-10 data-[size=sm]:size-6 data-[size=xl]:size-12 data-[size=xs]:size-5",
          "data-[shape=square]:rounded-lg data-[shape=square]:data-[size=sm]:rounded-md data-[shape=square]:data-[size=xs]:rounded-sm",
          "data-empty:border data-empty:border-dashed data-empty:after:hidden",
          className
        )}
        {...props}
      />
    </AvatarContext.Provider>
  )
}

function AvatarImage({
  className,
  src,
  alt = "",
  onLoad,
  onError,
  ...props
}: React.ComponentProps<"img">) {
  const avatar = React.useContext(AvatarContext)
  const [failed, setFailed] = React.useState<string | null>(null)
  const usable = src && failed !== src ? src : null
  const shown = usable !== null && avatar?.loaded === usable
  const setCurrent = avatar?.setCurrent
  React.useEffect(() => {
    setCurrent?.(usable)
    return () => setCurrent?.(null)
  }, [usable, setCurrent])
  if (!usable || !src) return null
  return (
    // A plain img over the fallback rather than Radix's, which draws nothing until the browser has loaded it: here the
    // fallback shows at once and the picture fades in over it.
    <img
      data-slot="avatar-image"
      data-loaded={shown || undefined}
      src={src}
      alt={alt}
      className={cn(
        "absolute inset-0 size-full rounded-[inherit] object-cover opacity-0 transition-opacity duration-200 data-loaded:opacity-100 motion-reduce:transition-none",
        className
      )}
      // An image that settled before React hydrated never fires onLoad or onError; the ref catches it.
      ref={(image) => {
        if (!image?.complete) return
        if (image.naturalWidth > 0) avatar?.setLoaded(src)
        else setFailed(src)
      }}
      onLoad={(event) => {
        avatar?.setLoaded(src)
        onLoad?.(event)
      }}
      onError={(event) => {
        setFailed(src)
        onError?.(event)
      }}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  style,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const avatar = React.useContext(AvatarContext)
  const colors = avatar?.colors
  // Hidden once the picture over it has loaded, so a logo with a transparent ground doesn't show the letters through.
  const covered = !!avatar?.current && avatar.loaded === avatar.current
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      data-covered={covered || undefined}
      className={cn(
        "flex size-full items-center justify-center rounded-[inherit] bg-muted text-sm text-muted-foreground transition-opacity duration-200 group-data-empty/avatar:hidden group-data-[size=sm]/avatar:text-xs group-data-[size=xl]/avatar:text-base group-data-[size=xs]/avatar:text-[10px] data-covered:opacity-0 motion-reduce:transition-none",
        className
      )}
      // Inline, so a highlighted menu or picker row, which recolors the text in it, leaves the initials alone.
      style={
        colors
          ? { backgroundColor: colors.fill, color: colors.text, ...style }
          : style
      }
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=xs]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden group-data-[size=xs]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=xl]/avatar:size-3.5 group-data-[size=lg]/avatar:[&>svg]:size-2 group-data-[size=xl]/avatar:[&>svg]:size-2.5",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=xl]/avatar-group:size-12 group-has-data-[size=xs]/avatar-group:size-5 group-has-data-[size=xs]/avatar-group:text-[10px] [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 group-has-data-[size=xl]/avatar-group:[&>svg]:size-6 group-has-data-[size=xs]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
