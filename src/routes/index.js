import mainRoute from './nav/mainRoute'
import { resourceCategories, routeCategories } from './nav/navCategories'

export { default as navAdmin } from './nav'
export const resource = {
  ...resourceCategories,
}

export const routes = {
  ...mainRoute,
  ...routeCategories,

}
