import { Fragment, useState } from "react"
import { toast } from "sonner"
import { PlusIcon } from "lucide-react"
import {
  Badge,
  Button,
  Field,
  FieldLabel,
  Input,
  PageHeader,
  ReasonTooltip,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SortableList,
  SortableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsTrigger,
  Toaster,
  moveItem,
  opensOnClick,
} from "aperia-ds5"
import { FlagSwitch, TableGroupRow, TitledCard } from "../recipes"
import { cn } from "@/lib/utils"
import { BeforeAfter, Screen } from "./before-after"

// A settings page as an example: one titled card for each set of options, each change saved where it is made. The
// cards stand in for an app's own (its stages, its lost reasons, its roles), as on Editable Option List and Roles and
// Permissions.

type Stage = {
  id: number
  name: string
  group: "Open" | "Closed"
  inUse: number
}

const STAGES: Stage[] = [
  { id: 1, name: "Discovery", group: "Open", inUse: 18 },
  { id: 2, name: "Demo", group: "Open", inUse: 7 },
  { id: 3, name: "Proposal", group: "Open", inUse: 0 },
  { id: 4, name: "Closed Won", group: "Closed", inUse: 42 },
  { id: 5, name: "Closed Lost", group: "Closed", inUse: 3 },
]
const GROUPS = ["Open", "Closed"] as const

const REASONS = [
  { name: "Chose another processor", inUse: 2 },
  { name: "No budget", inUse: 1 },
  { name: "No response", inUse: 0 },
]

/** Stages: grouped, in an order that matters, so each row has a grip. A row opens the stage's sheet. */
function StagesCard() {
  const [stages, setStages] = useState(STAGES)
  function reorder(group: Stage["group"], from: number, to: number) {
    setStages((was) => {
      const moved = moveItem(
        was.filter((stage) => stage.group === group),
        from,
        to
      )
      return GROUPS.flatMap((each) =>
        each === group ? moved : was.filter((stage) => stage.group === each)
      )
    })
    toast("Order saved.")
  }
  return (
    <TitledCard
      title="Stages"
      figure={stages.length}
      action={
        <Button variant="outline">
          <PlusIcon data-icon="inline-start" />
          Add Stage
        </Button>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 pl-2" />
            <TableHead>Name</TableHead>
            <TableHead className="pr-4 text-right">In Use</TableHead>
          </TableRow>
        </TableHeader>
        {GROUPS.map((group) => {
          const rows = stages.filter((stage) => stage.group === group)
          return (
            <TableBody key={group}>
              <TableGroupRow colSpan={3}>{group}</TableGroupRow>
              <SortableList
                ids={rows.map((stage) => stage.id)}
                name={(id) =>
                  rows.find((stage) => stage.id === id)?.name ?? "Stage"
                }
                onMove={(from, to) => reorder(group, from, to)}
              >
                {rows.map((stage) => (
                  <SortableRow key={stage.id} id={stage.id}>
                    {(row, handle) => {
                      const opens = opensOnClick(`Open ${stage.name}`, () => {})
                      return (
                        <TableRow
                          {...row}
                          {...opens}
                          className={cn(row.className, opens.className)}
                        >
                          <TableCell className="w-10 py-1 pl-2">
                            {handle(`Reorder ${stage.name}`)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{stage.name}</Badge>
                          </TableCell>
                          <TableCell className="pr-4 text-right tabular-nums">
                            {stage.inUse}
                          </TableCell>
                        </TableRow>
                      )
                    }}
                  </SortableRow>
                ))}
              </SortableList>
            </TableBody>
          )
        })}
      </Table>
    </TitledCard>
  )
}

/** Lost reasons: an order that does not matter, so no grip. */
function ReasonsCard() {
  return (
    <TitledCard
      title="Lost Reasons"
      figure={REASONS.length}
      action={
        <Button variant="outline">
          <PlusIcon data-icon="inline-start" />
          Add Reason
        </Button>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Name</TableHead>
            <TableHead className="pr-4 text-right">In Use</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {REASONS.map((reason) => (
            <TableRow
              key={reason.name}
              {...opensOnClick(`Open ${reason.name}`, () => {})}
            >
              <TableCell className="pl-4">{reason.name}</TableCell>
              <TableCell className="pr-4 text-right tabular-nums">
                {reason.inUse}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TitledCard>
  )
}

type Level = "None" | "Owned" | "All"
const ROLES = [
  { id: "admin", name: "Admin" },
  { id: "rep", name: "Sales Rep" },
]
const PERMISSIONS = [
  { id: "view", area: "Prospects", label: "View", kind: "level" },
  { id: "edit", area: "Prospects", label: "Edit", kind: "level" },
  {
    id: "settings",
    area: "Settings",
    label: "Menu Visibility",
    kind: "switch",
  },
] as const
const START: Record<string, Record<string, Level | boolean>> = {
  admin: { view: "All", edit: "All", settings: true },
  rep: { view: "Owned", edit: "Owned", settings: false },
}
const OWN_SETTINGS = "You cannot remove your own role's access to Settings."

/** Roles: a column per role, each pick saved at once with Undo. One role at a time when the card is narrow. */
function RolesCard() {
  const [grid, setGrid] = useState(START)
  const [picked, setPicked] = useState("rep")
  function change(role: string, permission: string, value: Level | boolean) {
    const before = grid
    setGrid((was) => ({
      ...was,
      [role]: { ...was[role], [permission]: value },
    }))
    const name = ROLES.find((each) => each.id === role)?.name
    const row = PERMISSIONS.find((each) => each.id === permission)
    const said = typeof value === "boolean" ? (value ? "Yes" : "No") : value
    toast(`${name}: ${row?.area}, ${row?.label} changed to ${said}.`, {
      action: { label: "Undo", onClick: () => setGrid(before) },
    })
  }
  const narrowHidden = (role: string) =>
    role !== picked && "@max-[32rem]/roles:hidden"
  const areas = [...new Set(PERMISSIONS.map((row) => row.area))]
  return (
    <div className="@container/roles">
      <TitledCard
        title="Roles"
        action={
          <Button variant="outline">
            <PlusIcon data-icon="inline-start" />
            Add Role
          </Button>
        }
      >
        <div className="px-4 pb-3 @min-[32rem]/roles:hidden">
          <Select value={picked} onValueChange={setPicked}>
            <SelectTrigger aria-label="Role" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              {ROLES.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Permission</TableHead>
              {ROLES.map((role, i) => (
                <TableHead
                  key={role.id}
                  className={cn(
                    i === ROLES.length - 1 && "pr-4",
                    narrowHidden(role.id)
                  )}
                >
                  {role.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {areas.map((area) => (
              <Fragment key={area}>
                <TableGroupRow colSpan={ROLES.length + 1}>{area}</TableGroupRow>
                {PERMISSIONS.filter((row) => row.area === area).map((row) => (
                  <TableRow key={row.id} className="hover:bg-transparent">
                    <TableCell className="pl-4">{row.label}</TableCell>
                    {ROLES.map((role, i) => {
                      const value = grid[role.id][row.id]
                      const label = `${role.name}: ${row.area}, ${row.label}`
                      const reason =
                        role.id === "admin" && row.area === "Settings"
                          ? OWN_SETTINGS
                          : null
                      return (
                        <TableCell
                          key={role.id}
                          className={cn(
                            i === ROLES.length - 1 && "pr-4",
                            narrowHidden(role.id)
                          )}
                        >
                          {row.kind === "switch" ? (
                            <FlagSwitch
                              on={value === true}
                              label={label}
                              reason={reason}
                              onChange={(on) => change(role.id, row.id, on)}
                            />
                          ) : (
                            <ReasonTooltip reason={reason}>
                              <Select
                                value={value as Level}
                                disabled={Boolean(reason)}
                                onValueChange={(next) =>
                                  change(role.id, row.id, next as Level)
                                }
                              >
                                <SelectTrigger
                                  size="sm"
                                  aria-label={label}
                                  className="w-28"
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  {(["None", "Owned", "All"] as const).map(
                                    (level) => (
                                      <SelectItem key={level} value={level}>
                                        {level}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </ReasonTooltip>
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TitledCard>
    </div>
  )
}

/** The settings page alone: its header, then one card for each set of options. */
export function SettingsPageContent() {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="The stages, lost reasons, and roles that every team uses."
      />
      <StagesCard />
      <ReasonsCard />
      <RolesCard />
      <Toaster />
    </>
  )
}

/** The settings page in the page's frame. */
export function SettingsPageExample() {
  return (
    <Screen caption="Drag a stage's grip: the order saves at once. Change a level or a switch: it saves at once, with Undo. Make the window narrower: Roles shows one role at a time.">
      <SettingsPageContent />
    </Screen>
  )
}

/** One long form behind tabs and a Save button, against a card for each set that saves as it changes. */
export function SettingsPageBeforeAfter() {
  return (
    <BeforeAfter
      beforeNote="every setting in one form under page tabs, saved together at the end"
      afterNote="a card for each set of options; each change saves where it is made"
      before={
        <>
          <PageHeader title="Settings" />
          <Tabs defaultValue="general">
            <TabsList variant="line">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="stages">Stages</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
            </TabsList>
          </Tabs>
          <Field>
            <FieldLabel htmlFor="before-stage">Stage 1</FieldLabel>
            <Input id="before-stage" defaultValue="Discovery" />
          </Field>
          <Field>
            <FieldLabel htmlFor="before-reason">Lost Reason 1</FieldLabel>
            <Input id="before-reason" defaultValue="No budget" />
          </Field>
          <Button className="self-end">Save Changes</Button>
        </>
      }
      after={
        <>
          <PageHeader title="Settings" />
          <ReasonsCard />
        </>
      }
    />
  )
}

export const settingsPageExamples = {
  "How it looks and behaves": <SettingsPageExample />,
  "Before and after": <SettingsPageBeforeAfter />,
}
