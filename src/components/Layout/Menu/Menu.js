import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Menu, Layout } from 'antd'
import { Link } from 'react-router-dom'
import _, { reduce } from 'lodash'
import { Scrollbars } from 'react-custom-scrollbars'
import { navAdmin } from '../../../routes'
import utils from '../../../utils'
import { enumType } from '../../../constants'

const { Sider } = Layout
const SubMenu = Menu.SubMenu
const Divider = Menu.Divider

/**
 * check menu permission
 * @param data
 * @param auth
 * @returns {Array}
 */
const checkMenuPermission = (data, auth) => {

  // 1. check permission in each menu
  let resultData = []
  if (data && data.length > 0) {
    resultData = data.map(item => {
      if (!item.resource || !item.isMenu || item.isDisabled) {
        return null
      }

      if (!item.isProtected) {
        return item
      }
      const enableViewMenu = utils.checkPermission(enumType.action.View,
        item.resource, auth) ||
        utils.checkFieldError(enumType.action.Write, item.resource, auth)

      return enableViewMenu ? item : null
    })
  }
  // 2. remove null item
  resultData = _.compact(resultData)

  // 3. add divider between each menu
  if (resultData.length > 1) {
    let index = 1
    while (index <= resultData.length - 1) {
      resultData.splice(index, 0, {
        divider: false
      })
      index += 2
    }
  }
  return resultData
}

const MenuLeft = (props) => {
  const [pathname, setPathname] = useState(props.pathname)
  const [collapsed, setCollapsed] = useState(false)
  const [theme, setTheme] = useState(props.themeLight ? 'light' : 'dark')
  const [selectedKeys, setSelectedKeys] = useState('')
  const [openKeys, setOpenKeys] = useState([''])

  useEffect(
    () => {
      getActiveMenuItem(props, navAdmin)
    },
    []
  )

  useEffect(
    () => {
      setSelectedKeys('')
      setPathname(props.pathname)
      setTheme(props.theme)
      getActiveMenuItem(props, navAdmin)
    },
    [props.pathname, props.theme]
  )

  useEffect(
    () => {
      setCollapsed(props.menuCollapsed)
    },
    [props.menuCollapsed]
  )

  const handleClick = e => {
    if (props.isMobile) {
      // collapse menu on isMobile state
      props.handleMenuMobileOpen()
    }
    if (e.key === 'settings') {
      // prevent click and toggle settings block on theme settings link
      props.handleToggleSettingOpened()
      return
    }
    // set current selected keys
    setSelectedKeys(e.key)
  }

  const onOpenChange = openKeys => {
    setOpenKeys(openKeys)
  }

  const getPath = (data, id, parents = []) => {
    let items = reduce(
      data,
      (result, entry) => {
        if (result.length) {
          return result
        } else if (entry.path === id && selectedKeys === '') {
          return [entry].concat(parents)
        } else if (entry.key === id && selectedKeys !== '') {
          return [entry].concat(parents)
        } else if (entry.children) {
          let nested = getPath(entry.children, id, [entry].concat(parents))
          return nested ? nested : result
        }
        return result
      },
      []
    )
    return items.length > 0 ? items : false
  }

  const getActiveMenuItem = (props, items) => {
    let { menuCollapsed } = props
    const urlPath = getPath(items, !selectedKeys ? pathname : selectedKeys)
    if (urlPath) {
      let [activeMenuItem, ...path] = urlPath
      if (menuCollapsed) {
        path = ['']
      }

      setSelectedKeys(activeMenuItem ? activeMenuItem.key : selectedKeys)
      setOpenKeys(activeMenuItem ? path.map(entry => entry.key) : [])
    }

    setCollapsed(menuCollapsed)
  }

  const generateMenuPartitions = items => {
    return items.map(menuItem => {
      let children = []
      if (menuItem.children) {
        children = menuItem.children.filter(
          menu => !menu.isDisabled || menu.isDisabled === false)
      }
      children = checkMenuPermission(children, props.auth)
      if (children.length > 0) {
        const subMenuTitle = (
          <span className="menuLeft__title-wrap" key={menuItem.key}>
            <span className="menuLeft__item-title">{menuItem.name}</span>
            {
              menuItem.icon
                ? <span className={menuItem.icon + ' menuLeft__icon'} />
                : null
            }
          </span>
        )

        return (
          <SubMenu title={subMenuTitle} key={menuItem.key}>
            {generateMenuPartitions(children)}
          </SubMenu>
        )
      }
      return generateMenuItem(menuItem)
    })
  }

  const generateMenuItem = item => {
    const { name, path, icon, disabled, key } = item
    if (item.divider) {
      return (
        <Divider key={Math.random()} className="custom-divider" />
      )
    }
    if (item.path) {
      return (
        <Menu.Item key={key} disabled={disabled}>
          <Link
            to={path}
            onClick={
              props.isMobile
                ? () => {
                  props.handleMenuCollapseMobile()
                }
                : undefined
            }
            className="d-flex">
            <span className="menuLeft__item-title">{name}</span>
            {
              icon
                ? <span className={icon + ' menuLeft__icon'} />
                : null
            }
          </Link>
        </Menu.Item>
      )
    }

    if (item.name) {
      return (
        <Menu.Item key={key} disabled={disabled}>
          <span className="menuLeft__item-title">{name}</span>
          {
            icon
              ? <span className={icon + ' menuLeft__icon'} />
              : null
          }
        </Menu.Item>
      )
    }

    return null
  }

  const onCollapse = (value, type) => {
    if (type === 'responsive' && collapsed) {
      return
    }
    props.handleToggleMenuCollapse()
  }

  const { isMobile, auth } = props

  const navMenu = checkMenuPermission(navAdmin, auth)

  const menuItems = generateMenuPartitions(navMenu)
  const paramsMobile = {
    width: 256,
    collapsible: false,
    collapsed: false,
    onCollapse: onCollapse
  }
  const paramsDesktop = {
    width: 256,
    collapsible: true,
    collapsed: collapsed,
    onCollapse: onCollapse,
    breakpoint: 'lg'
  }
  const params = isMobile ? paramsMobile : paramsDesktop

  return (
    <Sider
      {...params}
      className={classNames('menu', {
        'light': props.themeLight
      })}
    >
      <div className="menuLeft__logo">
        <div
          className={classNames({
            'menuLeft__logoContainer': true,
            ' menuLeft__logoContainer--collapsed text-light d-flex justify-content-center align-items-center': params.collapsed
          })}>
          <a onClick={() => props.handleToggleMenuCollapse()}>
            <img
              src={params.collapsed
                ? require('../../../img/icon-log.png')
                : require('../../../img/LogoCQCF.png')}
              alt="Lendor Logo"
              className="logo"
            />
            {/* {
              !params.collapsed
                ? <span className="ml-2 font-size-16 font-weight-bold" style={{ color: "white" }}>Lendor Admin</span>
                : null
            } */}
          </a>
        </div>
      </div>
      <Scrollbars
        autoHide
        style={{
          height: 'calc(100vh - 112px)'
        }}>
        <Menu
          theme={theme}
          onClick={handleClick}
          selectedKeys={[selectedKeys]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          mode="inline"
          className="menuLeft__navigation">
          {menuItems}
        </Menu>
      </Scrollbars>
    </Sider>
  )
}

export default MenuLeft