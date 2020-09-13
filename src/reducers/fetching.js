import ActionTypes from '../actions/types'

const initState = {
  isLoading: false,
  isLoadingSelect: false
}

const FetchingReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.START_FETCHING:
      return Object.assign({}, state, {
        isLoading: true
      })
    case ActionTypes.STOP_FETCHING:
      return Object.assign({}, state, {
        isLoading: false
      })
    case ActionTypes.START_FETCHING_SELECT:
      return Object.assign({}, state, {
        isLoadingSelect: true
      })
    case ActionTypes.STOP_FETCHING_SELECT:
      return Object.assign({}, state, {
        isLoadingSelect: false
      })
    default:
      return state
  }
}

export default FetchingReducer
