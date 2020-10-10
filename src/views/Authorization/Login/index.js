import React, { useEffect, memo, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { routes } from '../../../routes'
import LoginForm from './Form'
import { CustomSpin } from '../../../components'
import authActions from '../../../actions/authActions'
import { resetFormFieldError } from '../../../actions/formActions'

import '../../../scss/login.scss'

const Login = (props) => {
  const [backgroundEnabled] = useState(false)
  // map state from redux to self
  const state = useSelector((state) => ({
    auth: state.auth,
    isLoading: state.fetching ? state.fetching.isLoading : false,
    formError: state.form || {}
  }))

  const dispatch = useDispatch()

  const resetFormError = useCallback(
    () => dispatch(resetFormFieldError()),
    [dispatch]
  )

  const onLogin = useCallback(
    (username, password, pathRedirect) => dispatch(
      authActions.login(username, password, pathRedirect)),
    [dispatch]
  )

  useEffect(
    () => {
      resetFormError()
      if (state.auth && state.auth.user) {
        props.history.push(routes.ADMIN_DASHBOARD)
      }
    },
    []
  )

  const handleLogin = (values) => {
    const queryClause = queryString.parse(props.history.location.search)
    const pathRedirect = queryClause && queryClause.redirectURL
      ? queryClause.redirectURL
      : routes.ADMIN_DASHBOARD

    onLogin(values.username, values.password, pathRedirect)
  }

  return (
    <CustomSpin
      spinning={state.isLoading}
    >
      <div
        className={
          classNames('layout', {
            'light': backgroundEnabled
          })
        }
        style={{
          backgroundImage:
            'url(https://desktopwalls.net/wp-content/uploads/2014/12/Hipster%20Items%20Minimal%20Flat%20Illustration%20Desktop%20Wallpaper.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='header'>
          <div className='logo'>
            <Link to="/">
              {/* <img src="resources/images/logo.png" */}
              <img src={require('../../../img/chuquancf-04.jpg')}
                alt="Clean UI React Admin Template" />
            </Link>
          </div>
          ›
        </div>
        <div className="content">
          <div className="title login-heading">
            <h1 className="text-uppercase">
              <strong>
                <FormattedMessage
                  id="Login.Header"
                  defaultMessage="LENDOR ADMIN LOGIN" />
              </strong>
            </h1>
          </div>
          <div className="block">
            <div className="row">
              <div className="col-xl-12">
                <div className={'inner'}>
                  <div className={'form'}>
                    <h4 className="text-uppercase">
                      <strong>Please log in</strong>
                    </h4>
                    <br />
                    <LoginForm
                      formError={state.formError}
                      handleSubmit={handleLogin}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`footer text-center`}>
          <p>&copy; 2019 teamo. All rights reserved.</p>
        </div>
      </div>
    </CustomSpin>
  )
}

export default memo(Login)
