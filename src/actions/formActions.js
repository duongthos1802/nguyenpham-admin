import ActionTypes from './types'

export const setFormFieldError = (fieldError, fieldMessage, extensionInfo = null) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_FORM_FIELD_ERROR_SUCCESS,
      payload: {
        field: fieldError,
        message: fieldMessage,
        extensionInfo: extensionInfo
      }
    })
  }
}

export const resetFormFieldError = () => {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_RESET_FORM_FIELD_ERROR_SUCCESS
    })
  }
}