import mainRoute from './nav/mainRoute'
import { resourceCategories, routeCategories } from './nav/navCategories'
import { resourceProduct, routeProduct } from './nav/navProduct'
import { resourceRecipes, routeRecipes } from './nav/navRecipes'

export { default as navAdmin } from './nav'
export const resource = {
  ...resourceCategories,

  ...resourceProduct,

  ...resourceRecipes,
}

export const routes = {
  ...mainRoute,

  ...routeCategories,

  ...routeProduct,

  ...routeRecipes
}
