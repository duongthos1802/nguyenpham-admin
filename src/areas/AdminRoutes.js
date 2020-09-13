import React from 'react'
// lib
import { Switch, Route, Redirect } from 'react-router-dom'
import { ProtectedRoute, PageNotFound } from '../components'
import Login from '../views/Authorization/Login'
// routes and nav
import { routes, navAdmin } from '../routes'

const AdminRoute = props => {

  /**
   * generate admin route
   * @param data
   * @param index
   * @returns {null|*}
   */
  const generateAdminRoute = (data, index) => {
    if (!data) {
      return null
    }

    if (data.children && data.children.length > 0) {
      return data.children.map((item, index) => generateAdminRoute(item, index))
    }

    if (!data.component) {
      return null
    }

    if (data.isProtected) {
      return (
        <ProtectedRoute
          {...props}
          exact={data.isExactly}
          key={() => Math.random()}
          path={data.path}
          component={data.component}
          resource={data.resource}
          action={data.actionType}
        />
      )
    }

    return (
      <Route
        {...props}
        key={index}
        path={data.path}
        component={data.component}
        exact={data.isExactly}
      />
    )
  }

  /**
   * generate default page
   * @returns {*}
   */
  const generateDefaultPage = () => {
    const { auth } = props

    if (auth && auth.user) {
      return (
        <Route
          render={() => <PageNotFound/>}
        />
      )
    }
    return <Redirect to={`${routes.AUTHORIZATION}`}/>
  }

  return (
    <Switch>
      {
        navAdmin.map((data, index) => generateAdminRoute(data, index))
      }
      <Route
        path={routes.AUTHORIZATION}
        render={() => <Login {...props}/>}
      />
      {generateDefaultPage()}
    </Switch>
  )
}

export default AdminRoute
