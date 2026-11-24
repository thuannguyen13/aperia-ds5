import { useState, useTransition } from "react"
import {
  BanknoteIcon,
  CreditCardIcon,
  PencilIcon,
  PlusIcon,
  ShieldCheckIcon,
  Trash2Icon,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  Button,
  EmptyState,
  EmptyValue,
  FormSheet,
  HiddenValue,
  IconButton,
  Input,
  Label,
  MoneyInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SheetForm,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableGroupRow,
  TitledCard,
  useSheetForm,
} from "aperia-ds5"
import { BeforeAfter, Screen } from "./before-after"

type Line = {
  key: string
  name: string
  rate: string
  qty: string
  billing: string
}
type Group = {
  id: string
  name: string
  icon: typeof CreditCardIcon
  lines: Line[]
}

const BILLING: Record<string, string> = {
  monthly: "Monthly",
  once: "One-Time",
  annual: "Annual",
}

const START: Group[] = [
  {
    id: "issuing",
    name: "Card Issuing",
    icon: CreditCardIcon,
    lines: [
      {
        key: "l1",
        name: "Card issuance fee",
        rate: "1.25",
        qty: "40000",
        billing: "monthly",
      },
      {
        key: "l2",
        name: "Platform license",
        rate: "12000",
        qty: "1",
        billing: "once",
      },
    ],
  },
  {
    id: "fraud",
    name: "Fraud Monitoring",
    icon: ShieldCheckIcon,
    lines: [
      {
        key: "l3",
        name: "Transaction monitoring",
        rate: "0.02",
        qty: "1200000",
        billing: "monthly",
      },
    ],
  },
]

const TEMPLATE: Omit<Line, "key">[] = [
  { name: "Setup fee", rate: "2500", qty: "1", billing: "once" },
  { name: "Support plan", rate: "", qty: "12", billing: "monthly" },
]

// The same sum the server works out: rate times quantity, or nothing while either is missing.
function subtotal(line: Line): number | null {
  const rate = Number.parseFloat(line.rate)
  const qty = Number.parseFloat(line.qty)
  return Number.isFinite(rate) && Number.isFinite(qty) ? rate * qty : null
}
function total(lines: Line[]): number | null {
  const sums = lines.map(subtotal)
  return sums.some((sum) => sum === null)
    ? null
    : sums.reduce<number>((a, b) => a + (b ?? 0), 0)
}

const money = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
const rate = (value: string) =>
  `$${Number.parseFloat(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`
const qty = (value: string) => Number.parseFloat(value).toLocaleString("en-US")

function Amount({ value, hidden }: { value: number | null; hidden: boolean }) {
  if (hidden) return <HiddenValue />
  return value === null ? <EmptyValue /> : <>{money(value)}</>
}

function Logo({ group }: { group: Group }) {
  const Icon = group.icon
  return (
    <Avatar size="xs" shape="square">
      <AvatarFallback>
        <Icon className="size-3" aria-hidden />
      </AvatarFallback>
    </Avatar>
  )
}

/** The page's card: read-only, a band per product, the Total on the Subtotal column's edge. */
function LineItemsCard({
  groups,
  hidden,
  onEdit,
}: {
  groups: Group[]
  hidden: boolean
  onEdit: () => void
}) {
  const lines = groups.flatMap((group) => group.lines)
  const edit = (
    <Button variant="outline" aria-label="Edit Line Items" onClick={onEdit}>
      <PencilIcon data-icon="inline-start" />
      Edit
    </Button>
  )
  if (lines.length === 0)
    return (
      <TitledCard title="Line Items">
        <EmptyState icon={BanknoteIcon} title="No Line Items" action={edit} />
      </TitledCard>
    )
  return (
    <TitledCard title="Line Items" action={edit}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Name</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead>Billing</TableHead>
            <TableHead className="pr-4 text-right">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => [
            <TableGroupRow
              key={group.id}
              colSpan={5}
              leading={<Logo group={group} />}
              trailing={
                <span className="tabular-nums">
                  <Amount value={total(group.lines)} hidden={hidden} />
                </span>
              }
            >
              {group.name}
            </TableGroupRow>,
            ...group.lines.map((line) => (
              <TableRow key={line.key}>
                <TableCell className="pl-4 whitespace-normal">
                  {line.name}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {hidden ? (
                    <HiddenValue />
                  ) : line.rate ? (
                    rate(line.rate)
                  ) : (
                    <EmptyValue />
                  )}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {qty(line.qty)}
                </TableCell>
                <TableCell>{BILLING[line.billing]}</TableCell>
                <TableCell className="pr-4 text-right tabular-nums">
                  <Amount value={subtotal(line)} hidden={hidden} />
                </TableCell>
              </TableRow>
            )),
          ])}
          <TableRow className="hover:bg-transparent">
            <TableCell className="pl-4 font-medium">Total</TableCell>
            <TableCell colSpan={3} />
            <TableCell className="pr-4 text-right font-medium tabular-nums">
              <Amount value={total(lines)} hidden={hidden} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TitledCard>
  )
}

let made = 10
const newKey = () => `l${++made}`

/** The wide Edit sheet: a card per product, rows of small fields, subtotals as the user types. */
function LineItemsForm({
  groups,
  onSave,
}: {
  groups: Group[]
  onSave: (groups: Group[]) => void
}) {
  const form = useSheetForm({ groups })
  const { draft, set } = form
  const [pending, startTransition] = useTransition()
  const change = (id: string, lines: Line[]) =>
    set(
      "groups",
      draft.groups.map((group) =>
        group.id === id ? { ...group, lines } : group
      )
    )

  return (
    <SheetForm
      form={form}
      onSubmit={() => startTransition(() => onSave(draft.groups))}
      pending={pending}
      submit="Save Changes"
    >
      <div className="flex flex-col gap-4">
        {draft.groups.map((group) => {
          const groupTotal = total(group.lines)
          const add = (
            <span className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  change(group.id, [
                    ...group.lines,
                    ...TEMPLATE.map((line) => ({ ...line, key: newKey() })),
                  ])
                }
              >
                Apply Template
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  change(group.id, [
                    ...group.lines,
                    {
                      key: newKey(),
                      name: "",
                      rate: "",
                      qty: "1",
                      billing: "monthly",
                    },
                  ])
                }
              >
                <PlusIcon data-icon="inline-start" />
                Add Line
              </Button>
            </span>
          )
          return (
            <TitledCard
              key={group.id}
              title={group.name}
              figure={groupTotal === null ? "—" : money(groupTotal)}
              action={group.lines.length > 0 ? add : undefined}
            >
              {group.lines.length === 0 ? (
                <EmptyState
                  icon={BanknoteIcon}
                  title="No Line Items"
                  action={add}
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4">Name</TableHead>
                      <TableHead className="w-36">Rate</TableHead>
                      <TableHead className="w-28">Qty</TableHead>
                      <TableHead className="w-36">Billing</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                      <TableHead className="w-12 pr-4" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group.lines.map((line, index) => {
                      const edit = (patch: Partial<Line>) =>
                        change(
                          group.id,
                          group.lines.map((each) =>
                            each.key === line.key ? { ...each, ...patch } : each
                          )
                        )
                      const sum = subtotal(line)
                      const n = index + 1
                      return (
                        <TableRow key={line.key} className="group/row">
                          <TableCell className="min-w-44 pl-4">
                            <Input
                              aria-label={`Line ${n} name`}
                              value={line.name}
                              onChange={(event) =>
                                edit({ name: event.target.value })
                              }
                            />
                          </TableCell>
                          <TableCell className="min-w-32">
                            <MoneyInput
                              aria-label={`Line ${n} rate`}
                              value={line.rate}
                              onChange={(value) => edit({ rate: value })}
                            />
                          </TableCell>
                          <TableCell className="min-w-24">
                            <Input
                              aria-label={`Line ${n} quantity`}
                              inputMode="decimal"
                              className="text-right tabular-nums"
                              value={line.qty}
                              onChange={(event) =>
                                edit({ qty: event.target.value })
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={line.billing}
                              onValueChange={(billing) => edit({ billing })}
                            >
                              <SelectTrigger
                                aria-label={`Line ${n} billing`}
                                className="w-full"
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(BILLING).map(
                                  ([value, label]) => (
                                    <SelectItem key={value} value={value}>
                                      {label}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {sum === null ? <EmptyValue /> : money(sum)}
                          </TableCell>
                          <TableCell className="pr-4">
                            <IconButton
                              label={`Remove line ${n}`}
                              className="pointer-fine:opacity-0 pointer-fine:group-hover/row:opacity-100 pointer-fine:focus-visible:opacity-100"
                              onClick={() =>
                                change(
                                  group.id,
                                  group.lines.filter(
                                    (each) => each.key !== line.key
                                  )
                                )
                              }
                            >
                              <Trash2Icon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </TitledCard>
          )
        })}
      </div>
    </SheetForm>
  )
}

/** The Northwind Payments opportunity's Line Items card, with its Edit sheet. */
export function LineItemsExample() {
  const [groups, setGroups] = useState(START)
  const [hidden, setHidden] = useState(false)
  const [editing, setEditing] = useState(false)
  return (
    <Screen
      caption="Press Edit, then clear a rate: its subtotal reads — until it can be worked out again."
      controls={
        <>
          <Switch
            id="line-items-hidden"
            checked={hidden}
            onCheckedChange={setHidden}
          />
          <Label htmlFor="line-items-hidden" className="font-normal">
            View as someone who may not see amounts
          </Label>
        </>
      }
    >
      <LineItemsCard
        groups={groups}
        hidden={hidden}
        onEdit={() => setEditing(true)}
      />
      <FormSheet
        open={editing}
        onOpenChange={setEditing}
        title="Edit Line Items"
        className="data-[side=right]:sm:max-w-6xl"
      >
        {editing && (
          <LineItemsForm
            groups={groups}
            onSave={(next) => {
              setGroups(next)
              setEditing(false)
            }}
          />
        )}
      </FormSheet>
    </Screen>
  )
}

/** Fields and left-aligned amounts on the page, against the read-only card. */
export function LineItemsBeforeAfter() {
  const lines = START[0].lines
  return (
    <BeforeAfter
      beforeNote="fields on the page, amounts on the left, “-” for a missing rate"
      afterNote="the page only shows; figures on the right; Total on the Subtotal edge"
      before={
        <div className="flex w-full flex-col gap-2 surface p-4">
          <h3 className="text-lg font-semibold">Card Issuing Line Items</h3>
          {lines.map((line, i) => (
            <div key={line.key} className="flex items-center gap-2">
              <Input
                aria-label="Name"
                defaultValue={line.name}
                className="flex-1"
              />
              <Input
                aria-label="Rate"
                defaultValue={i === 0 ? "-" : line.rate}
                className="w-20"
              />
            </div>
          ))}
          <p>Total: $12000</p>
          <Button className="self-end">Submit</Button>
        </div>
      }
      after={
        <LineItemsCard
          groups={[
            { ...START[0], lines: [{ ...lines[0], rate: "" }, lines[1]] },
          ]}
          hidden={false}
          onEdit={() => {}}
        />
      }
    />
  )
}

export const lineItemsExamples = {
  "How it looks and behaves": <LineItemsExample />,
  "Before and after": <LineItemsBeforeAfter />,
}
