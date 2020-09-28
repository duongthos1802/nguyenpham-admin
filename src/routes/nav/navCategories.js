import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'

export const routeCategories = {
  ROUTE_CATEGORIES_CREATE: `${mainRoute.ADMIN_CATEGORIES}/create`,
  ROUTE_CATEGORIES_EDIT: `${mainRoute.ADMIN_CATEGORIES}/edit`
}

export const resourceCategories = {
  MENU_MANAGEMENT_CATEGORIES: 'MENU_MANAGEMENT_CATEGORIES'
}

export const navCategories = [
  {
    name: null,
    key: 'categories-create',
    resource: resourceCategories.MENU_MANAGEMENT_CATEGORIES,
    path: routeCategories.ROUTE_CATEGORIES_CREATE,
    component: LoadableRoute(() =>
      import('../../views/Categories/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'categories-edit',
    resource: resourceCategories.MENU_MANAGEMENT_CATEGORIES,
    path: `${routeCategories.ROUTE_CATEGORIES_EDIT}/:id`,
    component: LoadableRoute(() =>
      import('../../views/Categories/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'categories',
    resource: resourceCategories.MENU_MANAGEMENT_CATEGORIES,
    path: mainRoute.ADMIN_CATEGORIES,
    component: LoadableRoute(() =>
      import('../../views/Categories')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  }
]

export default navCategories