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
  stopFetchingAction
} from './commonAction'
import { setFormFieldError } from './formActions'
// utils
import utils from '../utils'

const GRAPHQL_PATH = ''

const dataActions = {
  /**
   * load data
   * @param {*} clause
   * @param {*} pathQuery
   */
  loadData(clause, pathQuery) {
    return async(dispatch) => {
      dispatch(clearSuccess(ActionTypes.CLEAR_SUCCESS, pathQuery))
      dispatch(startFetchingAction())
      try {
        const queryData = query[pathQuery].loadData(clause)

        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null
        })

        if (response.status === 200 && !response.data.errors) {
          dispatch(
            loadSuccess({
                actionType: ActionTypes.FETCH_SUCCESS,
                data: response.data.data,
                pathQuery: pathQuery
              }
            )
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
      }
      dispatch(stopFetchingAction())
    }
  },

  /**
   * load data pager
   * @param {*} clause
   * @param {*} pathQuery
   */
  loadDataPager(clause, pathQuery) {
    return async(dispatch) => {
      dispatch(clearSuccess(ActionTypes.CLEAR_SUCCESS, pathQuery))
      dispatch(startFetchingAction())
      try {
        const queryData = query[pathQuery].loadDataPager(clause)
        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null
        })

        if (response.status === 200 && !response.data.errors) {
          dispatch(
            loadSuccess({
                pathQuery: pathQuery,
                data: response.data.data,
                actionType: ActionTypes.FETCH_SUCCESS
              }
            )
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
      }
      dispatch(stopFetchingAction())
    }
  },

  /**
   * create data
   * @param clause
   * @param pathQuery
   * @param pathRedirect
   * @param enableGoBack
   * @returns {Function}
   */
  createData(
    {
      clause,
      pathQuery,
      pathRedirect = null,
      enableGoBack = true
    }) {

    return async(dispatch) => {
      dispatch(startFetchingAction())
      try {
     
        const queryData = query[pathQuery].create(clause)

        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null
        })

        if (response.status === 200 && !response.data.errors) {
          dispatch(
            loadSuccess({
                actionType: ActionTypes.CREATE_SUCCESS,
                data: response.data.data,
                pathQuery: pathQuery,
                pathRedirect: pathRedirect,
                enableGoBack: enableGoBack,
                callback: [
                  Notifications.success({
                    title: 'Success',
                    message: 'Create data success.'
                  })
                ]
              }
            )
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
      dispatch(stopFetchingAction())
    }
  },

  /**
   * update data
   * @param clause
   * @param pathQuery
   * @param pathRedirect
   * @param enableGoBack
   * @returns {Function}
   */
  updateData(
    {
      clause,
      pathQuery,
      pathRedirect = null,
      enableGoBack = true
    }) {
    return async(dispatch) => {
      dispatch(startFetchingAction())
      try {
        const queryData = query[pathQuery].update(clause)

        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null
        })

        if (response.status === 200 && !response.data.errors) {
          dispatch(
            loadSuccess({
                actionType: ActionTypes.UPDATE_SUCCESS,
                data: response.data.data,
                pathQuery: pathQuery,
                enableGoBack: enableGoBack,
                pathRedirect: pathRedirect
              }
            )
          )
          dispatch(
            Notifications.success({
              title: 'Success',
              message: `Update success.`
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
      dispatch(stopFetchingAction())
    }
  },

  /**
   * delete data
   *
   * @param {*} clause
   * @param {*} pathQuery
   * @returns
   */
  deleteData(clause, pathQuery) {
    return async(dispatch) => {
      dispatch(startFetchingAction())
      try {
        const queryData = query[pathQuery].delete(clause)

        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null
        })

        if (response.status === 200 && !response.data.errors) {
          dispatch(
            loadSuccess({
                actionType: ActionTypes.DELETE_SUCCESS,
                data: response.data.data,
                pathQuery: pathQuery
              }
            )
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
      dispatch(stopFetchingAction())
    }
  },

  updateManyData(clause, pathQuery) {
    return async(dispatch) => {
      dispatch(startFetchingAction())
      try {
        const queryData = query[pathQuery].updateManyData(clause)

        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null
        })

        if (response.status === 200 && !response.data.errors) {
          dispatch(
            loadSuccess({
                actionType: ActionTypes.UPDATE_MANY_SUCCESS,
                pathQuery: pathQuery,
                data: response.data.data
              }
            )
          )
        } else {
          dispatch(
            Notifications.error({
              title: `Error`,
              message: `${response.data.errors[0].message}`
            })
          )

          dispatch(loadFail(response.data.errors[0]))
        }
      } catch (error) {
        dispatch(
          Notifications.error({
            title: `Error`,
            message: `${error.toString()}`
          })
        )

        dispatch(loadFail(error.response))
      }
      dispatch(stopFetchingAction())
    }
  }
}

export default dataActions
