import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'

export const routeRecipes = {
  ROUTE_RECIPES_CREATE: `${mainRoute.ADMIN_RECIPES}/create`,
  ROUTE_RECIPES_EDIT: `${mainRoute.ADMIN_RECIPES}/edit`
}

export const resourceRecipes = {
  MENU_MANAGEMENT_RECIPES: 'MENU_MANAGEMENT_RECIPES'
}

export const navRecipes = [
  {
    name: null,
    key: 'recipes-create',
    resource: resourceRecipes.MENU_MANAGEMENT_RECIPES,
    path: routeRecipes.ROUTE_RECIPES_CREATE,
    component: LoadableRoute(() =>
      import('../../views/Recipe/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'recipes-edit',
    resource: resourceRecipes.MENU_MANAGEMENT_RECIPES,
    path: `${routeRecipes.ROUTE_RECIPES_EDIT}/:id`,
    component: LoadableRoute(() =>
      import('../../views/Recipe/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'recipes',
    resource: resourceRecipes.MENU_MANAGEMENT_RECIPES,
    path: mainRoute.ADMIN_RECIPES,
    component: LoadableRoute(() =>
      import('../../views/Recipe')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  }
]

export default navRecipes