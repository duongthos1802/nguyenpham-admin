import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'

export const routeFAQ = {
  ROUTE_FAQ_CREATE: `${mainRoute.ADMIN_FAQ}/create`,
  ROUTE_FAQ_EDIT: `${mainRoute.ADMIN_FAQ}/edit`
}

export const resourceFAQ = {
  MENU_MANAGEMENT_FAQ: 'MENU_MANAGEMENT_FAQ'
}

export const navFAQ = [
  {
    name: null,
    key: 'faq-create',
    resource: resourceFAQ.MENU_MANAGEMENT_FAQ,
    path: routeFAQ.ROUTE_FAQ_CREATE,
    component: LoadableRoute(() =>
      import('../../views/FAQ/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'faq-edit',
    resource: resourceFAQ.MENU_MANAGEMENT_FAQ,
    path: `${routeFAQ.ROUTE_FAQ_EDIT}/:id`,
    component: LoadableRoute(() =>
      import('../../views/FAQ/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'faq',
    resource: resourceFAQ.MENU_MANAGEMENT_FAQ,
    path: mainRoute.ADMIN_FAQ,
    component: LoadableRoute(() =>
      import('../../views/FAQ')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  }
]

export default navFAQ