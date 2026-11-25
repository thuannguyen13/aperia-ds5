import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Saving and Feedback page: a toast at the corner of the window, in its own framed story
// (saving-and-feedback-anatomy.stories.tsx) because a toast renders in a portal outside an inline drawing. Each part
// is marked in the order of the part list in saving-and-feedback.md.

const TOAST = "[data-sonner-toast]"

export const savingAndFeedbackAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-saving-and-feedback--saving-and-feedback"
    title="A toast at the top right of the window"
    width={420}
    height={110}
    targets={{
      1: { selector: `${TOAST} [data-icon]`, side: "bottom" },
      2: { selector: `${TOAST} [data-title]`, side: "bottom" },
      3: { selector: `${TOAST} [data-button]`, side: "bottom" },
      4: { selector: `${TOAST} [data-close-button]`, side: ["top", "left"] },
    }}
  />
)
