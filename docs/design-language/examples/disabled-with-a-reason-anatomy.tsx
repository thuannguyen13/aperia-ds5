import { Anatomy } from "../anatomy"

// The Anatomy drawing of the Disabled With a Reason page: a task's page with a disabled field and its note, and a
// blocked Delete with its reason open as a tooltip, in its own framed story (disabled-with-a-reason-anatomy.stories.tsx)
// because the tooltip renders outside an inline drawing. Each part is marked in the order of the part list in
// disabled-with-a-reason.md.

export const disabledWithAReasonAnatomy = (
  <Anatomy
    story="design-language-examples-anatomy-disabled-with-a-reason--disabled-with-a-reason"
    title="A blocked Delete with its reason open, and a disabled field with its note"
    width={680}
    height={250}
    targets={{
      1: { selector: "[tabindex='0'] button", side: "right" },
      2: { selector: "[data-slot=tooltip-content]", side: "right" },
      3: { selector: "#anatomy-contact", side: "left" },
      4: { selector: "[data-slot=field-description]", side: "right" },
    }}
  />
)
