"use client"

import { useRef, useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../avatar/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../hover-card/hover-card"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../item/item"
import { initials } from "@/lib/format"
import { cn } from "@/lib/utils"

/**
 * One member of a stack, as the app's picture adapter maps a record: `role` names what they are here and `detail` adds
 * to it, such as a commission share. A person by default (a circle); a company, product or team is `shape="square"`,
 * its logo in `image`.
 */
export type StackPerson = {
  id: string | number
  name: string
  role?: string
  detail?: string
  /** A photo or logo URL; the initials show until it loads, and wherever it fails. */
  image?: string | null
  /** The letters the fallback shows; the name's initials by default. */
  monogram?: string
  /** The fallback's colors, picked by the record's id so they never change between pages. */
  colors?: { fill: string; text: string }
  shape?: "circle" | "square"
}

/** How many avatars a stack draws before the rest become a count. */
const SHOWN = 3

function StackAvatar({
  person,
  size,
}: {
  person: StackPerson
  size: "xs" | "sm"
}) {
  const square = person.shape === "square"
  return (
    <Avatar size={size} shape={person.shape} colors={person.colors}>
      {person.image && (
        // A logo sits on white so a transparent mark shows in Dark too, and is shown whole rather than cropped.
        <AvatarImage
          src={person.image}
          className={square ? "bg-white object-contain" : undefined}
        />
      )}
      <AvatarFallback className="font-semibold">
        {person.monogram ?? initials(person.name)}
      </AvatarFallback>
    </Avatar>
  )
}

/**
 * The people of a record (or other records, such as its products) in its page header: their avatars in the order given,
 * the first three and then "+N" for the rest. The button holding them opens a card listing everyone, one row each with
 * their avatar, name and role, on hover, on keyboard focus and, as Radix's hover card ignores touch, on a tap. Its
 * accessible name lists the people, so nothing hides behind the hover. With no one it draws the empty avatar, and
 * `empty` ("No assignee") is the card and the name.
 */
export function PeopleStack({
  people,
  title,
  empty,
  size = "sm",
  className,
}: {
  people: readonly StackPerson[]
  /** What they are to the record, such as "Sales Reps": the card's heading and the start of the button's name. */
  title: string
  /** What no one reads as, such as "No assignee". */
  empty: string
  /** The avatars' size in the header line, 24px by default; `xs` (20px) for a denser line. The card's rows keep 24px. */
  size?: "xs" | "sm"
  className?: string
}) {
  const [open, setOpen] = useState(false)
  // A touch tap reaches the trigger as focus and then click, and Radix would open and close it on the way, so a touch
  // sets the state from where the tap began instead.
  const touch = useRef<{ wasOpen: boolean } | null>(null)
  const shown = people.slice(0, SHOWN)
  const hidden = people.length - shown.length
  const label =
    people.length === 0
      ? `${title}: ${empty}`
      : `${title}: ${people
          .map((person) =>
            person.role ? `${person.name} (${person.role})` : person.name
          )
          .join(", ")}`

  return (
    <HoverCard
      open={open}
      onOpenChange={(next) => {
        if (!touch.current) setOpen(next)
      }}
      openDelay={150}
      closeDelay={100}
    >
      <HoverCardTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={cn(
            "flex cursor-pointer rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
            className
          )}
          onPointerDown={(event) => {
            touch.current =
              event.pointerType === "touch" ? { wasOpen: open } : null
          }}
          onClick={() => {
            if (touch.current) setOpen(!touch.current.wasOpen)
            touch.current = null
          }}
        >
          {people.length === 0 ? (
            <Avatar size={size} empty />
          ) : (
            <AvatarGroup>
              {shown.map((person) => (
                <StackAvatar key={person.id} person={person} size={size} />
              ))}
              {hidden > 0 && (
                <AvatarGroupCount className={cn(size === "sm" && "text-xs")}>
                  +{hidden}
                </AvatarGroupCount>
              )}
            </AvatarGroup>
          )}
        </button>
      </HoverCardTrigger>
      {/* A menu's rhythm: 4px inside the card and 6px above and below each line, so the title and every row sit evenly
          apart. The item group's own gap between rows is taken out here. */}
      <HoverCardContent align="start" className="w-auto min-w-56 p-1">
        <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {title}
        </p>
        {people.length === 0 ? (
          <p className="px-2 py-1.5 text-muted-foreground">{empty}</p>
        ) : (
          <ItemGroup role="list" className="gap-0 has-data-[size=xs]:gap-0">
            {people.map((person) => (
              <Item
                key={person.id}
                role="listitem"
                size="xs"
                className="gap-2.5 border-0 px-2 py-1.5"
              >
                <ItemMedia>
                  <StackAvatar person={person} size="sm" />
                </ItemMedia>
                <ItemContent className="min-w-0 gap-0">
                  <ItemTitle className="truncate">{person.name}</ItemTitle>
                  {(person.role || person.detail) && (
                    <span className="text-xs text-muted-foreground">
                      {[person.role, person.detail].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}
