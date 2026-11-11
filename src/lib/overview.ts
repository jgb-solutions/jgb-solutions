/**
 * The first paragraph under "## Project Overview" in a project's write-up (plain text), for
 * product summaries. Falls back to the description when there's no overview. Used when the
 * content is built (content-collections.ts), so pages get the text without the whole write-up.
 */
export function overviewOf(project: { content?: string; description: string }): string {
  const match = project.content?.match(/## Project Overview\s+([\s\S]*?)(?:\n\s*\n|$)/)
  const paragraph = match?.[1].trim()
  return paragraph ? paragraph.replace(/\*\*|__|`/g, '') : project.description
}
