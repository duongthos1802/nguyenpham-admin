import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'

export const routeRecruitment = {
  ROUTE_RECRUITMENT_CREATE: `${mainRoute.ADMIN_RECRUITMENT}/create`,
  ROUTE_RECRUITMENT_EDIT: `${mainRoute.ADMIN_RECRUITMENT}/edit`
}

export const resourceRecruitment = {
  MENU_RECRUITMENT: 'MENU_RECRUITMENT'
}

export const navRecruitment = [
  {
    name: null,
    key: 'recruitment-create',
    resource: resourceRecruitment.MENU_RECRUITMENT,
    path: routeRecruitment.ROUTE_RECRUITMENT_CREATE,
    component: LoadableRoute(() =>
      import('../../views/Recruitment/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'recruitment-edit',
    resource: resourceRecruitment.MENU_RECRUITMENT,
    path: `${routeRecruitment.ROUTE_RECRUITMENT_EDIT}/:id`,
    component: LoadableRoute(() =>
      import('../../views/Recruitment/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'recruitment',
    resource: resourceRecruitment.MENU_RECRUITMENT,
    path: mainRoute.ADMIN_RECRUITMENT,
    component: LoadableRoute(() =>
      import('../../views/Recruitment')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  }
]

export default navRecruitment