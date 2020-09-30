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
}