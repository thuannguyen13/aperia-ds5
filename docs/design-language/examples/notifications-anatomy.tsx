import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Notifications page: the sidebar's Notifications entry with its panel open, in its own
// framed story (notifications-anatomy.stories.tsx) because the panel renders outside an inline drawing. Each part is
// marked in the order of the part list in notifications.md.

const PANEL = "[data-slot=popover-content]"
// The first notification: the one that shows a person's picture.
const NOTE = `${PANEL} [data-slot=tabs-content] [data-slot=item]:first-child`

// The second and third notifications: the time and the dot are marked there, so the markers sit apart.
const SECOND = `${PANEL} [data-slot=tabs-content] [data-slot=item]:nth-child(2)`
const THIRD = `${PANEL} [data-slot=tabs-content] [data-slot=item]:nth-child(3)`

export const notificationsAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-notifications--notifications"
    title="The Notifications entry in the sidebar with its panel open"
    width={900}
    height={420}
    targets={{
      1: { selector: 'button[aria-label^="Notifications"]', side: "left" },
      2: { selector: `${PANEL} > div`, side: "right", align: "start" },
      3: { selector: `${PANEL} [role=tablist]`, side: "top", align: "start" },
      4: { selector: `${PANEL} button:not([role=tab])`, side: "top" },
      5: {
        selector: `${PANEL} button[aria-label="Notification Settings"]`,
        side: "top",
      },
      6: { selector: `${NOTE} [data-slot=item-media]`, side: "left" },
      7: {
        selector: `${NOTE} [data-slot=item-content] > span:first-child`,
        side: "right",
      },
      8: {
        selector: `${SECOND} [data-slot=item-content] > span:last-child`,
        side: "right",
      },
      9: { selector: `${THIRD} [aria-label=Unread]`, side: "right" },
    }}
  />
)
