import {
  loadFail,
  loadSuccess,
  startFetchingSelect,
  stopFetchingSelect
} from './commonAction'
import ActionTypes from './types'
import query from './queries/support'
import axiosProvider from './api/axiosProvider'
import Notifications from 'react-notification-system-redux'

const GRAPHQL_PATH = ''

export default {
  resetUserPassword(queryClause) {
    return async(dispatch) => {
      dispatch(startFetchingSelect())
      try {
        const queryData = query.resetUserPassword(queryClause)

        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null
        })

        if (response.status === 200 && !response.data.errors) {
          dispatch(
            loadSuccess({
                data: response.data.data,
                actionType: ActionTypes.FETCH_RESET_USER_PASSWORD,
                callback: [
                  Notifications.success({
                    title: 'Success',
                    message: 'Reset password success.'
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
      dispatch(stopFetchingSelect())
    }
  }
}