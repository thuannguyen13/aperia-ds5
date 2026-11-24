"use client"

import { useEffect, useId, useState } from "react"
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
  type Modifier,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVerticalIcon } from "lucide-react"

import { Button } from "../button/button"

// A held row moves only up and down, and only within its own list: without it the row slides sideways out of its
// table, or floats over a neighbouring list it can never be dropped in.
const withinList: Modifier = ({
  transform,
  draggingNodeRect,
  containerNodeRect,
}) => {
  if (!draggingNodeRect || !containerNodeRect) return { ...transform, x: 0 }
  const y = Math.min(
    Math.max(transform.y, containerNodeRect.top - draggingNodeRect.top),
    containerNodeRect.bottom - draggingNodeRect.bottom
  )
  return { ...transform, x: 0, y }
}

/**
 * While a row is held, Escape only puts it back: the sheet or dialog around the list, which closes on Escape unless
 * something has already claimed the key, stays open with its edits.
 */
function useEscapeKeepsOpen(holding: boolean) {
  useEffect(() => {
    if (!holding) return
    const claim = (event: KeyboardEvent) => {
      if (event.key === "Escape") event.preventDefault()
    }
    window.addEventListener("keydown", claim, true)
    return () => window.removeEventListener("keydown", claim, true)
  }, [holding])
}

/** Where `from` lands at `to`, the rest keeping their order: what a caller does with `onMove`. */
export function moveItem<T>(items: readonly T[], from: number, to: number) {
  const moved = [...items]
  moved.splice(to, 0, ...moved.splice(from, 1))
  return moved
}

/**
 * A vertical list whose rows reorder by dragging their handle, or from the keyboard: Space on the handle picks a row
 * up, the arrows move it, Space drops it and Escape puts it back, each step read out. `onMove` gets the row's index
 * before and after. Each row is a `SortableRow`. In a table, put the list in its own `TableBody`: a held row stops at
 * the edge of its body.
 */
export function SortableList({
  ids,
  name,
  onMove,
  children,
}: {
  ids: UniqueIdentifier[]
  /** What a screen reader calls a row as it moves, such as its name. */
  name: (id: UniqueIdentifier) => string
  onMove: (from: number, to: number) => void
  children: React.ReactNode
}) {
  // A stable id, or the server and the browser number DndContext's aria-describedby differently.
  const id = useId()
  const sensors = useSensors(
    // A press becomes a drag after 4px, so a click on the handle stays a click.
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const [holding, setHolding] = useState(false)
  useEscapeKeepsOpen(holding)

  const place = (at: UniqueIdentifier) =>
    `position ${ids.indexOf(at) + 1} of ${ids.length}`
  const announcements: Announcements = {
    onDragStart: ({ active }) =>
      `Picked up ${name(active.id)}, ${place(active.id)}.`,
    onDragOver: ({ active, over }) =>
      over ? `${name(active.id)} is at ${place(over.id)}.` : undefined,
    onDragEnd: ({ active, over }) =>
      over
        ? `${name(active.id)} dropped at ${place(over.id)}.`
        : `${name(active.id)} dropped.`,
    onDragCancel: ({ active }) =>
      `Moving ${name(active.id)} was canceled. It is back at ${place(active.id)}.`,
  }

  function end({ active, over }: DragEndEvent) {
    setHolding(false)
    if (!over || active.id === over.id) return
    onMove(ids.indexOf(active.id), ids.indexOf(over.id))
  }

  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[withinList]}
      accessibility={{
        // Its hidden instructions and live region render inline otherwise, and a <div> is invalid inside a
        // <tbody>. dnd-kit renders them only once mounted, so the server never reads document.
        container: typeof document === "undefined" ? undefined : document.body,
        announcements,
        screenReaderInstructions: {
          draggable:
            "Press Space to pick up the row, the arrow keys to move it, Space to drop it, or Escape to cancel.",
        },
      }}
      onDragStart={() => setHolding(true)}
      onDragEnd={end}
      onDragCancel={() => setHolding(false)}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

/** What a `SortableRow` hands its row element: spread it on the element. */
export type SortableRowProps = {
  ref: (node: HTMLElement | null) => void
  style: React.CSSProperties
  className?: string
}

/**
 * One row of a `SortableList`. Spread `row` on the row element and place `handle(label)`, the grip it is dragged by,
 * inside it; `label` names the row for a screen reader, as in "Reorder Demo".
 */
export function SortableRow({
  id,
  children,
}: {
  id: UniqueIdentifier
  children: (
    row: SortableRowProps,
    handle: (label: string) => React.ReactNode
  ) => React.ReactNode
}) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })
  return children(
    {
      ref: setNodeRef,
      style: { transform: CSS.Translate.toString(transform), transition },
      // Lifted above the rows it passes: a solid card, since a table row's hover is see-through, with the dragging
      // shadow so it reads as held.
      className: isDragging
        ? "relative z-10 bg-card shadow-xl ring-[0.5px] ring-border hover:bg-card"
        : undefined,
    },
    (label) => (
      // No tooltip, unlike IconButton: one would stay behind where the drag began. The grab cursor says it.
      <Button
        ref={setActivatorNodeRef}
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={label}
        // touch-none: the browser would otherwise scroll the page instead of dragging on a phone.
        className="cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVerticalIcon />
      </Button>
    )
  )
}
