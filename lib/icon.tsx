import { cloneElement, isValidElement } from "react"
import type { ComponentType, ReactElement } from "react"

type IconProps = { className?: string; "data-icon"?: string }

/**
 * An icon a component draws: the icon itself (`icon={InboxIcon}`) or an element (`icon={<InboxIcon />}`). The library's
 * components are client components, and a React Server Component can pass them an element but not a component, so a
 * server page writes the element.
 */
export type IconProp = ComponentType<IconProps> | ReactElement<IconProps>

/** Draws an icon given as a component or an element, with `props` added to either. */
export function renderIcon(icon: IconProp, props?: IconProps) {
  if (isValidElement<IconProps>(icon))
    return props ? cloneElement(icon, props) : icon
  const Icon = icon
  return <Icon {...props} />
}
