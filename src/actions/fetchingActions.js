import ActionTypes from './types'

const fetchingActions = {
  start (message) {
    return { type: ActionTypes.START_FETCHING, message }
  },
  stop () {
    return { type: ActionTypes.STOP_FETCHING }
  }
}

export default fetchingActions
