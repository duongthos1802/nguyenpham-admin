import ActionTypes from '../actions/types'

const initialState = {
  category: null
}

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_DATA_FROM_OPTION:
      return {
        category: action.data
      }
    default:
      return state
  }
}

export default CategoryReducer
