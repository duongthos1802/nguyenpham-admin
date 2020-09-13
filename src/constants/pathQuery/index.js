import pathAuth from './pathAuth'
import pathSelect from './pathSelect'

export default {
  ...pathAuth,

  ...pathSelect,
  
  ORDER_QUERY: `orderQuery`,

  ORDER_AFFILIATE_CODE_QUERY: `orderAffiliateCodeQuery`,

  PRODUCT_QUERY: `productQuery`,

  BULK_PRODUCT_QUERY: `bulkProductQuery`,

  SUPPORT_QUERY: 'supportQuery',

  DASHBOARD_QUERY: 'dashboardQuery',

  USERS_QUERY: 'usersQuery',

  PROMO_CODE_QUERY: 'promoCodesQuery',

  GROUP_BANNERS_QUERY: 'groupBannersQuery',

  BANNERS_QUERY: 'bannersQuery',

  CATEGORY_QUERY: 'categoryQuery',

  MEMBERSHIP_QUERY: 'membershipQuery',

  LOCATION_QUERY: 'locationQuery',

  NOTIFICATION_QUERY: 'notificationQuery',

  FEEDBACK_QUERY: 'feedbackQuery',

  ADMIN_NOTIFICATION_QUERY: 'adminNotificationQuery',

  PING_QUERY: 'pingQuery',

  HTML_BLOCK_QUERY: 'htmlBlockQuery',

  MEDIA_QUERY: 'mediaQuery',

  MANAGE_PAGES_QUERY: 'managePagesQuery',

  FAQ_QUERY: 'faqQuery',

  MEMBERSHIP_PLAN_QUERY: 'membershipPlanQuery',

  RESOURCE_QUERY: 'resourceQuery',

  ROLE_QUERY: 'roleQuery',

  USER_ROLE_QUERY: 'userRoleQuery'

}