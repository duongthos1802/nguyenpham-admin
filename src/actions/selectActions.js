import {
  clearSuccess,
  loadFail,
  loadSuccess,
  startFetchingSelect,
  stopFetchingSelect
} from './commonAction'
import ActionTypes from './types'
import query from './queries'
import axiosProvider from './api/axiosProvider'
import Notifications from 'react-notification-system-redux'

const GRAPHQL_PATH = ''

export default {
  loadDataPager(clause, pathQuery) {
    return async(dispatch) => {
      dispatch(clearSuccess(ActionTypes.CLEAR_SUCCESS, pathQuery))
      dispatch(startFetchingSelect())
      try {
        const queryData = query[pathQuery].loadDataPager(clause)

        const response = await axiosProvider.post(GRAPHQL_PATH, {
          query: `${queryData}`,
          variables: null
        })

        if (response.status === 200 && !response.data.errors) {
          dispatch(
            loadSuccess({
                actionType: ActionTypes.FETCH_SUCCESS,
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
      dispatch(stopFetchingSelect())
    }
  }
}