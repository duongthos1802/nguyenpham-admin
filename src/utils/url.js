import { routes } from '../routes'
import { enumType } from '../constants'
import { startCase } from 'lodash'
import { stringHelper } from '../extensions'

// ORDER
export const getUrlOrderById = (id) => {
  if (!id) return routes.ADMIN_DASHBOARD
  return `${routes.ROUTE_ORDER_EDIT}/${id}`
}

export const getUrlOrder = (order) => {
  if (!order) return routes.ADMIN_DASHBOARD
  return getUrlOrderById(order._id)
}

export const getUrlEditOrder = (orderId) => `${routes.ROUTE_ORDER_EDIT}/${orderId}`

// PRODUCT
export const getUrlProductById = (id) => {
  if (!id) return routes.ADMIN_DASHBOARD
  return `${routes.ROUTE_PRODUCT_EDIT}/${id}`
}

export const getUrlProduct = (product) => {
  if (!product) return routes.ADMIN_DASHBOARD
  return getUrlProductById(product._id)
}

// Promo code
export const getUrlPromoCodeById = (id) => {
  if (!id)
    return routes.ADMIN_DASHBOARD
  return `${routes.ROUTE_PROMO_CODE_EDIT}/${id}`
}

export const getUrlPromoCode = (promoCode) => {
  if (!promoCode)
    return routes.ADMIN_DASHBOARD
  return getUrlPromoCodeById(promoCode._id)
}

export const getUrlEditPromoCode = (promoCodeId) => `${routes.ROUTE_PROMO_CODE_EDIT}/${promoCodeId}`

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

// Feedback
export const getUrlFeedbackById = (id) => {
  if (!id)
    return routes.ADMIN_DASHBOARD
  return `${routes.ROUTE_FEEDBACK_EDIT}/${id}`
}

export const getUrlFeedback = (feedback) => {
  if (!feedback)
    return routes.ADMIN_DASHBOARD
  return getUrlFeedbackById(feedback._id)
}

// Notification
export const getUrlNotificationById = (id) => {
  if (!id)
    return routes.ADMIN_DASHBOARD
  return `${routes.ROUTE_NOTIFICATION_EDIT}/${id}`
}

export const getUrlNotification = (notification) => {
  if (!notification)
    return routes.ADMIN_DASHBOARD
  return getUrlNotificationById(notification._id)
}

// USER
export const getUrlEditUser = (userId, subMenu) => subMenu
  ? `${routes.ROUTE_USER_EDIT}/${userId}/${subMenu}`
  : `${routes.ROUTE_USER_EDIT}/${userId}`

// USER PROFILE FE
export const getUrlUserProfile = (userName, userId) => {
  if (!userName && !userId) return ''
  const stringSlug = `${userName} ${userId}`
  return `${process.env.REACT_APP_FRONT_END_URL}/profile/${stringHelper.generateSlug(
    stringSlug)}`
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
  getUrlOrder,
  getUrlOrderById,
  getUrlEditOrder,
  getUrlProduct,
  getUrlProductById,
  getUrlPromoCodeById,
  getUrlPromoCode,
  getUrlEditPromoCode,
  getUrlEditUser,
  getUrlCreateUser,
  getUrlBanner,
  getUrlBannerById,
  getUrlFeedback,
  getUrlFeedbackById,
  getUrlUserList,
  getUrlNotificationById,
  getUrlNotification,
  getUrlEditPage,
  getUrlManagePageList,
  getPageEditTabs,
  getUrlUserProfile
}