import { Switch } from "./switch"
import { Label } from "../label/label"
import figma from "@figma/code-connect"

figma.connect(
  Switch,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=60-450",
  {
    imports: [
      'import { Switch } from "@/components/ui/switch"',
      'import { Label } from "@/components/ui/label"',
    ],
    props: {
      size: figma.enum("Size", {
        default: "default",
        sm: "sm",
      }),
      defaultChecked: figma.enum("Active", {
        On: true,
        Off: false,
      }),
      disabled: figma.enum("State", {
        Default: false,
        Focus: false,
        Invalid: false,
        Disabled: true,
      }),
      invalid: figma.enum("State", {
        Default: false,
        Focus: false,
        Invalid: true,
        Disabled: false,
      }),
      label: figma.string("Label Text"),
      showLabel: figma.boolean("Show Label"),
      description: figma.string("Description Text"),
      showDescription: figma.boolean("Show Description"),
      controlAtEnd: figma.enum("Control Placement", {
        Start: false,
        End: true,
      }),
    },
    example: ({
      size,
      defaultChecked,
      disabled,
      invalid,
      label,
      showLabel,
      description,
      showDescription,
      controlAtEnd,
    }) => {
      const switchEl = (
        <Switch
          id="switch"
          size={size}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-invalid={invalid}
        />
      )

      if (!showLabel && !showDescription) {
        return switchEl
      }

      const labelContent = (
        <div className="flex flex-col gap-0.5">
          {showLabel && <Label htmlFor="switch">{label}</Label>}
          {showDescription && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )

      return (
        <div className="flex items-start gap-2">
          {controlAtEnd ? labelContent : switchEl}
          {controlAtEnd ? switchEl : labelContent}
        </div>
      )
    },
  },
)
