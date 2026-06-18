import figma from "@figma/code-connect"
import { Calendar } from "./calendar"

// Default: single date selection
figma.connect(
  Calendar,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=301-1181",
  {
    imports: ['import { Calendar } from "aperia-ds5"'],
    example: () => (
      <Calendar
        mode="single"
        selected={new Date()}
        onSelect={() => {}}
      />
    ),
  },
)
