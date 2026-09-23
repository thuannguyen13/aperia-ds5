// url=https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=81-141
// source=https://github.com/thuannguyen13/aperia-ds5/blob/main/components/ui/input-otp/input-otp.tsx
// component=InputOTP

import figma from "figma"

const variant = figma.selectedInstance.getPropertyValue("Variant")

let template
if (variant === "Digits Only") {
  template = {
    id: "InputOTP",
    imports: ['import { InputOTP, InputOTPGroup, InputOTPSlot } from "aperia-ds5"'],
    example: figma.code`<InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>`,
  }
} else if (variant === "With Spacing") {
  template = {
    id: "InputOTP",
    imports: ['import { InputOTP, InputOTPGroup, InputOTPSlot } from "aperia-ds5"'],
    example: figma.code`<InputOTP maxLength={6}>
        <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>`,
  }
} else if (variant === "With Separator") {
  template = {
    id: "InputOTP",
    imports: ['import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "aperia-ds5"'],
    example: figma.code`<InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>`,
  }
} else {
  template = {
    id: "InputOTP",
    imports: ['import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "aperia-ds5"'],
    example: figma.code`<InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>`,
  }
}

export default template
