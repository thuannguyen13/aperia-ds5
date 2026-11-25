import { useEffect, useState, type ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BellIcon,
  Building2Icon,
  CalendarCheckIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  SquareKanbanIcon,
} from "lucide-react"
import {
  AppContent,
  AppHeader,
  AppSidebar,
  AppSidebarNotifications,
  AppSidebarSearch,
  Badge,
  CardContent,
  Field,
  FieldGroup,
  FieldLabel,
  FormSheet,
  Input,
  PageHeader,
  SheetForm,
  SidebarInset,
  SidebarProvider,
  useSheetForm,
  type AppNavGroup,
} from "aperia-ds5"
import { TitledCard } from "../recipes"

// The scaffold with its sheet open: a prospect's page in the app shell, and the form that edits it in a sheet from the
// right. It is drawn in its own frame for an Anatomy drawing (scaffold-anatomy.tsx, `story`), because the sheet
// renders outside an inline drawing and the shell lays out by the window. Hidden from the sidebar.

const meta: Meta = {
  title: "Design Language/Examples/Anatomy Scaffold",
  tags: ["!dev", "!autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

const GROUPS: AppNavGroup[] = [
  {
    items: [
      { href: "/todo", label: "To Do", icon: CalendarCheckIcon },
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
      { href: "/prospects", label: "Prospects", icon: Building2Icon },
      { href: "/pipeline", label: "Pipeline", icon: SquareKanbanIcon },
      { href: "/settings", label: "Settings", icon: SettingsIcon },
    ],
  },
]

// Links in the drawing go nowhere.
const Link = ({ href, ...props }: ComponentProps<"a">) => (
  <a href={href} onClick={(event) => event.preventDefault()} {...props} />
)

const PROSPECT = { name: "Northwind Payments", owner: "Dana Whitfield" }

function ProspectForm({ onDone }: { onDone: () => void }) {
  const form = useSheetForm(PROSPECT)
  const { draft, set } = form
  return (
    <SheetForm
      form={form}
      onSubmit={onDone}
      pending={false}
      submit="Save Changes"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="scaffold-name">Name</FieldLabel>
          <Input
            id="scaffold-name"
            value={draft.name}
            onChange={(event) => set("name", event.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="scaffold-owner">Owner</FieldLabel>
          <Input
            id="scaffold-owner"
            value={draft.owner}
            onChange={(event) => set("owner", event.target.value)}
          />
        </Field>
      </FieldGroup>
    </SheetForm>
  )
}

function ScaffoldWithSheet() {
  const [open, setOpen] = useState(true)
  // The sheet takes the keyboard focus into this frame. Hand it back to the docs page around the frame.
  useEffect(() => {
    const release = setTimeout(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
      ;(window.frameElement as HTMLElement | null)?.blur()
    }, 300)
    return () => clearTimeout(release)
  }, [])
  return (
    <SidebarProvider className="h-svh min-h-0">
      <AppSidebar
        brand={{ name: "Aperia Sales Portal" }}
        groups={GROUPS}
        currentPath="/prospects/101"
        link={Link}
        search={<AppSidebarSearch onOpen={() => {}} />}
        notifications={<AppSidebarNotifications icon={BellIcon} unread={3} />}
        user={{ name: "Dana Whitfield", role: "Sales Manager" }}
      />
      <SidebarInset className="min-h-0 overflow-hidden">
        <AppHeader
          crumbs={[{ label: "Prospects", href: "/prospects" }]}
          link={Link}
        >
          <AppContent>
            <PageHeader
              title="Northwind Payments"
              subtitle="Card issuing and acquiring, Midwest region"
              properties={[
                ["Owner", "Dana Whitfield"],
                ["Stage", <Badge variant="outline">Proposal</Badge>],
              ]}
            />
            <TitledCard title="Details">
              <CardContent className="pb-4 text-sm text-muted-foreground">
                Monthly volume of $4,200,000 across three card programs.
              </CardContent>
            </TitledCard>
          </AppContent>
        </AppHeader>
      </SidebarInset>
      <FormSheet open={open} onOpenChange={setOpen} title="Edit Prospect">
        <ProspectForm onDone={() => setOpen(false)} />
      </FormSheet>
    </SidebarProvider>
  )
}

/** A prospect's page in the app shell, with its edit form open in a sheet from the right. */
export const Scaffold: Story = {
  render: () => <ScaffoldWithSheet />,
}
