import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'

export const routeProduct = {
  ROUTE_PRODUCT_CREATE: `${mainRoute.ADMIN_PRODUCT}/create`,
  ROUTE_PRODUCT_EDIT: `${mainRoute.ADMIN_PRODUCT}/edit`
}

export const resourceProduct = {
  MENU_MANAGEMENT_PRODUCT: 'MENU_MANAGEMENT_PRODUCT'
}

export const navProduct = [
  {
    name: null,
    key: 'product-create',
    resource: resourceProduct.MENU_MANAGEMENT_PRODUCT,
    path: routeProduct.ROUTE_PRODUCT_CREATE,
    component: LoadableRoute(() =>
      import('../../views/Product/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'product-edit',
    resource: resourceProduct.MENU_MANAGEMENT_PRODUCT,
    path: `${routeProduct.ROUTE_PRODUCT_CREATE}/:id`,
    component: LoadableRoute(() =>
      import('../../views/Product/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'products',
    resource: resourceProduct.MENU_MANAGEMENT_PRODUCT,
    path: mainRoute.ADMIN_PRODUCT,
    component: LoadableRoute(() =>
      import('../../views/Product')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  }
]

export default navProduct