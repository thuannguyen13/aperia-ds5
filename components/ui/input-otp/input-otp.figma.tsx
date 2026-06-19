import figma from "@figma/code-connect"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./input-otp"

figma.connect(
  InputOTP,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=81-141",
  {
    variant: { Variant: "Digits Only" },
    imports: [
      'import { InputOTP, InputOTPGroup, InputOTPSlot } from "aperia-ds5"',
    ],
    example: () => (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    ),
  },
)

figma.connect(
  InputOTP,
  "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=81-141",
  {
    variant: { Variant: "With Separator" },
    imports: [
      'import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "aperia-ds5"',
    ],
    example: () => (
      <InputOTP maxLength={6}>
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
      </InputOTP>
    ),
  },
)
