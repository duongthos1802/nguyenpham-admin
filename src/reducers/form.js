import ActionTypes from '../actions/types'

const initState = {
  field: null,
  message: null,
  extensionInfo: null
}

const FormReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_FORM_FIELD_ERROR_SUCCESS:
      return Object.assign({}, state, {...action.payload})
    case ActionTypes.FETCH_RESET_FORM_FIELD_ERROR_SUCCESS:
      return initState
    default:
      return initState
  }
}

export default FormReducer