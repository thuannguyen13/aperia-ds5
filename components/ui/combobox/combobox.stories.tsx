import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../button/button"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "./combobox"

const meta: Meta<typeof Combobox> = {
  title: "UI/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "[View in Figma](https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21180-33376)",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Combobox>

const states = ["Arizona", "California", "Colorado", "Florida", "Georgia", "New York", "Texas", "Washington"]

const timezones = [
  { value: "Americas", items: ["Eastern (EST)", "Central (CST)", "Pacific (PST)"] },
  { value: "Europe", items: ["London (GMT)", "Berlin (CET)"] },
]

export const Default: Story = {
  render: () => (
    <Combobox items={states}>
      <ComboboxInput placeholder="Select a state" className="w-64" />
      <ComboboxContent>
        <ComboboxEmpty>No states found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const WithClear: Story = {
  render: () => (
    <Combobox items={states} defaultValue="Texas">
      <ComboboxInput placeholder="Select a state" showClear className="w-64" />
      <ComboboxContent>
        <ComboboxEmpty>No states found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Combobox items={timezones}>
      <ComboboxInput placeholder="Select timezone" className="w-64" />
      <ComboboxContent>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof timezones)[number], index: number) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              {index < timezones.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const Multiple: Story = {
  render: () => {
    const anchor = useComboboxAnchor()
    return (
      <Combobox multiple items={states} defaultValue={["California", "Texas"]}>
        <ComboboxChips ref={anchor} className="w-80">
          <ComboboxValue>
            {(values: string[]) => (
              <React.Fragment>
                {values.map((value) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder="Add state" />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No states found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const WithTrigger: Story = {
  render: () => (
    <Combobox items={states} defaultValue="Florida">
      <ComboboxTrigger render={<Button variant="outline" className="w-64 justify-between font-normal" />}>
        <ComboboxValue />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search states" showTrigger={false} />
        <ComboboxEmpty>No states found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Combobox items={states}>
      <ComboboxInput placeholder="Select a state" disabled className="w-64" />
      <ComboboxContent>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}
