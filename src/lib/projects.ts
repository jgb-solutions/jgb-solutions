import { allProjects } from 'content-collections'

/** Projects shown on the site: drafts (unfinished write-ups) are left out everywhere, sitemap included. */
export const publishedProjects = allProjects.filter(project => !project.draft)
