import type { ReactNode } from "react"
import { SearchIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  Button,
  CardContent,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Spinner,
} from "aperia-ds5"
import {
  DetailRow,
  DetailSection,
  EmptyValue,
  ListSkeleton,
  NoneText,
} from "../recipes"
import { cn } from "@/lib/utils"
import { DoDont } from "../blocks"
import { TaskTable, TitledCard, Wide } from "./shared"

// Live Do / Don't pairs for the Patterns pages on the app's frame, pages and lists, keyed by each page's rule heading.

/** A small page: its header, a toolbar and a card, stacked with `gap` (20px) or touching. */
function MiniPage({ gap }: { gap: boolean }) {
  return (
    <div
      className={cn("flex w-full max-w-2xl flex-col", gap ? "gap-5" : "gap-0")}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold tracking-tight">Tasks</h2>
        <Button>Add Task</Button>
      </div>
      <InputGroup className="max-w-56">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search tasks" aria-label="Search tasks" />
      </InputGroup>
      <TitledCard title="Open Tasks">
        <TaskTable />
      </TitledCard>
    </div>
  )
}

const PEOPLE = [
  { name: "Dana Whitfield", role: "Sales Manager" },
  { name: "Marcus Lee", role: "Account Executive" },
]

/** Contacts in a card: rows pulled back onto the title's line (`-mx-3`), or left indented by `Item`'s own padding. */
function Contacts({ aligned }: { aligned: boolean }) {
  return (
    <Wide>
      <TitledCard title="Contacts">
        <CardContent className="pb-4">
          <ItemGroup>
            {PEOPLE.map((person) => (
              <Item
                key={person.name}
                size="sm"
                className={aligned ? "-mx-3" : undefined}
              >
                <ItemMedia>
                  <Avatar size="sm">
                    <AvatarFallback>
                      {person.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{person.name}</ItemTitle>
                  <ItemDescription>{person.role}</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
      </TitledCard>
    </Wide>
  )
}

/** A frame the size of a small list page. */
function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-72 w-full max-w-2xl flex-col gap-5 overflow-hidden">
      {children}
    </div>
  )
}

/** A record's details with a missing website and phone and an empty priority, shown right or as an app drifts. */
function Details({ right }: { right: boolean }) {
  return (
    <Wide>
      <TitledCard title="Details">
        <CardContent className="pb-4">
          <DetailSection>
            <DetailRow label="Owner">Dana Whitfield</DetailRow>
            <DetailRow label="Website">
              {right ? <EmptyValue /> : "N/A"}
            </DetailRow>
            <DetailRow label="Phone">{right ? <EmptyValue /> : "-"}</DetailRow>
            <DetailRow label="Priority">
              {right ? <NoneText>No priority</NoneText> : null}
            </DetailRow>
          </DetailSection>
        </CardContent>
      </TitledCard>
    </Wide>
  )
}

export const pageLayoutExamples = {
  "Space sections evenly": (
    <DoDont
      stack
      good={<MiniPage gap />}
      bad={<MiniPage gap={false} />}
      goodNote="the header, the search and the card 20px apart"
      badNote="sections touching"
    />
  ),
  "Put content on its title's line": (
    <DoDont
      good={<Contacts aligned />}
      bad={<Contacts aligned={false} />}
      goodNote="pictures on the title's line"
      badNote="pictures indented by the rows' own padding"
    />
  ),
}

export const loadingExamples = {
  "Load in the page's own shape": (
    <DoDont
      stack
      good={
        <PageFrame>
          <ListSkeleton
            title={96}
            actions={1}
            filters={2}
            sort
            columns={[3, 2, 2]}
            rows={3}
            rowHeight={37}
          />
        </PageFrame>
      }
      bad={
        <PageFrame>
          <div className="flex flex-1 items-center justify-center">
            <Spinner className="size-6 text-muted-foreground" />
          </div>
        </PageFrame>
      }
      goodNote="the page's shape, so nothing moves when it lands"
      badNote="a spinner on an empty page"
    />
  ),
}

export const missingValueExamples = {
  "Show a missing value as a dash": (
    <DoDont
      good={<Details right />}
      bad={<Details right={false} />}
      goodNote="a gray dash, and “No priority” for an empty optional field"
      badNote="N/A, a hyphen and a blank"
    />
  ),
}
