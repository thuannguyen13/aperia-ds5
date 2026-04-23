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
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"

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
                <GitCompare data-icon="inline-start" />
                New Branch
              </Button>
              <Caption>leading icon</Caption>
            </Label>
            <Label>
              <Button variant="default">
                Send
                <ArrowUpRight data-icon="inline-end" />
              </Button>
              <Caption>trailing icon</Caption>
            </Label>
            <Label>
              <Button variant="secondary">
                <Mail data-icon="inline-start" />
                Compose
              </Button>
              <Caption>secondary + icon</Caption>
            </Label>
            <Label>
              <Button variant="destructive">
                <Trash2 data-icon="inline-start" />
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
                <LoaderCircle className="animate-spin" data-icon="inline-start" />
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

        {/* ─── Checkbox ────────────────────────────────────────────────────── */}
        <div className="space-y-8 rounded-xl border border-border p-6">
          <h2 className="text-base font-semibold">Checkbox</h2>
          <Section title="States" description="Default checkbox states">
            <Label>
              <Checkbox />
              <Caption>unchecked</Caption>
            </Label>
            <Label>
              <Checkbox defaultChecked />
              <Caption>checked</Caption>
            </Label>
            <Label>
              <Checkbox disabled />
              <Caption>disabled</Caption>
            </Label>
          </Section>
        </div>

        {/* ─── Input ───────────────────────────────────────────────────────── */}
        <div className="space-y-8 rounded-xl border border-border p-6">
          <h2 className="text-base font-semibold">Input</h2>

          {/* Sizes */}
          <Section title="Sizes" description="Height varies per size token">
            <Field className="w-56">
              <FieldLabel>Mini</FieldLabel>
              <Input size="xs" placeholder="Mini input" />
              <FieldDescription>Compact inputs, table cells.</FieldDescription>
              <span className="font-mono text-[10px] text-muted-foreground">xs · 24px</span>
            </Field>
            <Field className="w-56">
              <FieldLabel>Small</FieldLabel>
              <Input size="sm" placeholder="Small input" />
              <FieldDescription>Tight layouts, toolbars.</FieldDescription>
              <span className="font-mono text-[10px] text-muted-foreground">sm · 32px</span>
            </Field>
            <Field className="w-56">
              <FieldLabel>Regular</FieldLabel>
              <Input size="default" placeholder="Regular input" />
              <FieldDescription>Default for most forms.</FieldDescription>
              <span className="font-mono text-[10px] text-muted-foreground">default · 36px</span>
            </Field>
            <Field className="w-56">
              <FieldLabel>Large</FieldLabel>
              <Input size="lg" placeholder="Large input" />
              <FieldDescription>Prominent hero inputs.</FieldDescription>
              <span className="font-mono text-[10px] text-muted-foreground">lg · 40px</span>
            </Field>
          </Section>

          {/* Shape */}
          <Section title="Shape" description="Corner radius variants">
            <Field className="w-56">
              <FieldLabel>Default</FieldLabel>
              <Input shape="default" placeholder="Default" />
              <FieldDescription>Rounded corners (rounded-lg).</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Round</FieldLabel>
              <Input shape="round" placeholder="Round" />
              <FieldDescription>Fully pill-shaped (rounded-full).</FieldDescription>
            </Field>
          </Section>

          {/* States */}
          <Section title="States" description="All Figma State variants">
            <Field className="w-56">
              <FieldLabel>Empty</FieldLabel>
              <Input />
              <FieldDescription>No value, no placeholder text.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Placeholder</FieldLabel>
              <Input placeholder="name@example.com" />
              <FieldDescription>Hint text shown when empty.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Value</FieldLabel>
              <Input defaultValue="john@acme.com" />
              <FieldDescription>Input has a filled value.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Error</FieldLabel>
              <Input placeholder="name@example.com" state="error" />
              <FieldDescription>Validation failed — use state=&quot;error&quot;.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Error with value</FieldLabel>
              <Input defaultValue="not-an-email" state="error" />
              <FieldDescription>Error state with existing input.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Disabled</FieldLabel>
              <Input placeholder="Unavailable" state="disabled" />
              <FieldDescription>Non-interactive, use state=&quot;disabled&quot;.</FieldDescription>
            </Field>
          </Section>

          {/* Icons */}
          <Section title="Icons" description="Left and right icon decorations">
            <Field className="w-56">
              <FieldLabel>Left icon</FieldLabel>
              <Input placeholder="Search…" leftIcon={<Search />} />
              <FieldDescription>Contextual leading icon.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Right icon</FieldLabel>
              <Input placeholder="Email address" rightIcon={<Mail />} />
              <FieldDescription>Trailing action or status icon.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Both icons</FieldLabel>
              <Input placeholder="Username" leftIcon={<User />} rightIcon={<Search />} />
              <FieldDescription>Leading and trailing together.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Icon + error</FieldLabel>
              <Input placeholder="Search…" leftIcon={<Search />} state="error" />
              <FieldDescription>Icon decoration in error state.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Icon + disabled</FieldLabel>
              <Input placeholder="Search…" leftIcon={<Search />} state="disabled" />
              <FieldDescription>Icon decoration when disabled.</FieldDescription>
            </Field>
          </Section>

          {/* Prefix / Suffix */}
          <Section title="Prefix & Suffix" description="Inline text addons">
            <Field className="w-56">
              <FieldLabel>Prefix</FieldLabel>
              <Input placeholder="0.00" prefix="$" />
              <FieldDescription>Text prepended inside the field.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Suffix</FieldLabel>
              <Input placeholder="yourdomain" suffix=".com" />
              <FieldDescription>Text appended inside the field.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Both</FieldLabel>
              <Input placeholder="amount" prefix="$" suffix="USD" />
              <FieldDescription>Prefix and suffix together.</FieldDescription>
            </Field>
            <Field className="w-56">
              <FieldLabel>Icon + suffix</FieldLabel>
              <Input placeholder="amount" leftIcon={<DollarSign />} suffix="USD" />
              <FieldDescription>Combines icon decoration with suffix.</FieldDescription>
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
