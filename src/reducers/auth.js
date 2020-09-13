import ActionTypes from '../actions/types'
import auth from '../services/auth'

const initialState = {
  token: null,
  user: null,
  permissions: [],
  isLoading: false,
  isRegister: false,
  error: '',
  grantList: null
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGGING_IN:
      return {
        ...initialState,
        isLoading: true,
        error: null
      }
    case ActionTypes.USER_LOGGED_IN:
      return {
        ...action.payload,
        isLoading: false,
        error: '',
        login: new Date().toJSON(),
        grantList: auth.getAccessControl(action.payload.permissions)
      }
    case ActionTypes.USER_LOGGED_OUT:
      return initialState
    case ActionTypes.USER_REGISTERED:
      return Object.assign({}, state, { isRegister: true, error: '' })
    case ActionTypes.USER_AUTH_ERROR:
      return Object.assign({}, state, { error: action.data })
    case ActionTypes.USER_VERIFIED:
      return {
        ...state,
        user: { ...state.user, verification: true },
        isLoading: false,
        error: '',
      }
    default:
      return state
  }
}

export default AuthReducer
