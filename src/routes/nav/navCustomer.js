import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'

export const routeCustomers = {
  ROUTE_CUSTOMERS_CREATE: `${mainRoute.ADMIN_CUSTOMER}/create`,
  ROUTE_CUSTOMERS_EDIT: `${mainRoute.ADMIN_CUSTOMER}/edit`
}

export const resourceCustomers = {
  MENU_MANAGEMENT_CUSTOMERS: 'MENU_MANAGEMENT_CUSTOMERS'
}

export const navCustomers = [
  {
    name: null,
    key: 'customer-create',
    resource: resourceCustomers.MENU_MANAGEMENT_CUSTOMERS,
    path: routeCustomers.ROUTE_CUSTOMERS_CREATE,
    component: LoadableRoute(() =>
      import('../../views/Customer/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'customers-edit',
    resource: resourceCustomers.MENU_MANAGEMENT_CUSTOMERS,
    path: `${routeCustomers.ROUTE_CUSTOMERS_EDIT}/:id`,
    component: LoadableRoute(() =>
      import('../../views/Customer/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'customers',
    resource: resourceCustomers.MENU_MANAGEMENT_CUSTOMERS,
    path: mainRoute.ADMIN_CUSTOMER,
    component: LoadableRoute(() =>
      import('../../views/Customer')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  }
]

export default navCustomers