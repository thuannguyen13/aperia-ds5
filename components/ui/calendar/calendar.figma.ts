// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17179-197284
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/calendar/calendar.tsx
// component=Calendar

import figma from "figma"

const mode = figma.selectedInstance.getEnum("Type", {
  Basic: "single",
  "Month and Year Selector": "single",
  "Range Calendar": "range",
  "Range Calendar - 3 columns": "range",
  Persian: "single",
})
const captionLayout = figma.selectedInstance.getEnum("Type", {
  Basic: undefined,
  "Month and Year Selector": "dropdown",
  "Range Calendar": undefined,
  "Range Calendar - 3 columns": undefined,
  Persian: undefined,
})
const numberOfMonths = figma.selectedInstance.getEnum("Type", {
  Basic: undefined,
  "Month and Year Selector": undefined,
  "Range Calendar": 2,
  "Range Calendar - 3 columns": 3,
  Persian: undefined,
})

export default {
  id: "Calendar",
  imports: ['import { Calendar } from "aperia-ds5"'],
  example: figma.code`<Calendar${figma.helpers.react.renderProp(
    "mode",
    mode,
  )}${figma.helpers.react.renderProp(
    "captionLayout",
    captionLayout,
  )}${figma.helpers.react.renderProp("numberOfMonths", numberOfMonths)}/>`,
  metadata: { nestable: true },
}
