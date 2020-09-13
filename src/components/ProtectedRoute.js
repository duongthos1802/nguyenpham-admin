import React from 'react'
// lib
import { Redirect, Route, withRouter } from 'react-router-dom'
// component
import AccessDenied from './AccessDenied'
// routes and utils
import { routes } from '../routes'
import utils from '../utils'

/**
 * check login
 * @param auth
 * @param rest
 * @returns {*}
 */
const checkLogin = ({ auth, ...rest }) => {
  return auth.user ? (
    <Route {...rest} render={() => <AccessDenied />} />
  ) : (
      <Redirect to={`${routes.AUTHORIZATION}?redirectURL=${rest.path}`} />
    )
}

const ProtectedRoute = ({ component: Component, resource, action, auth, config, isMobile, ...rest }) => {
  const permission = auth && auth.user
    ? utils.checkPermission(action, resource, auth)
    : false

  return permission ? (
    <Route
      {...rest}
      render={(matchProps) => (
        <Component
          {...matchProps}
          auth={auth}
          isMobile={isMobile}
        />
      )}
    />
  ) : (
      checkLogin({ auth, ...rest })
    )
}

export default withRouter(ProtectedRoute)
