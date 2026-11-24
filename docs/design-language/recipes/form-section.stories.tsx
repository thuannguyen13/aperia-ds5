import type { Meta, StoryObj } from "@storybook/react-vite"
import { FormSection } from "./form-section"
import { Button } from "@/components/ui/button/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field/field"
import { Input } from "@/components/ui/input/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet/sheet"
import { Textarea } from "@/components/ui/textarea/textarea"

const meta: Meta<typeof FormSection> = {
  title: "Design Language/Recipes/FormSection",
  component: FormSection,
  tags: ["!dev"],
  parameters: {
    docs: {
      description: {
        component:
          "One titled part of a sheet's form, such as a prospect's Details or Portfolio: a line across the whole sheet, then a semibold title above the field labels, then its fields. The first section has no line, as the sheet's header draws one. Sections sit in a `FieldGroup` inside the sheet's `p-4` form; the line steps out of that padding to reach the sheet's edges.",
      },
    },
  },
  args: {
    title: "Details",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    className: { control: "text" },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof FormSection>

function DetailsFields() {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="prospect-name">Company</FieldLabel>
        <Input id="prospect-name" defaultValue="Northwind Payments" />
      </Field>
      <Field>
        <FieldLabel htmlFor="prospect-website">Website (Optional)</FieldLabel>
        <Input id="prospect-website" placeholder="northwind.com" />
      </Field>
    </>
  )
}

function PortfolioFields() {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="prospect-products">Current Products</FieldLabel>
        <Input id="prospect-products" placeholder="Credit, debit, prepaid" />
      </Field>
      <Field>
        <FieldLabel htmlFor="prospect-volume">Annual Volume</FieldLabel>
        <Input
          id="prospect-volume"
          inputMode="numeric"
          placeholder="$2,500,000"
        />
      </Field>
    </>
  )
}

/** A sheet's form as it is laid out: `p-4`, the sections in a `FieldGroup`. */
function SheetBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-96 rounded-xl bg-background p-4 ring-[0.5px] ring-border">
      <FieldGroup>{children}</FieldGroup>
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <SheetBody>
      <FormSection {...args}>
        <DetailsFields />
      </FormSection>
    </SheetBody>
  ),
}

/** The first section has no line; each one after it draws one across the sheet. */
export const Sections: Story = {
  render: () => (
    <SheetBody>
      <FormSection title="Details">
        <DetailsFields />
      </FormSection>
      <FormSection title="Portfolio">
        <PortfolioFields />
      </FormSection>
    </SheetBody>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <SheetBody>
      <FormSection title="Details">
        <DetailsFields />
      </FormSection>
      <FormSection
        title="Portfolio"
        description="What the prospect runs today, from the discovery call."
      >
        <PortfolioFields />
      </FormSection>
    </SheetBody>
  ),
}

/** `className` goes to the section's FieldGroup, such as two columns. */
export const TwoColumns: Story = {
  args: { title: "Portfolio", className: "grid grid-cols-2 gap-4" },
  render: (args) => (
    <SheetBody>
      <FormSection {...args}>
        <PortfolioFields />
      </FormSection>
    </SheetBody>
  ),
}

/** In the sheet that edits a prospect, with the fixed footer. */
export const InSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Prospect</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b">
          <SheetTitle>Edit Prospect</SheetTitle>
        </SheetHeader>
        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <FieldGroup>
              <FormSection title="Details">
                <DetailsFields />
              </FormSection>
              <FormSection title="Portfolio">
                <PortfolioFields />
                <Field>
                  <FieldLabel htmlFor="prospect-notes">
                    Notes (Optional)
                  </FieldLabel>
                  <Textarea id="prospect-notes" />
                  <FieldDescription>
                    Shown on the prospect's page.
                  </FieldDescription>
                </Field>
              </FormSection>
            </FieldGroup>
          </div>
          <SheetFooter className="flex-row justify-end border-t">
            <SheetClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit">Save Changes</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  ),
}
