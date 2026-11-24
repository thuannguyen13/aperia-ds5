import { Fragment, useState } from "react"
import { toast } from "sonner"
import { BellIcon, ChevronDownIcon, PlusIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  BlockedMenuItem,
  Button,
  Checkbox,
  ConfirmDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FlagSwitch,
  IN_USE_DELETE,
  ReasonTooltip,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Table,
  TableBody,
  TableCell,
  TableGroupRow,
  TableHead,
  TableHeader,
  TableRow,
  TitledCard,
  Toaster,
} from "aperia-ds5"
import { cn } from "@/lib/utils"
import { BeforeAfter, Screen } from "./before-after"

type Level = "None" | "Owned" | "All"
type Role = { id: string; name: string; users: number }
type Row = {
  id: string
  area: string
  label: string
  kind: "level" | "switch"
}

const ROLES: Role[] = [
  { id: "admin", name: "Admin", users: 2 },
  { id: "manager", name: "Sales Manager", users: 0 },
  { id: "rep", name: "Sales Rep", users: 14 },
]

const ROWS: Row[] = [
  { id: "prospects-view", area: "Prospects", label: "View", kind: "level" },
  { id: "prospects-edit", area: "Prospects", label: "Edit", kind: "level" },
  {
    id: "prospects-menu",
    area: "Prospects",
    label: "Menu Visibility",
    kind: "switch",
  },
  { id: "settings-view", area: "Settings", label: "View", kind: "level" },
  {
    id: "settings-menu",
    area: "Settings",
    label: "Menu Visibility",
    kind: "switch",
  },
]
const AREAS = [...new Set(ROWS.map((row) => row.area))]

type Grid = Record<string, Record<string, Level | boolean>>
const START: Grid = {
  admin: {
    "prospects-view": "All",
    "prospects-edit": "All",
    "prospects-menu": true,
    "settings-view": "All",
    "settings-menu": true,
  },
  manager: {
    "prospects-view": "All",
    "prospects-edit": "All",
    "prospects-menu": true,
    "settings-view": "None",
    "settings-menu": false,
  },
  rep: {
    "prospects-view": "Owned",
    "prospects-edit": "Owned",
    "prospects-menu": true,
    "settings-view": "None",
    "settings-menu": false,
  },
}

// The viewer is an admin: their own role keeps Settings.
const OWN_SETTINGS = "You cannot remove your own role's access to Settings."
const lockedFor = (role: Role, row: Row) =>
  role.id === "admin" && row.area === "Settings" ? OWN_SETTINGS : null

function LevelPicker({
  value,
  label,
  reason,
  onPick,
}: {
  value: Level
  label: string
  reason: string | null
  onPick: (level: Level) => void
}) {
  return (
    <ReasonTooltip reason={reason}>
      <Select
        value={value}
        disabled={Boolean(reason)}
        onValueChange={(next) => next !== value && onPick(next as Level)}
      >
        <SelectTrigger
          size="sm"
          aria-label={label}
          className={cn("w-28", value === "None" && "text-muted-foreground")}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          {(["None", "Owned", "All"] as const).map((level) => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ReasonTooltip>
  )
}

function RoleHeading({ role, onDelete }: { role: Role; onDelete: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="-ml-2">
          {role.name}
          <ChevronDownIcon
            data-icon="inline-end"
            className="text-muted-foreground"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Edit Role</DropdownMenuItem>
        {role.users > 0 ? (
          <BlockedMenuItem reason={IN_USE_DELETE}>Delete Role</BlockedMenuItem>
        ) : (
          <DropdownMenuItem variant="destructive" onSelect={onDelete}>
            Delete Role
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** The Roles card: a column per role, a row per permission, each pick saved at once with Undo. */
export function RolesExample() {
  const [roles, setRoles] = useState(ROLES)
  const [grid, setGrid] = useState(START)
  const [picked, setPicked] = useState("rep")
  const [deleting, setDeleting] = useState<Role | null>(null)

  function change(role: Role, row: Row, value: Level | boolean) {
    const before = grid
    setGrid((was) => ({
      ...was,
      [role.id]: { ...was[role.id], [row.id]: value },
    }))
    const said = typeof value === "boolean" ? (value ? "Yes" : "No") : value
    toast(`${role.name}: ${row.area}, ${row.label} changed to ${said}.`, {
      action: { label: "Undo", onClick: () => setGrid(before) },
    })
  }

  // In a narrow card, the columns of roles other than the one picked hide.
  const narrowHidden = (role: Role) =>
    role.id !== picked && "@max-[40rem]/roles:hidden"

  return (
    <Screen caption="Change a level or a switch: it saves at once, with Undo. Point at Admin’s Settings to see why it’s locked. Open a role’s name for Edit Role and Delete Role.">
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
          <div className="px-4 pb-3 @min-[40rem]/roles:hidden">
            <Select value={picked} onValueChange={setPicked}>
              <SelectTrigger aria-label="Role" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {roles.map((role) => (
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
                {roles.map((role, i) => (
                  <TableHead
                    key={role.id}
                    className={cn(
                      i === roles.length - 1 && "pr-4",
                      narrowHidden(role)
                    )}
                  >
                    <RoleHeading
                      role={role}
                      onDelete={() => setDeleting(role)}
                    />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {AREAS.map((area) => (
                <Fragment key={area}>{rowsOf(area)}</Fragment>
              ))}
            </TableBody>
          </Table>
        </TitledCard>
      </div>
      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete Role?"
        action="Delete Role"
        onConfirm={() => {
          setRoles((was) => was.filter((role) => role.id !== deleting?.id))
          setDeleting(null)
        }}
      >
        This permanently deletes {deleting?.name}.
      </ConfirmDialog>
      <Toaster />
    </Screen>
  )

  function rowsOf(area: string) {
    return (
      <>
        <TableGroupRow colSpan={roles.length + 1}>{area}</TableGroupRow>
        {ROWS.filter((row) => row.area === area).map((row) => (
          <TableRow key={row.id} className="hover:bg-transparent">
            <TableCell className="pl-4">{row.label}</TableCell>
            {roles.map((role, i) => {
              const value = grid[role.id]?.[row.id] ?? "None"
              const label = `${role.name}: ${row.area}, ${row.label}`
              const reason = lockedFor(role, row)
              return (
                <TableCell
                  key={role.id}
                  className={cn(
                    i === roles.length - 1 && "pr-4",
                    narrowHidden(role)
                  )}
                >
                  {row.kind === "switch" ? (
                    <FlagSwitch
                      on={value === true}
                      label={label}
                      reason={reason}
                      onChange={(on) => change(role, row, on)}
                    />
                  ) : (
                    <LevelPicker
                      value={value as Level}
                      label={label}
                      reason={reason}
                      onPick={(level) => change(role, row, level)}
                    />
                  )}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </>
    )
  }
}

type Event = { id: string; feature: string; label: string }
const EVENTS: Event[] = [
  { id: "assigned", feature: "Pipeline", label: "Opportunity assignment" },
  { id: "stage", feature: "Pipeline", label: "Stage change" },
  { id: "task-due", feature: "Tasks", label: "Task due today" },
]
const CHANNELS = ["In App", "Email"] as const
const FEATURES = [...new Set(EVENTS.map((event) => event.feature))]

function NotificationTable({
  value,
  onChange,
}: {
  value: Record<string, boolean>
  onChange: (key: string, on: boolean, event: Event) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Event</TableHead>
          {CHANNELS.map((channel, i) => (
            <TableHead
              key={channel}
              className={i === CHANNELS.length - 1 ? "pr-4" : undefined}
            >
              {channel}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {FEATURES.map((feature) => (
          <NotificationGroup
            key={feature}
            feature={feature}
            value={value}
            onChange={onChange}
          />
        ))}
      </TableBody>
    </Table>
  )
}

function NotificationGroup({
  feature,
  value,
  onChange,
}: {
  feature: string
  value: Record<string, boolean>
  onChange: (key: string, on: boolean, event: Event) => void
}) {
  return (
    <>
      <TableGroupRow colSpan={CHANNELS.length + 1}>{feature}</TableGroupRow>
      {EVENTS.filter((event) => event.feature === feature).map((event) => (
        <TableRow key={event.id} className="hover:bg-transparent">
          <TableCell className="pl-4">{event.label}</TableCell>
          {CHANNELS.map((channel, i) => {
            const key = `${event.id}:${channel}`
            return (
              <TableCell
                key={channel}
                className={i === CHANNELS.length - 1 ? "pr-4" : undefined}
              >
                <FlagSwitch
                  on={value[key] ?? false}
                  label={`${event.feature}: ${event.label}, ${channel}`}
                  onChange={(on) => onChange(key, on, event)}
                />
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </>
  )
}

/** Notification Settings: a sheet laid out like Roles, each switch saved at once; Email on Task due today is refused. */
export function NotificationSettingsExample() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Record<string, boolean>>({
    "assigned:In App": true,
    "assigned:Email": true,
    "stage:In App": true,
    "task-due:In App": true,
  })
  const [refusal, setRefusal] = useState<string | null>(null)

  return (
    <Screen
      caption="Open the sheet. Each switch saves at once; turning on Email for Task due today is refused, so it flips back and says why."
      className="items-start"
    >
      <Button variant="outline" onClick={() => setOpen(true)}>
        <BellIcon data-icon="inline-start" />
        Notification Settings
      </Button>
      <Sheet
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          setRefusal(null)
        }}
      >
        <SheetContent className="data-[side=right]:sm:max-w-xl">
          <SheetHeader className="border-b">
            <SheetTitle>Notification Settings</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 overflow-y-auto p-4">
            {refusal && (
              <Alert variant="destructive">
                <AlertDescription>{refusal}</AlertDescription>
              </Alert>
            )}
            <div className="overflow-hidden surface">
              <NotificationTable
                value={value}
                onChange={(key, on, event) => {
                  setRefusal(null)
                  // The server refuses this one: the switch stays as it was and the reason shows above the table.
                  if (event.id === "task-due" && key.endsWith("Email") && on) {
                    setRefusal(
                      "Email for Task due today is off for your team. Ask an admin to turn it on."
                    )
                    return
                  }
                  setValue((was) => ({ ...was, [key]: on }))
                }}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Screen>
  )
}

/** A checkbox grid with a Save button and a failure toast, against cells that save at once and refuse in place. */
export function RolesBeforeAfter() {
  const [on, setOn] = useState(true)
  return (
    <BeforeAfter
      beforeNote="unnamed checkboxes, a Save button, a red message for a failed save"
      afterNote="each cell says its value and saves at once; the reason shows above the table"
      before={
        <>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-3">Sales Rep</TableHead>
                  <TableHead>View</TableHead>
                  <TableHead>Edit</TableHead>
                  <TableHead className="pr-3">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {["Prospects", "Settings"].map((area, i) => (
                  <TableRow key={area}>
                    <TableCell className="pl-3">{area}</TableCell>
                    <TableCell>
                      <Checkbox defaultChecked={i === 0} />
                    </TableCell>
                    <TableCell>
                      <Checkbox defaultChecked={i === 0} />
                    </TableCell>
                    <TableCell className="pr-3">
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
          <div className="self-end rounded-lg bg-destructive px-3 py-2 text-xs text-white shadow-md">
            Failed to save permissions.
          </div>
        </>
      }
      after={
        <>
          <Alert variant="destructive">
            <AlertDescription>
              Email for Task due today is off for your team. Ask an admin to
              turn it on.
            </AlertDescription>
          </Alert>
          <div className="overflow-hidden surface">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Event</TableHead>
                  <TableHead>In App</TableHead>
                  <TableHead className="pr-4">Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableGroupRow colSpan={3}>Tasks</TableGroupRow>
                <TableRow className="hover:bg-transparent">
                  <TableCell className="pl-4">Task due today</TableCell>
                  <TableCell>
                    <FlagSwitch
                      on={on}
                      label="Tasks: Task due today, In App"
                      onChange={setOn}
                    />
                  </TableCell>
                  <TableCell className="pr-4">
                    <FlagSwitch
                      on={false}
                      label="Tasks: Task due today, Email"
                      onChange={() => {}}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </>
      }
    />
  )
}

export const rolesAndPermissionsExamples = {
  Roles: <RolesExample />,
  "Notification Settings": <NotificationSettingsExample />,
  "Before and after": <RolesBeforeAfter />,
}
