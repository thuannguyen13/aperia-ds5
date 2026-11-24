// File sizes and refusals in words, the same in the browser and on the server. Pure, no React.

/** A size for people: "812 KB", "3.2 MB". */
export function fileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = Math.ceil(bytes / 1024)
  if (kb < 1024) return `${kb} KB`
  // Rounded up, so a file a byte over a 4 MB limit reads 4.1 MB beside "is over 4 MB", never 4.0 MB.
  return `${(Math.ceil((bytes * 10) / (1024 * 1024)) / 10).toFixed(1)} MB`
}

/** A limit as it is said: "4 MB", "500 KB", whole where it is whole. */
const limitSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${+(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${+(bytes / 1024).toFixed(1)} KB`

/** What a refusal of a file says. A server that checks the same file says the same words. */
export const fileRefusal = {
  unreadable: (name: string) => `${name} could not be read.`,
  empty: (name: string) => `${name} is empty.`,
  tooBig: (name: string, limit: number) =>
    `${name} is over ${limitSize(limit)}.`,
  notUploaded: (name: string) => `${name} could not be uploaded.`,
}
