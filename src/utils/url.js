import { routes } from '../routes'
import { enumType } from '../constants'
import { startCase } from 'lodash'

// PRODUCT
export const getUrlProductById = (id) => {
  if (!id) return routes.ADMIN_DASHBOARD
  return `${routes.ROUTE_PRODUCT_EDIT}/${id}`
}

export const getUrlProduct = (product) => {
  if (!product) return routes.ADMIN_DASHBOARD
  return getUrlProductById(product._id)
}

// Banner
export const getUrlBannerById = (id) => {
  if (!id)
    return routes.ADMIN_DASHBOARD
  return `${routes.ROUTE_BANNER_EDIT}/${id}`
}

export const getUrlBanner = (banner) => {
  if (!banner)
    return routes.ADMIN_DASHBOARD
  return getUrlBannerById(banner._id)
}

// PAGE
export const getUrlEditPage = (pageId, subMenu) => subMenu
  ? `${routes.ROUTE_MANAGE_PAGES_EDIT}/${pageId}/${subMenu}`
  : `${routes.ROUTE_MANAGE_PAGES_EDIT}/${pageId}`

export const getUrlCreateUser = () => routes.ROUTE_USER_CREATE

export const getUrlUserList = () => routes.ADMIN_USERS

export const getUrlManagePageList = () => routes.ADMIN_MANAGE_PAGES

export const getPageEditTabs = (customizeTabs) => {
  let pageTabs = Object.keys(enumType.pageEditTab).map(tab => ({
    value: enumType.pageEditTab[tab],
    title: startCase(tab)
  }))
  if (customizeTabs && customizeTabs.length > 0) {
    customizeTabs.map(item => pageTabs.push({
      value: item,
      title: startCase(item)
    }))
  }
  return pageTabs
}

export default {
  getUrlProduct,
  getUrlProductById,
  getUrlCreateUser,
  getUrlBanner,
  getUrlBannerById,
  getUrlUserList,
  getUrlEditPage,
  getUrlManagePageList,
  getPageEditTabs
}