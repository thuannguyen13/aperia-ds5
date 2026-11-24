# Files and Images

File and image pickers let people attach files in a drop zone and change a logo or photo beside its preview.

## When to use

Choose the part by what the file is for:

| Need | Use |
|---|---|
| The app reads the file itself, such as an import ("CSV or XLSX, up to 5,000 rows.") | Drop zone |
| Attachments are saved with a record | Files on a form |
| A logo, a cover, or the header or footer of an email | Image picker |

## What is available

Files and images use four parts:

| Part | What it shows |
|---|---|
| Drop zone | A box that takes a dropped file, or opens a file chooser when selected. What it accepts shows underneath, such as "PDF or XLSX, up to 4 MB each." |
| Files on a form | The files, listed above the drop zone. Each file downloads when selected. Its delete button removes it. |
| Image picker | The image's preview beside Upload and, once an image is set, Remove. The buttons name the image, such as "Upload Logo" and "Remove Logo". |
| Preview | A logo shows as the record's square picture. A wide picture, such as an email header, shows small, `h-12` high. A picture icon holds its place until one is set. |

## How it looks and behaves

Files on a form and the image picker each handle a picked file in their own order.

A file on a form goes through these steps:

1. An empty file, a file over the size limit, or a file past the number allowed is refused before it uploads.
2. Each other file uploads as soon as it is picked. Files upload one at a time, with a spinner while each one uploads.
3. While any file is uploading, the form cannot be saved.
4. A refused file stays in the list in the destructive color, with its reason, such as "Q3 report.pdf is over 4 MB.",
   "notes.txt is empty.", or "scan.pdf could not be uploaded."
5. Once the list is full, the drop zone gives way to a line such as "Up to 5 files."

Sizes read with their unit, such as "812 KB" and "3.2 MB".

An image picker resizes a picked image for its use, such as a logo, a cover, or an email header. The image is saved
with the form's other fields. An image that cannot be read shows a message under the buttons. The message names the types
the picker takes.

In a read-only form, files show as downloads only, and an empty list reads "No attachments". A read-only image shows
its preview only.

On a phone, a tap on the drop zone opens the phone's own file chooser, so people pick a file without dragging it.
See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

## Rules

### Say what the drop zone accepts

- **Do:** Say under the zone what it accepts ("PDF or XLSX, up to 4 MB each."), so people pick the right file the first
  time.
- **Don't:** Write a bare "Drop files here". State the types and size, so no one finds the limits by failing.

### Keep a refused file in the list, with its reason

- **Do:** Keep a refused file in the list, in the destructive color, with its reason ("Q3 report.pdf is over 4 MB."), so
  people know what to fix.
- **Don't:** Show a toast saying the upload failed while the file vanishes. Keep the file and its reason, so people can
  act on it.

### Name the image on its buttons

- **Do:** Put "Upload Logo" and "Remove Logo" beside the logo's preview, so people see what is set and what the buttons
  change.
- **Don't:** Label it "Choose File", or offer an upload button with no preview. Name the image and show it, so people
  know what they are replacing.

### Use the shared drop zone everywhere

- **Do:** Use the shared drop zone, which takes a dropped file or a selection, so uploading works the same everywhere.
- **Don't:** Draw a drop zone by hand, or use a plain file button in one place and a drop zone in another. Use the
  shared one, so people learn it once.

## When you can do it differently

A form with little height shows its files as small chips side by side instead of a list.

## Works with

Files and images work with three other patterns:

- See [Forms in Sheets](forms-in-sheets.md) for the form that files and images are saved with.
- See [People and Pictures](people-and-pictures.md) for the record's square picture that shows a logo.
- See [Disabled With a Reason](../foundations/disabled-with-a-reason.md) for the line under a drop zone or picker that
  cannot take a file.

## In code

- `FileDrop` from `aperia-ds5` when the app reads the file itself: `hint` (what it accepts), `multiple`, `disabled`
  with `reason`.
- `FilePicker` for files on a form: `id`, `label`, `files`, `onChange` (gets a function of the files), `max`,
  `maxSize`, `accept`, `hint`, `upload` (returns the stored file or the refusal), `href` (where a stored file
  downloads), `onRemove`, `readOnly`, `none`, `inline` for chips. Hold the save while `isUploading(files)`; send
  `storedIds(files)`; delete `stagedIds(files)` when the form closes unsaved.
- Write sizes with `fileSize`; refusals with `fileRefusal`, so the server says the same words.
- `ImagePicker` (`noun` names the buttons, `preview` is an `Avatar` for a logo or `ImagePreview` for a wide picture,
  `uploaded` shows Remove, `format` from `IMAGE_FORMATS.logo`, `.cover` or `.email`). It hands `onChange` a resized
  data URL, or null on Remove.
