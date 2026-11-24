# Overview

Aperia's design language is the shared set of foundations, patterns, components, and examples that every Aperia screen
is built from.

## Who it is for

These pages are written for anyone who shapes an Aperia screen, including designers, product owners, product managers,
QA, and developers. Coding agents read the same pages before they build a screen.

## What is here

The pages are grouped in four sections:

| Section | What it covers | Pages |
|---|---|---|
| Foundations | The building blocks of every screen, and the rules for the words on it | [Color](foundations/color.md), [Typography](foundations/typography.md), [Spacing](foundations/spacing.md), [Shape and Edges](foundations/shape-and-edges.md), [Elevation](foundations/elevation.md), [Motion](foundations/motion.md), [Sizes](foundations/sizes.md), [Icons](foundations/icons.md), [Copy](foundations/copy.md), [Message Templates](foundations/copy-templates.md) |
| Patterns | How parts fit together and behave, one page per pattern | From [App Shell](patterns/app-shell.md) and [Page Layout](patterns/page-layout.md) to [Filters](patterns/filters.md), [Forms in Sheets](patterns/forms-in-sheets.md), and [Pickers](patterns/pickers.md) |
| Components | One component in depth | [Button](components/button.md), [Card](components/card.md), [Dialog](components/dialog.md), [Empty State](components/empty-state.md), [Table](components/table.md) |
| Examples | Complete screens built from the patterns, each with a before and after | Such as [List Page](examples/list-page.md), [Record Page](examples/record-page.md), and [Saved Views](examples/saved-views.md) |

## How a page is laid out

A one-sentence lead under the title defines the subject. The sections below it always come in the same order:

| Section | What it answers |
|---|---|
| When to use | The conditions in which the subject applies |
| What is available | The parts or options to choose from, with the names used in Figma |
| How it looks and behaves | What people see and do, on a desktop first and then on a phone |
| Rules | The constraints, each with a Do and a Don't and the reason for both |
| When you can do it differently | The allowed exceptions and the condition for each, or a note that there are none |
| Works with | The related pages |
| In code | Notes for developers and coding agents, which other readers can skip |

Examples pages use a different order:

| Section | What it answers |
|---|---|
| When to use | The conditions in which the screen applies |
| Example sections | The screen itself, one section for each part shown |
| Before and after | The common mistake beside the fixed screen |
| Rules | The constraints, each with a Do and a Don't |
| Which patterns it uses | The pattern pages the screen is built from |
| In code | Notes for developers and coding agents |

## One source of truth

Each value and each rule is defined in one place:

- Values such as colors, corners, shadows, and timings are set once in the library. Storybook shows these values live
  from the library.
- Each rule is written on one page. Storybook shows that page, and coding agents read the same page.
- The Figma library, Aperia Shadcn Library (Enhanced), has the same components, linked to the code.

## What an app can change

An app sets its own logo and product name, status colors, and chart colors. Everything else is the same in every app.
That includes the sidebar color, unless the design system team agrees to a change. See [Color](foundations/color.md)
for the details.

## Proposing a change

Raise a change as an issue in the [aperia-ds5 repository](https://github.com/thuannguyen13/aperia-ds5/issues), the
shared library, not in one app, so every app gets the fix. A good request names the page and the rule, gives a Do and
a Don't, and states any exception with its condition.
