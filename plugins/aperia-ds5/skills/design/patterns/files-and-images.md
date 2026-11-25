# Files and Images

Files and images let people attach files to a record and set its logo or picture, by dropping or choosing them. See
[People and Pictures](people-and-pictures.md) for how a chosen picture shows.

## Anatomy

Files and images have seven parts. The Remove button, the file with its remove button, and the hint show only
sometimes. The parts are those of a form with an image picker for a logo and files on a form that hold one saved file.

1. **Preview**. It is a picture of the image as it stands. It is a square avatar for a logo, or a small wide picture for
   an image such as an email header.
2. **Upload button**. It is an outline button named for the image, such as "Upload Logo". It opens the file chooser.
3. **Remove button** (optional). It is a ghost button named for the image, such as "Remove Logo". It shows once an image
   is set, and it clears the image.
4. **File** (optional). It is a row for one attached file, with an icon or a thumbnail, the file's name, and its size.
   It downloads when selected.
5. **Remove file button** (optional). It is a trash icon button at the end of a file's row. It takes that file off the
   list.
6. **Drop zone**. It is a box with a dashed outline and an upload icon. It takes a dropped file, or opens the file
   chooser when selected.
7. **Hint** (optional). It is a muted line of text under the drop zone that says what the zone accepts, such as "PDF or
   XLSX, up to 4 MB each."

## What is available

Files and images come in three parts. Choose the one that matches what the file is for.

| Part | Use it when | What it is |
|---|---|---|
| Drop zone | The app reads the file itself, such as an import ("CSV or XLSX, up to 5,000 rows.") | A box that takes a dropped file, or opens a file chooser when selected. |
| Files on a form | Attachments are saved with a record | The list of a record's files, above a drop zone that adds more. |
| Image picker | A logo, a cover, or the header or footer of an email | A preview of the image, beside the buttons that change it. |

## How it looks and behaves

The preview shows the image as it stands. A logo shows as the record's square picture. A wide picture, such as an email
header, shows small, `h-12` high. A picture icon holds the place of a wide picture until one is set.

Files on a form and the image picker each handle a picked file in their own order.

A file on a form goes through these steps:

1. A file is refused before it uploads when it is empty, over the size limit, or past the number allowed. It gets a
   reason, such as "Q3 report.pdf is over 4 MB." or "notes.txt is empty."
2. Each other file uploads as soon as it is picked. Files upload one at a time. Each shows "Uploading" under its name,
   and a spinner in place of its icon unless it is a picture, which shows its thumbnail. A file cannot be taken off
   while it uploads.
3. A file that the server refuses is refused the same way, with its reason, such as "scan.pdf could not be uploaded."
4. Once the list is full, the drop zone gives way to a line such as "Up to 5 files."

Sizes read with their unit, such as "812 KB" and "3.2 MB".

An image picker resizes a picked image for its use, such as a logo, a cover, or an email header. The image is saved
with the form's other fields. See [Forms in Sheets](forms-in-sheets.md) for the form. An image that cannot be read shows
a message under the buttons that names the types the picker takes. See
[Errors and Validation](../foundations/errors-and-validation.md) for the words of an error.

In a read-only form, files show as downloads only, and an empty list reads "No attachments". A read-only image shows
its preview only.

A form with little height shows its files as small chips side by side instead of a list.

A drop zone or an image picker that cannot take a file shows its reason under it, in place of the hint. See
[Disabled With a Reason](../foundations/disabled-with-a-reason.md).

On a phone, a tap on the drop zone opens the phone's own file chooser, so people pick a file without dragging it.
See [Screen Sizes](../foundations/screen-sizes.md) for every part on a phone.

## Rules

### 1. Say what the drop zone accepts

A drop zone states the types and the size it accepts under the zone, so people pick the right file the first time.

- **Do:** Write "CSV or XLSX, up to 5,000 rows." under an import's drop zone.
- **Don't:** Leave only "Drop files here". People then find the limits by failing.

### 2. Keep a refused file in the list, with its reason

A refused file stays in the list in the destructive color, with its reason, so people see which file failed and what to
fix.

- **Do:** Keep "Q3 report.pdf is over 4 MB." beside the file that is too large.
- **Don't:** Show a toast that says an upload failed while the file leaves the list. People cannot tell which file to
  fix.

### 3. Name the image on its buttons

An image picker's buttons name the image, such as "Upload Logo" and "Remove Logo", so people know what the buttons
change.

- **Do:** Name the buttons "Upload Header" and "Upload Footer" when a form has both.
- **Don't:** Leave "Upload Image" on both pickers of one form. People cannot tell the pickers apart.

### 4. Hold the save while a file uploads

A form cannot be saved while any file is uploading, so the record is never saved without a file that is still on its way.

- **Do:** Disable Save until every file has finished uploading.
- **Don't:** Let Save send the form while a file shows "Uploading". The record saves without that file.

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
