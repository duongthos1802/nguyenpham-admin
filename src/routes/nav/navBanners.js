import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'

export const routeBanner = {
  ROUTE_BANNER_CREATE: `${mainRoute.ADMIN_BANNERS}/create`,
  ROUTE_BANNER_EDIT: `${mainRoute.ADMIN_BANNERS}/edit`
}

export const resourceBanner = {
  MENU_MANAGEMENT_BANNER: 'MENU_MANAGEMENT_BANNER'
}

export const navBanner = [
  {
    name: null,
    key: 'banner-create',
    resource: resourceBanner.MENU_MANAGEMENT_BANNER,
    path: routeBanner.ROUTE_BANNER_CREATE,
    component: LoadableRoute(() =>
      import('../../views/Banners/BannerDetail/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'banner-edit',
    resource: resourceBanner.MENU_MANAGEMENT_BANNER,
    path: `${routeBanner.ROUTE_BANNER_EDIT}/:id`,
    component: LoadableRoute(() =>
      import('../../views/Banners/BannerDetail/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'banner',
    resource: resourceBanner.MENU_MANAGEMENT_BANNER,
    path: mainRoute.ADMIN_BANNERS,
    component: LoadableRoute(() =>
      import('../../views/Banners/BannerDetail')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  }
]

export default navBanner