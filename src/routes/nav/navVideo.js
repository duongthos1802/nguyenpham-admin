import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'

export const routeVideos = {
  ROUTE_VIDEOS_CREATE: `${mainRoute.ADMIN_VIDEO}/create`,
  ROUTE_VIDEOS_EDIT: `${mainRoute.ADMIN_VIDEO}/edit`
}

export const resourceVideos = {
  MENU_VIDEOS: 'MENU_VIDEOS'
}

export const navVideos = [
  {
    name: null,
    key: 'videos-create',
    resource: resourceVideos.MENU_VIDEOS,
    path: routeVideos.ROUTE_VIDEOS_CREATE,
    component: LoadableRoute(() =>
      import('../../views/Video/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'videos-edit',
    resource: resourceVideos.MENU_VIDEOS,
    path: `${routeVideos.ROUTE_VIDEOS_EDIT}/:id`,
    component: LoadableRoute(() =>
      import('../../views/Video/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'videos',
    resource: resourceVideos.MENU_VIDEOS,
    path: mainRoute.ADMIN_VIDEO,
    component: LoadableRoute(() =>
      import('../../views/Video')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  }
]

export default navVideos