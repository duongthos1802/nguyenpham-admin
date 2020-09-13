import React from 'react'
import { FormattedMessage } from 'react-intl'
import mainRoutes from './mainRoute'
import enumType from '../../constants/enum'
import { LoadableRoute } from '../../components'

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
  }
]

export default navAdmin
