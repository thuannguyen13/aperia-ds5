import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  ChevronRight,
  DollarSign,
  Ellipsis,
  GitCompare,
  LoaderCircle,
  Mail,
  Search,
  Trash2,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"

type Section = {
  title: string
  description?: string
  children: React.ReactNode
}

function Section({ title, description, children }: Section) {
  return (
    <section>
      <div className="mb-4 border-b border-border pb-2">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
    </div>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] text-muted-foreground">{children}</span>
  )
}

function Field({
  label,
  description,
  caption,
  children,
}: {
  label: string
  description?: string
  caption?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex w-56 flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {caption && (
        <span className="font-mono text-[10px] text-muted-foreground">{caption}</span>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-svh bg-background px-8 py-10">
      <div className="mx-auto max-w-4xl space-y-10">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">Component QA</h1>
          <p className="text-sm text-muted-foreground">
            Visual reference for all component variants and states.
          </p>
        </div>

        {/* ─── Button ──────────────────────────────────────────────────────── */}
        <div className="space-y-8 rounded-xl border border-border p-6">
          <h2 className="text-base font-semibold">Button</h2>

          {/* Variants */}
          <Section title="Variants" description="Core visual styles">
            <Label>
              <Button variant="default">Button</Button>
              <Caption>default</Caption>
            </Label>
            <Label>
              <Button variant="secondary">Secondary</Button>
              <Caption>secondary</Caption>
            </Label>
            <Label>
              <Button variant="destructive">Destructive</Button>
              <Caption>destructive</Caption>
            </Label>
            <Label>
              <Button variant="outline">Outline</Button>
              <Caption>outline</Caption>
            </Label>
            <Label>
              <Button variant="ghost">Ghost</Button>
              <Caption>ghost</Caption>
            </Label>
            <Label>
              <Button variant="link">Link</Button>
              <Caption>link</Caption>
            </Label>
          </Section>

          {/* Sizes */}
          <Section title="Sizes" description="height / horizontal padding">
            <Label>
              <Button size="xs">Button</Button>
              <Caption>xs · 24px</Caption>
            </Label>
            <Label>
              <Button size="sm">Button</Button>
              <Caption>sm · 32px</Caption>
            </Label>
            <Label>
              <Button size="default">Button</Button>
              <Caption>default · 36px</Caption>
            </Label>
            <Label>
              <Button size="lg">Button</Button>
              <Caption>lg · 40px</Caption>
            </Label>
          </Section>

          {/* With icons */}
          <Section title="With Icons" description="Leading / trailing icon combinations">
            <Label>
              <Button variant="outline">
                <GitCompare />
                New Branch
              </Button>
              <Caption>leading icon</Caption>
            </Label>
            <Label>
              <Button variant="default">
                Send
                <ArrowUpRight />
              </Button>
              <Caption>trailing icon</Caption>
            </Label>
            <Label>
              <Button variant="secondary">
                <Mail />
                Compose
              </Button>
              <Caption>secondary + icon</Caption>
            </Label>
            <Label>
              <Button variant="destructive">
                <Trash2 />
                Delete
              </Button>
              <Caption>destructive + icon</Caption>
            </Label>
          </Section>

          {/* Icon-only */}
          <Section title="Icon Only" description="Square and pill icon buttons">
            <Label>
              <Button variant="outline" size="icon-xs">
                <ChevronRight />
              </Button>
              <Caption>icon-xs</Caption>
            </Label>
            <Label>
              <Button variant="outline" size="icon-sm">
                <ChevronRight />
              </Button>
              <Caption>icon-sm</Caption>
            </Label>
            <Label>
              <Button variant="outline" size="icon">
                <ChevronRight />
              </Button>
              <Caption>icon</Caption>
            </Label>
            <Label>
              <Button variant="outline" size="icon-lg">
                <ChevronRight />
              </Button>
              <Caption>icon-lg</Caption>
            </Label>
            <Label>
              <Button variant="outline" size="icon-rounded">
                <ArrowUp />
              </Button>
              <Caption>icon-rounded</Caption>
            </Label>
            <Label>
              <Button variant="default" size="icon">
                <ArrowUpRight />
              </Button>
              <Caption>default + icon</Caption>
            </Label>
            <Label>
              <Button variant="ghost" size="icon">
                <Ellipsis />
              </Button>
              <Caption>ghost + icon</Caption>
            </Label>
          </Section>

          {/* States */}
          <Section title="States" description="Interactive and loading states">
            <Label>
              <Button variant="default">Default</Button>
              <Caption>default</Caption>
            </Label>
            <Label>
              <Button variant="default" disabled>
                Disabled
              </Button>
              <Caption>disabled</Caption>
            </Label>
            <Label>
              <Button variant="outline" disabled>
                <LoaderCircle className="animate-spin" />
                Loading…
              </Button>
              <Caption>loading</Caption>
            </Label>
            <Label>
              <Button variant="outline" disabled>Disabled</Button>
              <Caption>outline disabled</Caption>
            </Label>
            <Label>
              <Button variant="destructive" disabled>Disabled</Button>
              <Caption>destructive disabled</Caption>
            </Label>
          </Section>

          {/* Button Group */}
          <Section title="Button Group" description="Segmented controls sharing a border">
            <Label>
              <div
                data-slot="button-group"
                className="inline-flex divide-x divide-border overflow-hidden rounded-lg border border-border shadow-xs"
              >
                <Button
                  variant="ghost"
                  size="default"
                  className="rounded-none border-0 shadow-none first:rounded-l-lg last:rounded-r-lg"
                >
                  <ArrowLeft />
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  className="rounded-none border-0 shadow-none"
                >
                  Archive
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  className="rounded-none border-0 shadow-none"
                >
                  Report
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  className="rounded-none border-0 shadow-none first:rounded-l-lg last:rounded-r-lg"
                >
                  <Ellipsis />
                </Button>
              </div>
              <Caption>button group</Caption>
            </Label>

            <Label>
              <div
                data-slot="button-group"
                className="inline-flex divide-x divide-border overflow-hidden rounded-lg border border-border shadow-xs"
              >
                <Button
                  variant="ghost"
                  size="default"
                  className="rounded-none border-0 shadow-none first:rounded-l-lg last:rounded-r-lg"
                >
                  Snooze
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none border-0 shadow-none first:rounded-l-lg last:rounded-r-lg"
                >
                  <Ellipsis />
                </Button>
              </div>
              <Caption>split button</Caption>
            </Label>
          </Section>

          {/* All variants × sizes grid */}
          <Section
            title="Variant × Size Matrix"
            description="Every variant at every text size"
          >
            <div className="w-full overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 text-left font-medium text-muted-foreground">
                      variant \ size
                    </th>
                    {(["xs", "sm", "default", "lg"] as const).map((s) => (
                      <th
                        key={s}
                        className="px-4 py-2 font-mono font-medium text-muted-foreground"
                      >
                        {s}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      "default",
                      "secondary",
                      "destructive",
                      "outline",
                      "ghost",
                      "link",
                    ] as const
                  ).map((v) => (
                    <tr key={v} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 font-mono text-muted-foreground">
                        {v}
                      </td>
                      {(["xs", "sm", "default", "lg"] as const).map((s) => (
                        <td key={s} className="px-4 py-3">
                          <Button variant={v} size={s}>
                            Button
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>


          <section>
            <Alert>
              <AlertTitle>This is an alert</AlertTitle>
              <AlertDescription>alkwd mlaw</AlertDescription>
            </Alert>
          </section>
        </div>

        {/* ─── Input ───────────────────────────────────────────────────────── */}
        <div className="space-y-8 rounded-xl border border-border p-6">
          <h2 className="text-base font-semibold">Input</h2>

          {/* Sizes */}
          <Section title="Sizes" description="Height varies per size token">
            <Field label="Mini" description="Compact inputs, table cells." caption="xs · 24px">
              <Input size="xs" placeholder="Mini input" />
            </Field>
            <Field label="Small" description="Tight layouts, toolbars." caption="sm · 32px">
              <Input size="sm" placeholder="Small input" />
            </Field>
            <Field label="Regular" description="Default for most forms." caption="default · 36px">
              <Input size="default" placeholder="Regular input" />
            </Field>
            <Field label="Large" description="Prominent hero inputs." caption="lg · 40px">
              <Input size="lg" placeholder="Large input" />
            </Field>
          </Section>

          {/* Shape */}
          <Section title="Shape" description="Corner radius variants">
            <Field label="Default" description="Rounded corners (rounded-lg).">
              <Input shape="default" placeholder="Default" />
            </Field>
            <Field label="Round" description="Fully pill-shaped (rounded-full).">
              <Input shape="round" placeholder="Round" />
            </Field>
          </Section>

          {/* States */}
          <Section title="States" description="All Figma State variants">
            <Field label="Empty" description="No value, no placeholder text.">
              <Input />
            </Field>
            <Field label="Placeholder" description="Hint text shown when empty.">
              <Input placeholder="name@example.com" />
            </Field>
            <Field label="Value" description="Input has a filled value.">
              <Input defaultValue="john@acme.com" />
            </Field>
            <Field label="Error" description="Validation failed — use state=&quot;error&quot;.">
              <Input placeholder="name@example.com" state="error" />
            </Field>
            <Field label="Error with value" description="Error state with existing input.">
              <Input defaultValue="not-an-email" state="error" />
            </Field>
            <Field label="Disabled" description="Non-interactive, use state=&quot;disabled&quot;.">
              <Input placeholder="Unavailable" state="disabled" />
            </Field>
          </Section>

          {/* Icons */}
          <Section title="Icons" description="Left and right icon decorations">
            <Field label="Left icon" description="Contextual leading icon.">
              <Input placeholder="Search…" leftIcon={<Search />} />
            </Field>
            <Field label="Right icon" description="Trailing action or status icon.">
              <Input placeholder="Email address" rightIcon={<Mail />} />
            </Field>
            <Field label="Both icons" description="Leading and trailing together.">
              <Input placeholder="Username" leftIcon={<User />} rightIcon={<Search />} />
            </Field>
            <Field label="Icon + error" description="Icon decoration in error state.">
              <Input placeholder="Search…" leftIcon={<Search />} state="error" />
            </Field>
            <Field label="Icon + disabled" description="Icon decoration when disabled.">
              <Input placeholder="Search…" leftIcon={<Search />} state="disabled" />
            </Field>
          </Section>

          {/* Prefix / Suffix */}
          <Section title="Prefix & Suffix" description="Inline text addons">
            <Field label="Prefix" description="Text prepended inside the field.">
              <Input placeholder="0.00" prefix="$" />
            </Field>
            <Field label="Suffix" description="Text appended inside the field.">
              <Input placeholder="yourdomain" suffix=".com" />
            </Field>
            <Field label="Both" description="Prefix and suffix together.">
              <Input placeholder="amount" prefix="$" suffix="USD" />
            </Field>
            <Field label="Icon + suffix" description="Combines icon decoration with suffix.">
              <Input placeholder="amount" leftIcon={<DollarSign />} suffix="USD" />
            </Field>
          </Section>

          {/* Size × Shape matrix */}
          <Section title="Size × Shape Matrix" description="Every size at every shape">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 text-left font-medium text-muted-foreground">size \ shape</th>
                    {(["default", "round"] as const).map((s) => (
                      <th key={s} className="px-4 py-2 font-mono font-medium text-muted-foreground">{s}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(["xs", "sm", "default", "lg"] as const).map((sz) => (
                    <tr key={sz} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 font-mono text-muted-foreground">{sz}</td>
                      {(["default", "round"] as const).map((sh) => (
                        <td key={sh} className="px-4 py-3">
                          <div className="w-44">
                            <Input size={sz} shape={sh} placeholder="Input" />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
