/**
 * A `content-collections` mock from test data: the list collections plus their page collections
 * (the same documents, as the real build has them), so a test only lists its projects and posts.
 */
export function contentModule({
  allProjects = [],
  allPosts = [],
}: {
  allProjects?: Array<Record<string, unknown>>
  allPosts?: Array<Record<string, unknown>>
}) {
  return { allProjects, allProjectPages: allProjects, allPosts, allPostPages: allPosts }
}
