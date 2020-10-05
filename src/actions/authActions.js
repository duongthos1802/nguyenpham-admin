import axiosProvider from './api/axiosProvider'

import query from './queries/auth'

import ActionTypes from './types'
import Notifications from 'react-notification-system-redux'
import { loadFail, redirectPath, startFetchingAction, stopFetchingAction } from './commonAction'
import utils from '../utils'
import { setFormFieldError } from './formActions'
import { routes } from '../routes'
import { setCookieToken } from '../extensions/auth'

const GRAPHQL_PATH = ''

const authActions = {
  loggedIn(data) {
    return (dispatch) => {
      dispatch({
        type: ActionTypes.USER_LOGGED_IN,
        payload: data
      })
    }
  },
  registered() {
    return (dispatch) => {
      dispatch({
        type: ActionTypes.USER_REGISTERED
      })
    }
  },
  authError(msg) {
    return (dispatch) => {
      dispatch({
        type: ActionTypes.USER_AUTH_ERROR,
        data: msg
      })
    }
  },
  logout() {
    return async dispatch => {
      //await axiosProvider.get('auth/backend-logout')
      dispatch({
        type: ActionTypes.USER_LOGGED_OUT
      })
      // removeCookie()
      redirectPath(routes.AUTHORIZATION)
    }
  },



  /**
   * ACTION: CHECK USER SESSION
   * @param session
   * @param token
   * @param pathRedirect
   * @returns {Function}
   */
  checkSession({session, token, pathRedirect, permissions}) {

    return async (dispatch) => {
      dispatch({ type: ActionTypes.USER_LOGGING_IN })
      try {
        const queryData = query.authQuery.checkUserSession(session)

        const result = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null
        })

        if (result.status === 200) {
          if (result.data.data) {
            const resultData = result.data.data.checkUserSession
  
            if (resultData) {
              dispatch(this.loggedIn({ user: resultData, token , permissions}))

              setCookieToken(token)

              if (pathRedirect) {
                dispatch(redirectPath(pathRedirect))
              }
            }
          } else {
            dispatch(this.logout())
          }
        }
      } catch (error) {
        dispatch(
          Notifications.error({
            title: 'Login fail',
            message: error.toString()
          })
        )
      }
    }
  },

  /**
   * LOGIN ACTION
   * @param username
   * @param password
   * @param pathRedirect
   * @returns {Function}
   */
  login(username, password, pathRedirect) {
    return async dispatch => {
      dispatch(startFetchingAction())
      try {

        const queryData = query.authQuery.login(username, password)

        const result = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null
        })

        if (result.status === 200 && !result.data.errors) {
          const loginData = result.data.data.loginAdmin
          const permissions = loginData ? loginData.permissions : null
          const userSessionId =
            loginData && loginData.userSession
              ? loginData.userSession._id
              : null
          const token = loginData && loginData.token ? loginData.token : null
          if (userSessionId) {
            // check session
            dispatch(this.checkSession({session: userSessionId, token, pathRedirect, permissions}))

            dispatch(
              Notifications.success({
                title: 'Login',
                message: 'Login successfully'
              })
            )
          }
        } else {
          
          console.log('Notifications', Notifications.error)
          dispatch(
            Notifications.error({
              title: `Error`,
              message: `${result.data.errors[0].message}`
            })
          )

          dispatch(loadFail(result.data.errors[0].message))

          const {
            field,
            message
          } = utils.getErrorCode({
              extensions: {
                code: result.data.errors[0].message
              }
            })

          dispatch(setFormFieldError(field, message))
        }
      } catch (error) {
        dispatch(
          Notifications.error({
            title: `Error`,
            message: `Login error: ${error.toString()}`
          })
        )
      }
      dispatch(stopFetchingAction())
    }
  },

  changePassword(username, oldPass, newPass) {
    return async dispatch => {
      try {
        const queryData = query.authQuery.changePassword(username, oldPass, newPass)
        const response = await axiosProvider.post('', {
          query: `${queryData}`,
          variables: null
        })

        if (response.status === 200 && !response.data.errors) {
          dispatch(
            Notifications.success({
              title: 'Success',
              message: 'Change password success. Please login after 2 second...'
            })
          )
          setTimeout(() => dispatch(this.logout()), 2000)
        } else {
          dispatch(
            Notifications.error({
              title: `Error`,
              message: `${response.data.errors[0].message}`
            })
          )

          dispatch(loadFail(response.data.errors[0]))
          const {
            field,
            message,
            extensionInfo
          } = utils.getErrorCode(response.data.errors[0])
          dispatch(setFormFieldError(field, message, extensionInfo))
        }

      } catch (error) {
        dispatch(
          Notifications.error({
            title: `Error`,
            message: `${error.toString()}`
          })
        )
        dispatch(loadFail(error.response))

        const {
          field,
          message
        } = utils.getErrorCode(error.response)

        dispatch(setFormFieldError(field, message))
      }
    }
  },

  sendVerifyEmail(username) {
    return async dispatch => {
      try {
        const queryData = query.authQuery.sendVerifyEmail(username)
        const response = await axiosProvider.post('', {
          query: `${queryData}`,
          variables: null
        })

        if (response.status === 200 && !response.data.errors) {
          dispatch(
            Notifications.success({
              title: 'Success',
              message: 'Send email to your email address.'
            })
          )
        } else {
          dispatch(
            Notifications.error({
              title: `Error`,
              message: `${response.data.errors[0].message}`
            })
          )

          dispatch(loadFail(response.data.errors[0]))
          const {
            field,
            message,
            extensionInfo
          } = utils.getErrorCode(response.data.errors[0])
          dispatch(setFormFieldError(field, message, extensionInfo))
        }

      } catch (error) {
        dispatch(
          Notifications.error({
            title: `Error`,
            message: `${error.toString()}`
          })
        )
        dispatch(loadFail(error.response))

        const {
          field,
          message
        } = utils.getErrorCode(error.response)

        dispatch(setFormFieldError(field, message))
      }
    }
  }
}

export default authActions
