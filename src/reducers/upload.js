import ActionTypes from '../actions/types'

const initialState = {
  image: null
}

const UploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPLOAD_FILE_SUCCESS:
      return Object.assign({}, state, {
        image: action.payload.data
      })
    case ActionTypes.CLEAR_UPLOAD_SUCCESS:
      return initialState
    default:
      return state
  }
}

export default UploadReducer
