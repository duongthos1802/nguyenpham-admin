import React from 'react'
import { FormattedMessage } from 'react-intl'
import mainRoutes from './mainRoute'
import enumType from '../../constants/enum'
import { LoadableRoute } from '../../components'
import { navCategories, resourceCategories } from './navCategories'
import { navProduct, resourceProduct } from './navProduct'
import { navRecipes, resourceRecipes } from './navRecipes'
import { navHtmlBlock, resourceHtmlBlock } from './navHtmlBlock'
import { navBannerGroup, resourceBanner } from './navBannerGroup'
import { navManagePages, resourceManagePages } from './navManagePages'
import { navBlogs, resourceBlogs } from './navBlog'

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
        id='Menu.BannerGroup'
        defaultMessage='Banner Group'
      />
    ),
    path: mainRoutes.ADMIN_BANNER_GROUP,
    isMenu: true,
    isProtected: true,
    icon: 'icmn icmn-images',
    actionType: enumType.action.View,
    resource: resourceBanner.MENU_MANAGEMENT_BANNER,
    key: 'bannerGroup',
    children: navBannerGroup
  },
  {
    name: (
      <FormattedMessage
        id='Menu.Blog'
        defaultMessage='Blog'
      />
    ),
    path: mainRoutes.ADMIN_BLOG,
    isMenu: true,
    isProtected: true,
    icon: 'icmn icmn-images',
    actionType: enumType.action.View,
    resource: resourceBlogs.MENU_MANAGEMENT_BLOGS,
    key: 'blog',
    children: navBlogs
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
    icon: 'icmn icmn-menu',
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
  {
    name: (
      <FormattedMessage
        id='Menu.Recipes'
        defaultMessage='Recipes'
      />
    ),
    path: mainRoutes.ADMIN_RECIPES,
    isMenu: true,
    isProtected: true,
    icon: 'icmn icmn-cart',
    actionType: enumType.action.View,
    resource: resourceRecipes.MENU_MANAGEMENT_RECIPES,
    key: 'recipes',
    children: navRecipes
  },
  {
    name: (
      <FormattedMessage
        id='Menu.HtmlBlock'
        defaultMessage='Html Block'
      />
    ),
    path: mainRoutes.ADMIN_HTML_BLOCK,
    isMenu: true,
    isProtected: true,
    icon: 'icmn icmn-embed2',
    actionType: enumType.action.View,
    resource: resourceHtmlBlock.MENU_HTML_BLOCK_MANAGEMENT,
    key: 'html-block',
    children: navHtmlBlock
  },
  {
    name: (
      <FormattedMessage
        id='Menu.ManagePages'
        defaultMessage='Manage Pages'
      />
    ),
    path: mainRoutes.ADMIN_MANAGE_PAGES,
    isMenu: true,
    isProtected: true,
    icon: 'icmn icmn-stack',
    actionType: enumType.action.View,
    resource: resourceManagePages.MENU_MANAGEMENT_PAGES,
    key: 'manage-pages',
    children: navManagePages
  },
  {
    name: (
      <FormattedMessage
        id='Menu.Supports'
        defaultMessage='Support'
      />
    ),
    path: mainRoutes.ADMIN_SUPPORT,
    isMenu: true,
    isProtected: true,
    icon: 'icmn icmn-stack',
    actionType: enumType.action.View,
    resource: 'MENU_MANAGEMENT_SUPPORT',
    key: 'support',
    component: LoadableRoute(() => import('../../views/support'))
  },
]

export default navAdmin
