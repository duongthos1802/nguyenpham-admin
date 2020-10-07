import { LoadableRoute } from '../../components'
import mainRoute from './mainRoute'
import { enumType } from '../../constants'

export const routeBlogs = {
  ROUTE_BLOGS_CREATE: `${mainRoute.ADMIN_BLOG}/create`,
  ROUTE_BLOGS_EDIT: `${mainRoute.ADMIN_BLOG}/edit`
}

export const resourceBlogs = {
  MENU_BLOGS: 'MENU_BLOGS'
}

export const navBlogs = [
  {
    name: null,
    key: 'blogs-create',
    resource: resourceBlogs.MENU_BLOGS,
    path: routeBlogs.ROUTE_BLOGS_CREATE,
    component: LoadableRoute(() =>
      import('../../views/Blog/create')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'blogs-edit',
    resource: resourceBlogs.MENU_BLOGS,
    path: `${routeBlogs.ROUTE_BLOGS_EDIT}/:id`,
    component: LoadableRoute(() =>
      import('../../views/Blog/edit')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  },
  {
    name: null,
    key: 'blogs',
    resource: resourceBlogs.MENU_BLOGS,
    path: mainRoute.ADMIN_BLOG,
    component: LoadableRoute(() =>
      import('../../views/Blog')
    ),
    actionType: enumType.action.Write,
    isMenu: false,
    isProtected: true
  }
]

export default navBlogs