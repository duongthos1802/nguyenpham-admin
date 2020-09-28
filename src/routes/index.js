import mainRoute from './nav/mainRoute'
import { resourceCategories, routeCategories } from './nav/navCategories'
import { resourceProduct, routeProduct } from './nav/navProduct'

export { default as navAdmin } from './nav'
export const resource = {
  ...resourceCategories,
  ...resourceProduct
}

export const routes = {
  ...mainRoute,
  ...routeCategories,
  ...routeProduct

}
