import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Buttons and Actions page: a record's page with its actions and a card with its Add, the
// More actions menu open. It is drawn in its own frame (buttons-and-actions-anatomy.stories.tsx) because the menu
// renders in a portal. The part list lives in the page's Markdown; each part is marked in the order of that list.

const LINE = "[data-slot=page-header] > div"

export const buttonsAndActionsAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-buttons-and-actions--record"
    title="A record's page with its actions and a card with its Add, the More actions menu open"
    width={1024}
    height={316}
    targets={{
      1: { selector: `${LINE} > :nth-child(2) button`, side: "top" },
      2: {
        selector: `${LINE} > :nth-child(3) button:not([aria-label])`,
        side: "top",
      },
      3: { selector: 'button[aria-label="More actions"]', side: "top" },
      4: { selector: "[data-slot=dropdown-menu-content]", side: "left" },
      5: { selector: "[data-slot=card-header] button", side: "left" },
      6: {
        selector: "[data-slot=card] li:first-child > button:last-child",
        side: "right",
      },
    }}
  />
)
