"use client"

import { useTheme } from "next-themes"
import {
  Toaster as Sonner,
  toast as sonnerToast,
  type ExternalToast,
  type ToasterProps,
} from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"
import { plural } from "@/lib/format"

// Three toasts show at once. Past three new notifications, one more toast counts the rest; it is the newest, so it
// shows in front and the oldest notification waits behind the three until one closes.
const VISIBLE_TOASTS = 3
const NOTIFICATIONS_SHOWN = 3

/**
 * The app's one stack of toasts: save confirmations, errors and new notifications alike. Mount it once, at the app's
 * root. It sits at the top right of the window; on a phone (below sonner's own 600px breakpoint) it spans the top of
 * the screen, 16px from each side. It shows three toasts at most, the newest in front. Past three new notifications,
 * one toast counts the rest (`toastNotification`).
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      mobileOffset={16}
      visibleToasts={VISIBLE_TOASTS}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

type Message = Parameters<typeof sonnerToast>[0]

// A toast that stays until it is closed needs a way to close it.
const withClose = (data?: ExternalToast): ExternalToast | undefined =>
  data?.duration === Infinity ? { closeButton: true, ...data } : data

/**
 * sonner's `toast`, for the one `Toaster`: `toast("Note added.")`, `toast("Changed to Demo.", { action })`. A toast
 * that stays until it is closed (`duration: Infinity`) gets a close button. `toast.error` stays until it is closed by
 * default, since only a success closes on its own. Import it from `aperia-ds5` rather than `sonner`, so it reaches the
 * library's `Toaster` even when the app resolves its own copy of sonner.
 */
const toast: typeof sonnerToast = Object.assign(
  (message: Message, data?: ExternalToast) =>
    sonnerToast(message, withClose(data)),
  {
    success: (message: Message, data?: ExternalToast) =>
      sonnerToast.success(message, withClose(data)),
    info: (message: Message, data?: ExternalToast) =>
      sonnerToast.info(message, withClose(data)),
    warning: (message: Message, data?: ExternalToast) =>
      sonnerToast.warning(message, withClose(data)),
    error: (message: Message, data?: ExternalToast) =>
      sonnerToast.error(message, withClose({ duration: Infinity, ...data })),
    message: (message: Message, data?: ExternalToast) =>
      sonnerToast.message(message, withClose(data)),
    loading: sonnerToast.loading,
    custom: sonnerToast.custom,
    promise: sonnerToast.promise,
    dismiss: sonnerToast.dismiss,
    getHistory: sonnerToast.getHistory,
    getToasts: sonnerToast.getToasts,
  }
)

// The notification toasts on screen, and how many arrived past them.
const notificationsShown = new Set<string>()
let notificationsMore = 0
let notificationSeq = 0
const MORE_ID = "notifications-more"

/**
 * A new notification as a toast in the one `Toaster`: its picture (`media`, such as an `Avatar`) and its sentence, the
 * same as in the Notifications panel. The whole toast is a button that opens its record (`onOpen`) and closes the toast.
 * Three show at most. Past three, one toast counts the rest, "4 more new notifications.", and pressing it runs
 * `onMore`, such as opening the Notifications panel. Returns the toast's id.
 */
function toastNotification({
  media,
  message,
  label,
  onOpen,
  onMore,
  duration,
}: {
  /** Who did it, such as an `Avatar`, or a bell for a notice from the app. */
  media?: React.ReactNode
  /** The notification's sentence, names in `text-foreground font-medium`. */
  message: React.ReactNode
  /** The toast's accessible name when `message` is not plain text, such as "Dana Whitfield assigned you Harbor Coffee". */
  label?: string
  /** Opens the notification's record. */
  onOpen?: () => void
  /** Runs when the count of the rest is pressed, such as opening the Notifications panel. */
  onMore?: () => void
  duration?: number
}) {
  if (notificationsShown.size >= NOTIFICATIONS_SHOWN) {
    notificationsMore += 1
    const reset = () => {
      notificationsMore = 0
    }
    const text = `${plural(notificationsMore, "more new notification", "more new notifications")}.`
    return sonnerToast(
      onMore ? (
        <button
          type="button"
          className="text-left"
          onClick={() => {
            onMore()
            sonnerToast.dismiss(MORE_ID)
          }}
        >
          {text}
        </button>
      ) : (
        text
      ),
      { id: MORE_ID, duration, onDismiss: reset, onAutoClose: reset }
    )
  }
  notificationSeq += 1
  const id = `notification-${notificationSeq}`
  notificationsShown.add(id)
  const gone = () => {
    notificationsShown.delete(id)
  }
  return sonnerToast(
    <button
      type="button"
      aria-label={label}
      className="flex w-full items-start gap-3 text-left text-muted-foreground"
      onClick={() => {
        onOpen?.()
        sonnerToast.dismiss(id)
      }}
    >
      {media && <span className="shrink-0">{media}</span>}
      <span className="min-w-0 flex-1">{message}</span>
    </button>,
    { id, duration, onDismiss: gone, onAutoClose: gone }
  )
}

export { Toaster, toast, toastNotification }
