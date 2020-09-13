import ActionTypes from '../actions/types'

const initState = {
  resetUserPassword: null
}

const SupportReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_RESET_USER_PASSWORD: {
      return Object.assign({}, state, {
        resetUserPassword: null
      })
    }
    case ActionTypes.FETCH_RESET_USER_PASSWORD: {
      return Object.assign({}, state, {
        resetUserPassword: action.payload.data
      })
    }
    default:
      return state
  }
}

export default SupportReducer