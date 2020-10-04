import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'

export const routeManagePages = {
  ROUTE_MANAGE_PAGES_CREATE: `${mainRoute.ADMIN_MANAGE_PAGES}/create`,
  ROUTE_MANAGE_PAGES_EDIT: `${mainRoute.ADMIN_MANAGE_PAGES}/edit`
}

export const resourceManagePages = {
  MENU_MANAGEMENT_PAGES: 'MENU_MANAGEMENT_PAGES'
}

export const navManagePages = [
  {
    name: null,
    key: 'pages-create',
    resource: resourceManagePages.MENU_MANAGEMENT_PAGES,
    path: routeManagePages.ROUTE_MANAGE_PAGES_CREATE,
    component: LoadableRoute(() =>
      import('../../views/ManagePages/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'pages-edit-information',
    resource: resourceManagePages.MENU_MANAGEMENT_PAGES,
    path: `${routeManagePages.ROUTE_MANAGE_PAGES_EDIT}/:id/${enumType.pageEditTab.Information}`,
    component: LoadableRoute(() =>
      import('../../views/ManagePages/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'pages-edit-config-home',
    resource: resourceManagePages.MENU_MANAGEMENT_PAGES,
    path: `${routeManagePages.ROUTE_MANAGE_PAGES_EDIT}/:id/config-home`,
    component: LoadableRoute(() =>
      import('../../views/ManagePages/ConfigHomePage')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'medias',
    resource: resourceManagePages.MENU_MANAGEMENT_PAGES,
    path: mainRoute.ADMIN_MANAGE_PAGES,
    component: LoadableRoute(() =>
      import('../../views/ManagePages')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  }
]

export default navManagePages