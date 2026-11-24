# Overview

Aperia's design language is the shared set of foundations, patterns, components, and examples that every Aperia screen
is built from.

## Who it is for

These pages are written for anyone who shapes an Aperia screen, including designers, product owners, product managers,
QA, and developers. Coding agents read the same pages before they build a screen.

## What is here

The pages are grouped in six sections:

| Section | What it covers | Pages |
|---|---|---|
| Get Started | How designers and developers start | [For Designers](get-started/for-designers.md) and [For Developers](get-started/for-developers.md) |
| Foundations | The rules across every screen, grouped as Layout, Content Design, and States | Such as [Accessibility](foundations/accessibility.md), [Page Layout](foundations/page-layout.md), [Copy](foundations/copy.md), and [Loading](foundations/loading.md) |
| Styles | The visual values that every component uses | [Color](styles/color.md), [Typography](styles/typography.md), [Border and Radius](styles/border-and-radius.md), [Elevation](styles/elevation.md), [Motion](styles/motion.md), and [Icons](styles/icons.md) |
| Components | Each building block's home, grouped by what people do with it, with its guidance, live examples, and props. A pattern's components are on that pattern's page. | Such as [Button](components/button.md), [Card](components/card.md), and [Dialog](components/dialog.md) |
| Patterns | How components combine into the parts of a screen, grouped as Navigation, Content, Lists, and Editing | Such as [App Shell](patterns/app-shell.md), [Filters](patterns/filters.md), and [Forms in Sheets](patterns/forms-in-sheets.md) |
| Examples | Whole screens built from the patterns, each with a before and after | Such as [List Page](examples/list-page.md), [Record Page](examples/record-page.md), and [Board of Cards](examples/board.md) |

Each section opens on an index of its pages, each with its one-sentence lead.

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

In Storybook, a page shows its sections in three tabs. Overview holds When to use and What is available, and on an
Examples page the screen itself. Guidelines holds every other section up to In code. Code holds In code, and on a
component's or a pattern's page also the live examples and props of its components.

## One source of truth

Each value and each rule is defined in one place:

- Values such as colors, corners, shadows, and timings are set once in the library. Storybook shows these values live
  from the library.
- Each rule is written on one page. Storybook shows that page, and coding agents read the same page.
- The Figma library, Aperia Shadcn Library (Enhanced), has the same components, linked to the code.

## What an app can change

An app sets its own logo and product name, status colors, and chart colors. Everything else is the same in every app.
That includes the sidebar color, unless the design system team agrees to a change. See [Color](styles/color.md)
for the details.

## Proposing a change

Raise a change as an issue in the [aperia-ds5 repository](https://github.com/thuannguyen13/aperia-ds5/issues), the
shared library, not in one app, so every app gets the fix. A good request names the page and the rule, gives a Do and
a Don't, and states any exception with its condition.
