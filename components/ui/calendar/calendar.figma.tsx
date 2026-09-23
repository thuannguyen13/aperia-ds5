import figma from "@figma/code-connect"
import { Calendar } from "./calendar"

figma.connect(
  Calendar,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=17179-197284",
  {
    imports: ['import { Calendar } from "aperia-ds5"'],
    props: {
      mode: figma.enum("Type", {
        Basic: "single",
        "Month and Year Selector": "single",
        "Range Calendar": "range",
        "Range Calendar - 3 columns": "range",
        Persian: "single",
      }),
      captionLayout: figma.enum("Type", {
        Basic: undefined,
        "Month and Year Selector": "dropdown",
        "Range Calendar": undefined,
        "Range Calendar - 3 columns": undefined,
        Persian: undefined,
      }),
      numberOfMonths: figma.enum("Type", {
        Basic: undefined,
        "Month and Year Selector": undefined,
        "Range Calendar": 2,
        "Range Calendar - 3 columns": 3,
        Persian: undefined,
      }),
    },
    example: ({ mode, captionLayout, numberOfMonths }) => (
      <Calendar
        mode={mode}
        captionLayout={captionLayout}
        numberOfMonths={numberOfMonths}
      />
    ),
  },
)
