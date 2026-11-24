# For Designers

Designers work from the Aperia Figma library, whose components and variables match the code in aperia-ds5.

## The Figma library

Every new design uses one library. The older library stays only for the app that still depends on it.

| Library | State | Use |
|---|---|---|
| [Aperia Shadcn Library (Enhanced)](https://www.figma.com/design/uXivJU4N3R0LWu0mbimHWt/Aperia-Shadcn-Library--Enhanced-) | Live | Every new design. It matches aperia-ds5 0.3. |
| Aperia Shadcn Library (original) | Frozen | Nothing new. It matches aperia-ds5 0.2, which one app still runs. |

The library holds the same names as the code. A Figma variable has the name of its token, and a component's properties
are the props of its code component. A color that the code mixes from another token is an alias of that token in Figma,
at the same opacity.

## From design to code

A design reaches code through Dev Mode. Selecting a component in Dev Mode shows its code, with the `aperia-ds5` import
and the props that the instance sets. A developer copies that code instead of rebuilding the component.

A design uses the components and patterns on these pages as they are. A screen that needs something the library does
not have is a proposal for the library, not a one-off in the design. See [Overview](../overview.md) for how to propose
a change.

## Where to start

Read the pages in this order:

1. [Color](../styles/color.md) and [Typography](../styles/typography.md), for the values every screen uses.
2. [Page Layout](../foundations/page-layout.md) and [App Shell](../patterns/app-shell.md), for the frame every page
   sits in.
3. The pattern that matches the screen, such as [List Toolbar](../patterns/list-toolbar.md) or
   [Forms in Sheets](../patterns/forms-in-sheets.md).
4. [Copy](../foundations/copy.md), for the words on the screen.
