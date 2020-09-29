import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'

export const routeHtmlBlock = {
  ROUTE_HTML_BLOCK_CREATE: `${mainRoute.ADMIN_HTML_BLOCK}/create`,
  ROUTE_HTML_BLOCK_EDIT: `${mainRoute.ADMIN_HTML_BLOCK}/edit`
}

export const resourceHtmlBlock = {
  MENU_HTML_BLOCK_MANAGEMENT: 'MENU_HTML_BLOCK_MANAGEMENT'
}

export const navHtmlBlock = [
  {
    name: null,
    key: 'html-block-create',
    resource: resourceHtmlBlock.MENU_HTML_BLOCK_MANAGEMENT,
    path: routeHtmlBlock.ROUTE_HTML_BLOCK_CREATE,
    component: LoadableRoute(() =>
      import('../../views/HtmlBlock/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'html-block-edit',
    resource: resourceHtmlBlock.MENU_HTML_BLOCK_MANAGEMENT,
    path: `${routeHtmlBlock.ROUTE_HTML_BLOCK_EDIT}/:id`,
    component: LoadableRoute(() =>
      import('../../views/HtmlBlock/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'html-block',
    resource: resourceHtmlBlock.MENU_HTML_BLOCK_MANAGEMENT,
    path: mainRoute.ADMIN_HTML_BLOCK,
    component: LoadableRoute(() =>
      import('../../views/HtmlBlock')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  }
]

export default navHtmlBlock