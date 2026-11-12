// URL path for each page id used by the sidebar and onNavigate().
export const PAGE_PATHS = {
  dashboard: '/',
  projects: '/projects',
  experience: '/experience',
  leetcode: '/leetcode',
  about: '/about',
  contact: '/contact',
}

const SITE_NAME = 'Aditya Gupta'

export const PAGE_TITLES = {
  dashboard: `${SITE_NAME} · Full-Stack Developer`,
  projects: `Projects · ${SITE_NAME}`,
  experience: `Experience · ${SITE_NAME}`,
  leetcode: `LeetCode · ${SITE_NAME}`,
  about: `About · ${SITE_NAME}`,
  contact: `Contact · ${SITE_NAME}`,
}

// "/projects", "/projects/" and "/PROJECTS" all map to "projects"; anything unknown is the dashboard.
export function pageFromPath(pathname) {
  const clean = '/' + pathname.toLowerCase().replace(/^\/+|\/+$/g, '')
  const match = Object.entries(PAGE_PATHS).find(([, path]) => path === clean)
  return match ? match[0] : 'dashboard'
}
