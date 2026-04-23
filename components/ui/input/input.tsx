import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputWrapperVariants = cva(
  "flex w-full items-center border bg-transparent shadow-xs transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      size: {
        default: "h-9 gap-2 px-2.5 text-sm",
        lg:      "h-10 gap-2 px-3 text-base",
        sm:      "h-8 gap-1.5 px-2.5 text-sm",
        xs:      "h-6 gap-1 px-2 text-xs",
      },
      shape: {
        default: "rounded-lg",
        round:   "rounded-full",
      },
    },
    defaultVariants: {
      size: "default",
      shape: "default",
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputWrapperVariants> & {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    prefix?: string
    suffix?: string
    /** Maps to Figma State variants: "error" sets aria-invalid, "disabled" sets disabled */
    state?: "error" | "disabled"
  }

function Input({
  className,
  type,
  size,
  shape,
  leftIcon,
  rightIcon,
  prefix,
  suffix,
  disabled,
  state,
  ...props
}: InputProps) {
  const isDisabled = disabled || state === "disabled"
  const isError = state === "error"
  const hasDecoration = leftIcon || rightIcon || prefix || suffix

  if (!hasDecoration) {
    return (
      <input
        type={type}
        data-slot="input"
        disabled={isDisabled}
        aria-invalid={isError || undefined}
        className={cn(
          inputWrapperVariants({ size, shape }),
          "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:disabled:bg-input/80",
          className
        )}
        {...props}
      />
    )
  }

  return (
    <div
      data-slot="input"
      aria-invalid={isError || undefined}
      aria-disabled={isDisabled || undefined}
      className={cn(
        inputWrapperVariants({ size, shape }),
        isDisabled && "pointer-events-none cursor-not-allowed bg-input/50 opacity-50 dark:bg-input/80",
        className
      )}
    >
      {leftIcon && (
        <span className="shrink-0 text-muted-foreground [&_svg:not([class*='size-'])]:size-4">
          {leftIcon}
        </span>
      )}
      {prefix && (
        <span className="shrink-0 text-muted-foreground">{prefix}</span>
      )}
      <input
        type={type}
        disabled={isDisabled}
        className="min-w-0 flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed"
        {...props}
      />
      {suffix && (
        <span className="shrink-0 text-muted-foreground">{suffix}</span>
      )}
      {rightIcon && (
        <span className="shrink-0 text-muted-foreground [&_svg:not([class*='size-'])]:size-4">
          {rightIcon}
        </span>
      )}
    </div>
  )
}

export { Input, inputWrapperVariants }
