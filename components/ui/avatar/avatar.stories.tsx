import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "Components/Files and Media/Avatar",
  component: Avatar,
  args: {
    size: "default",
    shape: "circle",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl"],
    },
    shape: { control: "inline-radio", options: ["circle", "square"] },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: { size: "default" },
  render: ({ size, shape }) => (
    <Avatar size={size} shape={shape} label="shadcn">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  args: { size: "default" },
  render: ({ size, shape }) => (
    <Avatar size={size} shape={shape}>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

const SIZES = ["xs", "sm", "default", "lg", "xl"] as const

// A logo with a transparent ground: a logo sits on white (className), so it shows in Dark too.
const LOGO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="#0f766e"/><path d="M20 34h24M32 22v24" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>'
  )

// An app's own colors, picked by the record's id; plain values here.
const TEAL = { fill: "oklch(0.93 0.05 190)", text: "oklch(0.42 0.08 190)" }

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["circle", "square"] as const).map((shape) => (
        <div key={shape} className="flex items-center gap-3">
          {SIZES.map((size) => (
            <Avatar key={size} size={size} shape={shape}>
              <AvatarFallback>NP</AvatarFallback>
            </Avatar>
          ))}
        </div>
      ))}
    </div>
  ),
}

function Matrix() {
  const columns = [
    ["Photo", "circle"],
    ["Initials", "circle"],
    ["Colored", "circle"],
    ["No one", "circle"],
    ["Logo", "square"],
    ["Monogram", "square"],
    ["Colored", "square"],
    ["None", "square"],
  ] as const
  return (
    <table className="text-xs text-muted-foreground">
      <thead>
        <tr>
          <th />
          {columns.map(([name, shape], i) => (
            <th key={i} className="px-2 pb-2 text-left font-normal">
              {name}
              <br />
              {shape}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SIZES.map((size) => (
          <tr key={size}>
            <td className="pr-3">{size}</td>
            {columns.map(([name, shape], i) => (
              <td key={i} className="p-2">
                <Avatar
                  size={size}
                  shape={shape}
                  empty={name === "No one" || name === "None"}
                  colors={name === "Colored" ? TEAL : undefined}
                >
                  {name === "Photo" && (
                    <AvatarImage src="https://github.com/shadcn.png" />
                  )}
                  {name === "Logo" && (
                    <AvatarImage
                      src={LOGO}
                      className="bg-white object-contain"
                    />
                  )}
                  <AvatarFallback>
                    {shape === "circle" ? "DW" : "NP"}
                  </AvatarFallback>
                </Avatar>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/** Every shape and size: a person with a photo, initials, an app's colors and no one; a company's logo, monogram,
 *  colors and none. Light, then Dark. */
export const ShapesAndStates: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="flex flex-wrap">
      <div className="bg-background p-6">
        <Matrix />
      </div>
      <div className="dark bg-background p-6">
        <Matrix />
      </div>
    </div>
  ),
}

/** A picture that fails to load keeps its initials. */
export const BrokenImage: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/missing-photo.png" />
        <AvatarFallback>DW</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarImage
          src="/missing-logo.png"
          className="bg-white object-contain"
        />
        <AvatarFallback>NP</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarFallback>AB</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>AA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>BB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CC</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
}
