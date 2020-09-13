import React, { Fragment, useState, useEffect } from 'react'
// lib
import { useSelector } from 'react-redux'
import { BackTop, Layout as AntLayout } from 'antd'
import { Spinner } from 'react-redux-spinner'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { ContainerQuery } from 'react-container-query'
import classNames from 'classnames'

// routes
import {
  query
} from '../constants'
// component
import { Menu, TopBar } from '../components/Layout'
import AdminRoute from './AdminRoutes'
import Breadcrumb from "../components/Layout/TopBar/Breadcrumb";

const AntContent = AntLayout.Content
const AntHeader = AntLayout.Header

let isMobile
enquireScreen(b => {
  isMobile = b
})

const AdminArea = (props) => {
  const [menuMobileOpened, setMenuMobileOpened] = useState(false)
  const [menuCollapsed, setMenuCollapsed] = useState(false)
  const [themeLight, setThemeLight] = useState(true)
  const [settingsOpened, setSettingsOpened] = useState(false)
  const [mobileScreen, setMobileScreen] = useState(props.isMobile)

  const state = useSelector((state) => ({
    auth: state.auth
  }))

  useEffect(
    () => {
      enquireScreen(mobile => setMobileScreen(mobile))
    },
    []
  )

  useEffect(
    () => {
      return () => {
        unenquireScreen(enquireScreen(mobile => setMobileScreen(mobile)))
      }
    },
    []
  )

  useEffect(
    () => {
      if (isMobile) {
        setMenuMobileOpened(false)
        setMenuCollapsed(true)
      }
    },
    [props.location]
  )

  const handleToggleMenuMobileOpen = () => {
    setMenuMobileOpened(!menuMobileOpened)
  }

  const handleMenuMobileOpen = () => {
    setMenuMobileOpened(false)
  }

  const handleToggleSettingOpened = () => {
    setSettingsOpened(!settingsOpened)
  }

  const handleMenuCollapseMobile = () => {
    setMenuCollapsed(false)
  }

  const handleToggleMenuCollapse = () => {
    setMenuCollapsed(!menuCollapsed)
  }

  const { history, location } = props
  const isMobile = !!mobileScreen
  const pathname = location.pathname
  const auth = state.auth
  const isAuthorization = !!(auth && auth.user)

  return (
    <Fragment>
      <ContainerQuery query={query}>
        {params => (
          <div className={classNames(params)}>
            <AntLayout
              className={classNames({
                settings__borderLess: true,
                settings__squaredBorders: false,
                settings__fixedWidth: false,
                settings__menuShadow: true,
                settings__menuTop: false,
              })}
            >
              <Spinner />
              <BackTop />
              {isAuthorization
                ? (
                  <Menu
                    themeLight={themeLight}
                    isMobile={isMobile}
                    auth={auth}
                    pathname={pathname}
                    menuMobileOpened={menuMobileOpened}
                    menuCollapsed={menuCollapsed}
                    handleToggleMenuMobileOpen={handleToggleMenuMobileOpen}
                    handleMenuMobileOpen={handleMenuMobileOpen}
                    handleToggleSettingOpened={handleToggleSettingOpened}
                    handleMenuCollapseMobile={handleMenuCollapseMobile}
                    handleToggleMenuCollapse={handleToggleMenuCollapse}
                  />
                ) : null}
              <AntLayout>
                {isAuthorization && (
                  <AntHeader>
                    <TopBar
                      {...props}
                      auth={auth}
                      history={history}
                      isMobile={isMobile}
                    />
                  </AntHeader>
                )}
                <AntContent style={{ height: '100%', position: 'relative' }}>
                  {isAuthorization ? (
                    <Breadcrumb
                      {...props}
                      auth={auth}
                      history={history}
                      isMobile={isMobile}
                    />
                  ) : null}
                  <div className={classNames({ 'utils__content': isAuthorization })}>
                    <AdminRoute
                      {...props}
                      auth={auth}
                      isMobile={isMobile}
                    />
                    <div id={'pluginEditor'} />
                  </div>
                </AntContent>
              </AntLayout>
            </AntLayout>
          </div>
        )}
      </ContainerQuery>
    </Fragment>
  )
}

export default AdminArea
