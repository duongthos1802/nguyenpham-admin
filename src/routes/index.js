import mainRoute from './nav/mainRoute'
import { resourceCategories, routeCategories } from './nav/navCategories'
import { resourceRecipes, routeRecipes } from './nav/navRecipes'

export { default as navAdmin } from './nav'
export const resource = {
  ...resourceCategories,
  ...resourceRecipes,
}

export const routes = {
  ...mainRoute,
  ...routeCategories,
  ...routeRecipes
}
