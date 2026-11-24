# Copy

Copy rules define the voice, case, punctuation, and formats of all text on screen. See [Message
Templates](copy-templates.md) for the wording of each message.

These rules are built on Aperia's User Interface Style Guide V4.3.

## When to use

Use these rules for any text a person sees. That includes titles, headings, labels, buttons, links, placeholders,
hints, empty states, errors, confirmations, toasts, statuses, and tooltips. It also includes the way dates, times,
amounts, and other values are written.

## What is available

Copy rules come in twelve sets, one per subsection below.

### By element

Each element on screen has its own wording, listed below. Examples such as "Prospects" stand for any app's records.

| Element | Write | Not |
|---|---|---|
| Page title | What the page holds, such as "Prospects" or "Settings", or the task as a verb and its object, such as "Add Prospect" | "Your Prospect Workspace", "Your Command Center", "New Prospect", "Adding a Prospect", "Report Generation" |
| Section heading | A short noun, such as "Recent Activity" | "Stay on Top of Things" |
| Table heading | A short noun, such as "Line Items". Abbreviations, "&", "%", and "/" only when space is short. | "Line items." |
| Button or menu item | A specific verb, usually with its object, such as "Add Member" or "Delete Note" | "Submit" (for a save), "Continue", "Manage", "Proceed", "Get Started", "Take Action", "OK", "New", "Add New" |
| Form button | The title again when it adds, such as "Add Contact" in Add Contact, or "Save Changes" when it edits. It keeps that label while it works. | "Submit", "Saving…" |
| Destructive action | The precise verb, such as Delete, Remove, Revoke, or Archive | "Confirm", "Continue" |
| Link | Where it goes or what it does, such as "View All Activity" | "Click Here", "Read More" |
| Label | The field's name, such as "Stage" or "Reason for Change". An optional field ends with "(Optional)". A required field has no mark. | "Please enter the start date", "Start Date*" |
| Placeholder | An example or a format, such as "name@example.com" | The label again, "Enter your name here", "…" |
| Hint (helper text) | An instruction, only when the field needs it | A repeat of the label |
| Empty state | "No Tasks", plus a line only when it adds whose, which, or what to do | "No tasks yet." under "No Tasks", "No data" |
| Error | What happened and how to fix it, such as "File must be smaller than 10 MB." | "Something went wrong." |
| Validation | What must change, beside the field, such as "Enter a valid email address." or "Pick a stage." | "Invalid input." |
| Toast | The result, such as "Changes saved." or "Note added." | "Great! Your changes have been saved successfully!" |
| Confirmation | "Delete Project?" / "This permanently deletes the project and its files." / Cancel · **Delete Project** | "Are you sure?" / OK |
| Status | The state, such as "Draft", "Active", "In Progress", or "Done" | "Currently Active", "Successfully Completed" |
| Tooltip | Only when the screen needs explaining, such as an icon button's action or why something is disabled | "Click here to edit", a repeat of the label |

### Action words

Each action has one word, listed below.

| Word | Use it for | Not |
|---|---|---|
| Add | A new record of a kind the app has, such as "Add User" or "Add Opportunity" | "New User", "Add New" |
| Create | A title for something custom that does not exist yet, such as a custom report | A new record of an existing kind |
| Edit | Changing a record's fields, in instructions, titles, and actions | Change, update, or modify in actions or instructions (they may appear in titles) |
| Save | Writing data, and nothing more | |
| Submit | Data that is checked, analyzed, or approved before it is final | An ordinary save |
| Change | A change of state, such as "Change to Demo" or "Reason for Change" | Move |
| Move | Physically moving rows or cards | A change of state |
| Copy | Text, a value, or a group of values, such as an address | |
| Clone | A new record with all of another record's data | |
| Search | Finding things | Look up, lookup |
| Log In (the button), Login (its page), Log Out | Signing in and out. An app that signs in through Microsoft writes "Log In with Microsoft" on the button. | Sign In, Sign Out, Log Off, "Login" on a button |
| Custom | Defined by an admin for others, such as a custom role | |
| User-defined | Made by a person for their own later use, such as a saved filter | |
| Opt in / opt-in | The verb / the adjective, as in "Opt in to notifications" and "Opt-in period" | |
| Opt out / opt-out | The same, as in "Opt out of notifications" and "Notification Opt-Out" | |
| 24-hour / 24 hours | The modifier / the length of time, as in "24-hour override period" and "Cancel within 24 hours." | |

### Dates, times, and amounts

Each kind of value has one format, listed below.

| Value | Write | Not |
|---|---|---|
| Date | MM/DD/YYYY, such as 09/22/2026. MM/DD/YY only when space is short. MM/DD when the year does not matter. Month/year without the day. | 9/22/26, Sep 22 |
| Date in words | A four-digit year, such as "January 2020", "January 9, 2020", or "Thursday, January 9, 2020" | "9th Jan" |
| Time | 12-hour, with a space before AM or PM and before the zone, and no parentheses, such as 02:40 PM CST (CDT in summer). With seconds, 02:40:32 PM CST. | 2:40pm, 14:40, (CST) |
| Date and time | Joined by a space, such as 11/03/2026 02:05 PM CST | |
| Range | An en dash with no spaces, such as 01/05/2026–01/09/2026, A–C, 10–20, or January–March. After "from" or "between", use "to". | 01/05/2026 - 01/09/2026 |
| How long ago | "3d ago", with the full date on hover | |
| Money | "$" before the amount, with no space, such as $1,250. A whole amount shows no cents, such as $1,250, and an amount with cents shows two decimals, such as $12.50. An amount under a dollar keeps the zero, such as $0.64. | $1.25K, $1.8M, "1,250 dollars" |
| Negative money | In red, in parentheses, such as ($125.50) | |
| Another negative number | In red, with a minus, such as -12 | |
| Percent | No space, such as 9% | 9 % |
| File size | A space, such as 2 MB | 2MB |
| US phone | (214) 555-0100, always with the area code, kept on one line | 214.555.0100 |
| International phone | E.164. A number an API sends without a country shows as received. | |
| Address (US, Canada) | Line 1 holds the street, or a PO Box for mail only, never both. Lines 2–4 hold a suite, building, or mail stop and sit above the street line. Then City, the two-letter State/Province, ZIP Code (XXXXX or XXXXX-XXXX) or postal code (AXA XAX), and Country in full. On one line, "Suite 600, 14975 Quorum Drive, Dallas, TX 75254". | |
| Missing value | — (an em dash, with no spaces, in gray), which is different from 0 | -, N/A, None, 0, blank |
| Empty optional pick | "No [field]", such as No priority or No assignee | — |
| Count | The plural when it may be one or more, such as "Merchants". A known count matches, such as "1 cardholder found" or "12 cardholders found". | "Merchant(s)" |
| Hidden amount | $XX,XXX | |

### Abbreviations

Abbreviate only when space forces it, usually in table headings or a crowded form. Use only the abbreviations in this
table.

| Word | Write | Never |
|---|---|---|
| a.m., p.m. | AM, PM (time stamps and column headings) | |
| Account | Acct | Act, Acc |
| Address | Addr | |
| Amount | Amt | Amt. |
| Checking account | CHK | |
| Company | Co | Comp, Co. |
| Corporation | Corp | |
| Count | Ct | |
| Credit card | CC | CRD |
| Department | Dept | |
| Merchant(s) | Merch | |
| Number(s) | # | No., Num, #s |
| Percentage | % | |
| Program(s) | Prgm | Prog, Pgm |
| Savings account | Savings Acct | |
| Social Security Number | SSN | |
| Total | Ttl | Tot |
| Transaction(s) | Trans | Trans. |

Never follow an acronym with a word it already holds. Write BIN, PIN, and ATM, not BIN number, PIN number, or ATM
machine.

### Spelling

Use US English everywhere, as in color, gray, behavior, center, organize, canceled, and labeled. Spell the words in
this table as shown.

| Write | Note |
|---|---|
| ad hoc | |
| backend | |
| cannot | |
| checkbox | |
| double-click | The verb |
| drag-and-drop | |
| dropdown | |
| follow up | The verb |
| follow-up | The adjective |
| hover | |
| log in | The verb |
| login | The noun |
| OK | Only on an OK button. Otherwise write okay. |
| popover | |
| pop-up | |
| read-only | |
| right-click | The verb |
| scrollbar | |
| standalone | |
| submenu | |
| system-defined | Not pre-defined |
| textbox | |
| tooltip | |
| ZIP Code | |

Write company and product names exactly as their owner writes them, including spacing and characters. Never
abbreviate them without approval.

Join "Sub" to its word, as in Subtotal and Subsection.

### Voice

Screen text speaks in one plain voice. The voice follows these rules:

- Use plain, concrete words. Pick familiar words for the actual object, action, or state, and choose clarity over
  cleverness.
- Say only what people need to act. Never say where data is saved, what it counts toward, what the system does next,
  or why a rule exists, unless people must act on it. Cut any sentence people would not miss.
- Write instructions to the person, in the active voice, in the imperative or present tense. Write "Search by name or
  phone number.", not "Search can be by name or phone number." Labels have no person, voice, or tense.
- Write a finished action in the past tense, without "has been", as in "Credit line increased."
- Write out every contraction in screen text, as in "cannot", "is not", and "You are".
- Leave out "please" and "thank you", because they make the action sound optional.
- Use no exclamation marks and no capitals for emphasis.
- Never call the app "I", "me", or "we". Write "The application will be available soon."
- Never call what someone typed wrong, bad, invalid, or illegal. State the rule or the fix instead.
- Use one name for one thing. Take the app's own words from its glossary, and never use synonyms, such as merchant
  account, merchant record, and merchant profile, for one record. A new word is agreed with the team and added to the
  glossary.
- Leave out marketing and chatbot phrases, such as "Let's get started", "Unlock powerful insights", "Seamlessly
  manage…", "You're all set!", "Great!", and "successfully".

### Case and titles

Titles and names use Title Case, and sentences use sentence case.

- Use Title Case for titles, headings, tabs, table headings, labels, and buttons. Title Case capitalizes every word
  except articles, conjunctions, and prepositions. These elements end with no punctuation. They use "and", never "&",
  except in a table heading when space is short.
- Use sentence case for sentences, descriptions, values, toasts, and tooltips.
- Give every page and window a title that says what it is for. A task title is a present-tense verb and its object,
  such as "Add User", "Generate Report", or "Associate Transactions to Case". It is never an "-ing" or noun form, such
  as "Selecting an Option" or "Report Generation". A page for many tasks is named for its content, such as "Account
  Details".

### Punctuation

Each punctuation mark follows the rule in this table.

| Mark | Rule |
|---|---|
| Comma | Always use the serial comma, as in "Visa, MasterCard, and American Express". Use no comma before a name's suffix, as in "John Smith Jr." and "John Smith III". |
| Full stop | A complete sentence ends with one, an imperative included, as in "Answer the following questions." A title or heading never ends with one. |
| Colon | A colon introduces a list or steps, with no space before it. It never ends a heading. A ratio has no spaces, as in 1:3. |
| Exclamation mark | Never use one. Write "Enter the correct password.", not "Password incorrect!" |
| Ampersand (&) | Use it only in table headings to save space, with a space on each side. Never use it in screen text, titles, or headings. Q&A and R&D take no spaces. In a name, write it as its owner does. |
| Slash (/) | Use it for "and", "or", or "per" only where space is short, as in table headings, with no spaces, as in "Over/Under" and "$800/month". Never use it in place of a comma. |
| Hyphen (-) | Use it in compound words (twenty-one, one-third, mid-August), after the prefixes all-, self-, and ex- (former), in a prefix before a proper noun, and in number groups (999-99-9999), with no spaces. Say "hyphen", not "dash". |
| En dash (–) | Use it for a range or a connection, with no spaces, as in A–C, 10–20, and New York–Boston flight. |
| Em dash (—) | Use it for an empty value, as distinct from 0, with no spaces. |
| Ellipsis (…) | Use the one character, not three full stops, and only for cut-off text. Never use it on a button or menu item that opens something, in a placeholder, or in a progress label ("Saving…", "Loading…"). |
| Parentheses and quotation marks | Always use them in pairs, with a space outside and none inside. A full stop goes inside only when it closes a full sentence. Use single quotes only inside double ones. Use ″ and ′ only for inches and feet. |
| Angle brackets | Use them to mark a field in a template, with no inner spaces, as in \<Client_Name\>, never [Client_Name]. |

### Lists, order, and plurals

Lists follow four rules.

- Introduce a list with a heading, a sentence ending in a full stop, or a fragment ending in a colon.
- Start each entry with a capital. End an entry with a full stop only when every entry is a sentence.
- Use bullets for unordered items, in alphabetical order unless another order helps. Use numbers for steps.
- Alphabetize letter by letter, with numerals first in numeric order. In several columns, run from top to bottom, then
  continue in the next column to the right.

### Tables

Text in a table aligns left, and numbers align right, with money aligned on the decimal point. Each heading aligns
over its column.

A column heading gets a tooltip only when it needs explaining. The tooltip describes the column without abbreviations
or symbols, and it never repeats the heading.

### Pointing at the screen

Name a part of the screen by its heading, and add "section" only when needed. Write the heading in initial capitals
even if it shows in all capitals, with the abbreviations the heading uses, as in "the Manage Assignments section".

Never refer to a part of the screen as "below", "page", "window", "modal", "panel", "pane", or "area".

### Links

A link in running text uses the primary color with an underline, and no other text uses that pair. A Link button
uses the primary color and shows its underline only under the pointer. See [Button](../components/button.md) for the
Link button. Contact details on a record's page are the other exception, described under "When you can do it
differently".

## How it looks and behaves

Writing copy follows five steps.

1. Know the element. Learn what it does, who sees it, and what happens after. Read the screen, not only its text.
2. Name things with the app's words. When a concept has no word yet, agree on one with the team and add it to the
   glossary.
3. Pick the pattern. A message uses its template, and an element follows its row under "By element". See [Message
   Templates](copy-templates.md) for the templates.
4. Apply the mechanics, which are punctuation, abbreviations, dates, times, money, phone numbers, and plurals.
5. Compare with similar screens, and reuse their wording when it follows these rules.

A copy change changes words only. It does not change the layout, data, flows, permissions, behavior, or visual design.
Make a copy change only when the new words follow a rule on this page that the old words break.

## Rules

### Name things in Title Case and say things in sentence case

- **Do:** Name things in Title Case and say things in sentence case ("Recent Activity", "Add Member", "No tasks assigned
  to you."), so names stand apart from messages.
- **Don't:** Write "Recent activity" as a heading, or "No Tasks Assigned To You." as a description. Match the case to
  the job, so names and messages do not blur.

### Name the action

- **Do:** Name the action on the button ("Add Member", "Delete Note", "Change to Demo"), so people know what happens
  before they click.
- **Don't:** Label a button "Submit", "OK", "Continue", or "Manage", or end it with an ellipsis. Name the action and its
  object, so no one has to guess.

### Say what happened and what to do

- **Do:** Put the rule or the fix beside its field ("File must be smaller than 10 MB." beside the file field), so people
  fix it where they are.
- **Don't:** Write "Something went wrong.", or tell people they did something wrong. State the rule or the fix, so
  people know what to do next.

### Ask with the action's name

- **Do:** Ask with the action's name ("Delete Project?", a line on what it deletes, then Cancel and "Delete Project"),
  so people know what they agree to.
- **Don't:** Ask "Are you sure?" with OK, or with Yes and No. Name the action in the title and on the button, so no one
  clicks through blind.

### Say only what people need

- **Do:** Keep a message to what people need ("Changes saved."), so it reads at a glance.
- **Don't:** Write "Great! Your changes have been saved and will appear in your weekly report." Cut every word people
  would not miss, so they get back to work.

### Write empty as No [Items]

- **Do:** Write empty as No [Items] ("No Tasks"), adding a second line only when it says what the title cannot, so
  people see at once there is nothing.
- **Don't:** Repeat the title ("No tasks yet." under "No Tasks"), or show a bare "No data". Name the items, so people
  know what is missing.

### Use the same words as the rest of the app

- **Do:** Reuse the wording a similar screen already uses for the same action, state, or message, so people recognize
  it.
- **Don't:** Invent a new word for something the app already names. Check how a similar screen says it, so no one
  wonders if it is a different thing.

### Keep business and legal terms as written

- **Do:** Use business, product, legal, compliance, and technical terms exactly as the business does, and quote legal
  text as written, so people who know them recognize them.
- **Don't:** Swap a term for one that sounds better. Ask when a term is unclear, so the words keep their exact meaning.

### Hide internal labels

- **Do:** Leave out what is not built yet and show demo sample data unmarked, so the screen looks like the real product.
- **Don't:** Show "MVP", "Not in MVP", "Phase 2", "Demo Data", or "Mock" where a user can see it. Remove internal
  labels, so people see only the product.

## Words and phrasings that confuse people

Each phrasing in this table confuses people. The last column gives the wording to use in its place.

| Do not write | Why it confuses | Write instead |
|---|---|---|
| MVP, Not in MVP, Phase, Demo Data, Mock | Internal labels mean nothing to the person using the app | Nothing. Remove them. |
| Manage, Continue, Proceed, Get Started, Take Action | Does not say what will happen | The verb and its object, such as "Add Contact" |
| Submit, for an ordinary save | Suggests it goes on to be checked or approved | "Save", "Save Changes" |
| OK, Yes, No, Confirm on a confirmation | Does not name the action | The action, such as "Delete Note" |
| Are you sure? | Does not say what changes | "Delete Note?" and the consequence |
| Click \<Action\> to continue. | Repeats the button | Nothing |
| New, Add New | Add is the one verb for a new record | "Add Opportunity" |
| Click Here, Read More | Does not say where it goes | "View All Activity" |
| Something went wrong. Invalid input. | Names neither the cause nor the fix | "Enter a valid email address." |
| Wrong, bad, invalid, illegal, unacceptable | Blames the person | The rule, such as "Merchant IDs only include letters and numbers." |
| A table or column name in a message | Not a word people use | The record as people name it, such as "Note" |
| Three names for one thing (merchant account, merchant record, merchant profile) | People think they are different things | One name, from the app's glossary |
| Please, thank you | Makes the action sound optional | "Enter…", "Review…" |
| We, I, me, for the app | The app is not a person | "The application will be available soon." |
| "Let's get started", Unlock, Seamlessly, "You're all set!", Great!, Successfully | Marketing words between people and the result | The result, such as "Changes saved." |
| Has been ("The credit line has been increased.") | Longer than the result | "Credit line increased." |
| Saving…, Loading…, Uploading… | Progress shows in the spinner, not the label | The button's own label, with a spinner |
| Move, for a change of state | Sounds like moving rows or cards | "Change to Demo" |
| Change, update, modify on an action | Edit is the one verb for changing fields | "Edit" |
| Look up, lookup | Search is the one word | "Search" |
| Currently Active, Successfully Completed | Extra words around the state | "Active", "Completed" |
| Below, page, window, modal, panel, pane, area | Does not name the part | The part's heading, such as "the Manage Assignments section" |
| Merchant(s) | The plural already covers one or more | "Merchants" |
| BIN number, PIN number, ATM machine | Repeats the acronym | "BIN", "PIN", "ATM" |
| Sign In, Sign Out, Log Off | Aperia apps use one pair of words for signing in and out | "Log In", "Log Out" |
| -, N/A, None, or 0 for a missing value | 0 is a value. The dash is the one sign for nothing. | "—" in gray |
| Your Prospect Workspace, Stay on Top of Things | A slogan instead of a name | "Prospects", "Recent Activity" |
| Permission or role names, "Ask an admin" in a no-access message | People cannot act on them | "You do not have access to \<action\>." |

## When you can do it differently

These rules allow four exceptions.

- When the app's glossary or its recorded copy decisions name a thing, use the app's own words.
- A screen may depart from these rules only for a business reason the app has recorded. Without one, follow these
  rules, and bring a screen that disagrees back in line.
- An app built as a conversational assistant, a persona that answers in chat, keeps its own voice in the chat. The
  screen text around the chat follows these rules.
- Phone numbers, emails, and websites read as plain text in the body color. On a record's page, they link to call,
  email, or open, and they underline only on hover. See [Table](../components/table.md) for contact details in a
  table.

Send questions these rules do not answer to the VP of Product Innovation and Design.

## Works with

- See [Message Templates](copy-templates.md) for the wording of every message.
- See [Typography](../styles/typography.md) for Title Case and sentence case on screen.
- See [Color](../styles/color.md) for gray in the missing-value dash and hints, and red in negative amounts.

## In code

- Formatters in `aperia-ds5/format`: `formatDate` (09/22/2026), `formatMoment` (with time and zone), `dayRangeLabel`,
  `ago` ("3d ago"), `money`, `HIDDEN_MONEY` ($XX,XXX), `percent`, `plural`, `listed`. Never format a date or amount by
  hand.
- Values: `RelativeTime` ("3d ago" with the date on hover). It reads the clock only in the browser, so it works in a
  server component and in a prerendered page with no `Suspense` around it. Use it, not `ago()`, on a page: `ago()` reads
  the clock when it is called. Build the empty value (—) and "No [field]" text in the app from [Empty and
  Missing](empty-and-missing.md), and the hidden value ($XX,XXX) from [Money and Numbers](money-and-numbers.md).
- The project's own glossary and copy decisions, when it has them: `docs/glossary.md`, `docs/screens.md`, or a
  project-level `ui-copy` skill.
