import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'
import { routes } from '..'


//group banner
export const routeBannerGroup = {
  ROUTE_BANNER_GROUP_CREATE: `${mainRoute.ADMIN_BANNER_GROUP}/create`,
  ROUTE_BANNER_GROUP_EDIT: `${mainRoute.ADMIN_BANNER_GROUP}/edit`
}

export const resourceBannerGroup = {
  MENU_MANAGEMENT_BANNER_GROUP: 'MENU_MANAGEMENT_BANNER_GROUP'
}

//banner
export const routeBanner = {
    ROUTE_BANNER_CREATE: `${mainRoute.ADMIN_BANNERS}/create`,
    ROUTE_BANNER_EDIT: `${mainRoute.ADMIN_BANNERS}/edit`
}
  
export const resourceBanner = {
    MENU_MANAGEMENT_BANNER: 'MENU_MANAGEMENT_BANNER'
}


export const navBannerGroup = [
    //group banner
  {
    name: null,
    key: 'banner-group-create',
    resource: resourceBannerGroup.MENU_MANAGEMENT_BANNER_GROUP,
    path: routeBannerGroup.ROUTE_BANNER_GROUP_CREATE,
    component: LoadableRoute(() =>
      import('../../views/Banners/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'banner-create',
    resource: resourceBanner.MENU_MANAGEMENT_BANNER,
    path: `${mainRoute.ADMIN_BANNER_GROUP}/:_id/banner/create`,
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
    path: `${mainRoute.ADMIN_BANNER_GROUP}/:_id/banner/:_idBanner`,
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
    path: `${mainRoute.ADMIN_BANNER_GROUP}/:_id/banner`,
    component: LoadableRoute(() =>
      import('../../views/Banners/BannerDetail')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'banner-group-edit',
    resource: resourceBannerGroup.MENU_MANAGEMENT_BANNER_GROUP,
    path: `${routeBannerGroup.ROUTE_BANNER_GROUP_EDIT}/:id`,
    component: LoadableRoute(() =>
      import('../../views/Banners/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'bannerGroup',
    resource: resourceBannerGroup.MENU_MANAGEMENT_BANNER_GROUP,
    path: mainRoute.ADMIN_BANNER_GROUP,
    component: LoadableRoute(() =>
      import('../../views/Banners')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
 
]

export default navBannerGroup