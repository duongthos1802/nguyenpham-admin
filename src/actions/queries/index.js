import upload from './uploadFile'

// AUTHORIZATION
import authorization from './auth'

// DASHBOARD
import dashboardQuery from './dashboard'

// CATEGORY
import categoryQuery from './category'

// PRODUCT
import productQuery from './product'
// RECIPE
import recipeQuery from './recipe'

// HTML BLOCK
import htmlBlockQuery from './htmlBlock'


// BANNERS
import bannersQuery from './banners'

// GROUP BANNERS
import groupBannersQuery from './groupBanner'

// PAGE
import managePagesQuery from './managePages'

// GROUP HTML_BLOCKS
import groupHtmlBlocksQuery from './groupHtmlBlock'

// BLOG
import blogQuery from './blog'

// VIDEO
import videoQuery from './video'

// SELECT
import select from './select'

export default {
  ...select,

  ...authorization,

  dashboardQuery,

  categoryQuery,

  productQuery,

  recipeQuery,

  htmlBlockQuery,

  bannersQuery,

  groupBannersQuery,

  managePagesQuery,

  groupHtmlBlocksQuery,
  
  blogQuery,

  videoQuery
}