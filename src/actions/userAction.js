// lib
import Notifications from 'react-notification-system-redux'
// axios
import axiosProvider from './api/axiosProvider'
// query
import query from './queries'
// constant
import ActionTypes from './types'
// action
import {
  clearSuccess,
  loadFail,
  loadSuccess,
  startFetchingAction,
  stopFetchingAction,
} from './commonAction'
import {setFormFieldError} from './formActions'
// utils
import utils from '../utils'

const GRAPHQL_PATH = ''

const userActions = {
  updateData({
    clause,
    pathQuery,
    pathRedirect = null,
    enableGoBack = true,
    setOpenModalCreate,
  }) {
    return async (dispatch) => {
      dispatch(startFetchingAction())
      try {
        const queryData = query[pathQuery].updateUser(clause)

        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null,
        })

        if (response.status === 200 && !response.data.errors) {
          setOpenModalCreate(false)
          dispatch(
            loadSuccess({
              actionType: ActionTypes.UPDATE_SUCCESS,
              data: response.data.data,
              pathQuery: pathQuery,
              enableGoBack: enableGoBack,
              pathRedirect: pathRedirect,
            })
          )
        } else {
          dispatch(
            Notifications.error({
              title: `Error`,
              message: `${response.data.errors[0].message}`,
            })
          )

          dispatch(loadFail(response.data.errors[0]))

          const {field, message, extensionInfo} = utils.getErrorCode(
            response.data.errors[0]
          )

          dispatch(setFormFieldError(field, message, extensionInfo))
        }
      } catch (error) {
        dispatch(
          Notifications.error({
            title: `Error`,
            message: `${error.toString()}`,
          })
        )
        dispatch(loadFail(error.response))

        const {field, message} = utils.getErrorCode(error.response)

        dispatch(setFormFieldError(field, message))
      }
      dispatch(stopFetchingAction())
    }
  },
  sendMailUser({pathQuery}) {
    return async (dispatch) => {
      dispatch(startFetchingAction())
      try {
        const queryData = query[pathQuery].sendMailUser()

        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null,
        })

        if (response.status === 200 && !response.data.errors) {
          const resultData = response.data.data.singleSendDynamicMail
          dispatch(
            Notifications.success({
              title: `Success`,
              message: `Sent email success to ${resultData} user`,
            })
          )
        }

      } catch (error) {
        dispatch(
          Notifications.error({
            title: `Error`,
            message: `${error.toString()}`,
          })
        )
        dispatch(loadFail(error.response))

        const {field, message} = utils.getErrorCode(error.response)

        dispatch(setFormFieldError(field, message))
      }

      dispatch(stopFetchingAction())
    }
  },

  removeAndConvertUser({pathQuery}) {
    return async (dispatch) => {
      try {
        const queryData = query[pathQuery].removeUserDeleted()

        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null,
        })

        if (response.status === 200 && !response.data.errors) {
          await dispatch(this.convertUser({pathQuery}))
        }
      } catch (error) {
        dispatch(
          Notifications.error({
            title: `Error`,
            message: `${error.toString()}`,
          })
        )
        dispatch(loadFail(error.response))

        const {field, message} = utils.getErrorCode(error.response)

        dispatch(setFormFieldError(field, message))
      }
    }
  },
  convertUser({pathQuery}) {
    return async (dispatch) => {
      dispatch(startFetchingAction())
      try {
        const queryData = query[pathQuery].convertUser()

        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null,
        })

        if (response.status === 200 && !response.data.errors) {
          dispatch(
            Notifications.success({
              title: `Success`,
              message: `Convert user success`,
            })
          )
        }
      } catch (error) {
        dispatch(
          Notifications.error({
            title: `Error`,
            message: `${error.toString()}`,
          })
        )
        dispatch(loadFail(error.response))

        const {field, message} = utils.getErrorCode(error.response)

        dispatch(setFormFieldError(field, message))
      }
      dispatch(stopFetchingAction())
    }
  },
}

export default userActions
