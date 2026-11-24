import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar"
import { initials } from "@/lib/format"
import { cn } from "@/lib/utils"

/**
 * What a record looks like in a picker, drawn with the library's Avatar: a person a circle, their photo or else their
 * initials; a company, a product or a team `shape="square"`, its logo or else a monogram. Which picture and which
 * colors belong to the app, as its avatar adapter decides them everywhere else.
 */
export type EntityPicture = {
  /** The photo or logo. Null or left out shows the letters. */
  src?: string | null
  /** The letters under the picture, or in its place: initials of the name unless given, such as a company's acronym. */
  fallback?: string
  /** "square" for companies, products and teams; people are circles. */
  shape?: "circle" | "square"
  /** The letters' fill and text, as CSS colors, such as a pair the app fixes by the record's id. */
  colors?: { fill: string; text: string }
  /** No one, such as an unassigned owner: a dashed outline. */
  empty?: boolean
}

/**
 * A record's picture at a picker's two sizes: 20px on a list row, 16px in the field and on a chip. Hidden from screen
 * readers, as the record's name sits beside it.
 */
export function PickerPicture({
  picture,
  name,
  size,
}: {
  picture: EntityPicture
  name: string
  size: "row" | "chip"
}) {
  const chip = size === "chip"
  return (
    <Avatar
      size="xs"
      shape={picture.shape}
      colors={picture.colors}
      empty={picture.empty}
      className={chip ? "size-4" : undefined}
    >
      {picture.src && (
        // White behind a logo, so a transparent mark shows in Dark too.
        <AvatarImage
          src={picture.src}
          className={
            picture.shape === "square" ? "bg-white object-contain" : undefined
          }
        />
      )}
      <AvatarFallback
        className={cn(chip && "group-data-[size=xs]/avatar:text-[8px]")}
      >
        {picture.fallback ?? initials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
