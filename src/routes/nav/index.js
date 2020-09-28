import React from 'react'
import { FormattedMessage } from 'react-intl'
import mainRoutes from './mainRoute'
import enumType from '../../constants/enum'
import { LoadableRoute } from '../../components'
import { navCategories, resourceCategories } from './navCategories'
import { navProduct, resourceProduct } from './navProduct'

export const navAdmin = [
  {
    name: (
      <FormattedMessage
        id='Menu.Dashboard'
        defaultMessage='Dashboard'
      />
    ),
    path: mainRoutes.ADMIN_DASHBOARD,
    isMenu: true,
    isProtected: true,
    icon: 'icmn icmn-home',
    actionType: enumType.action.View,
    resource: 'MENU_MANAGEMENT_DASHBOARD',
    key: 'dashboard',
    component: LoadableRoute(() => import('../../views/Admin/Dashboard'))
  },
  {
    name: null,
    path: '/',
    isMenu: false,
    isProtected: true,
    isExactly: true,
    icon: 'icmn icmn-home',
    actionType: enumType.action.View,
    resource: 'MENU-DASHBOARD',
    key: 'dashboard',
    component: LoadableRoute(() => import('../../views/Admin/Dashboard'))
  },
  {
    name: (
      <FormattedMessage
        id='Menu.Categories'
        defaultMessage='Categories'
      />
    ),
    path: mainRoutes.ADMIN_CATEGORIES,
    isMenu: true,
    isProtected: true,
    icon: 'icmn icmn-list-numbered',
    actionType: enumType.action.View,
    resource: resourceCategories.MENU_MANAGEMENT_CATEGORIES,
    key: 'categories',
    children: navCategories
  },
  {
    name: (
      <FormattedMessage
        id='Menu.Product'
        defaultMessage='Products'
      />
    ),
    path: mainRoutes.ADMIN_PRODUCT,
    isMenu: true,
    isProtected: true,
    icon: 'icmn icmn-list-numbered',
    actionType: enumType.action.View,
    resource: resourceProduct.MENU_MANAGEMENT_PRODUCT,
    key: 'products',
    children: navProduct
  },
]

export default navAdmin
