import type { ReactNode } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  opensOnClick,
} from "aperia-ds5"

export { EmptyState } from "aperia-ds5"
export { IconButton, TitledCard } from "../recipes"

export const TASKS = [
  {
    name: "Send the pricing proposal",
    owner: "Dana Whitfield",
    due: "Nov 24, 2026",
  },
  {
    name: "Review the signed agreement",
    owner: "Marcus Lee",
    due: "Nov 27, 2026",
  },
  { name: "Schedule onboarding", owner: "Priya Raman", due: "Dec 2, 2026" },
]

/**
 * The tasks table as a card holds it: the first and last cells padded to the card title's line. With `extra` (a column
 * of buttons, for a Don't) it drops Owner, so the extra column shows in half a frame.
 */
export function TaskTable({
  extra,
}: {
  extra?: (task: (typeof TASKS)[number]) => ReactNode
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Task</TableHead>
          {!extra && <TableHead>Owner</TableHead>}
          <TableHead className={extra ? undefined : "pr-4"}>Due</TableHead>
          {extra && <TableHead className="pr-4" />}
        </TableRow>
      </TableHeader>
      <TableBody>
        {TASKS.map((t) => (
          <TableRow
            key={t.name}
            {...(extra ? {} : opensOnClick(t.name, () => {}))}
          >
            <TableCell className="pl-4">{t.name}</TableCell>
            {!extra && <TableCell>{t.owner}</TableCell>}
            <TableCell className={extra ? undefined : "pr-4"}>
              {t.due}
            </TableCell>
            {extra && (
              <TableCell className="pr-4 text-right">{extra(t)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/** A frame wide enough for a card: half the page in a Do / Don't pair, up to 42rem when the pair stacks. */
export function Wide({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-2xl">{children}</div>
}
