import mainRoute from './nav/mainRoute'
import { resourceCategories, routeCategories } from './nav/navCategories'
import { resourceProduct, routeProduct } from './nav/navProduct'
import { resourceRecipes, routeRecipes } from './nav/navRecipes'
import { resourceHtmlBlock, routeHtmlBlock } from './nav/navHtmlBlock'
import { resourceBanner, routeBanner } from './nav/navBanners'
import { resourceBannerGroup, routeBannerGroup } from './nav/navBannerGroup'
import { resourceManagePages, routeManagePages } from './nav/navManagePages'
import { resourceBlogs, routeBlogs } from './nav/navBlog'
import { resourceVideos, routeVideos } from './nav/navVideo'

export { default as navAdmin } from './nav'
export const resource = {
  ...resourceCategories,

  ...resourceProduct,

  ...resourceRecipes,

  ...resourceHtmlBlock,

  ...resourceBanner,

  ...resourceBannerGroup,

  ...resourceManagePages,

  ...resourceBlogs,

  ...resourceVideos
}

export const routes = {
  ...mainRoute,

  ...routeCategories,

  ...routeProduct,

  ...routeRecipes,

  ...routeHtmlBlock,

  ...routeBanner,

  ...routeBannerGroup,

  ...routeManagePages,

  ...routeBlogs,

  ...routeVideos
}
