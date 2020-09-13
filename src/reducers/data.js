import immutable from 'immutable'
import ActionTypes from '../actions/types'

const initState = immutable.fromJS({})

const DataReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SUCCESS:
    case ActionTypes.FETCH_PAGER_SUCCESS:
      if (state.get(action.payload.path) === undefined) {
        return state.set(action.payload.path, {
          clause: action.payload.clause,
          ...action.payload.data
        })
      } else {
        const result = immutable
          .fromJS({})
          .merge(state.get(action.payload.path), {
            clause: action.payload.clause,
            ...action.payload.data
          })
          .toJS()
        return state.set(action.payload.path, result)
      }
    case ActionTypes.CREATE_SUCCESS:
      if (state.get(action.payload.path) === undefined) {
        return state.set(action.payload.path, {
          createClause: action.payload.clause,
          ...action.payload.data,
          isCreateSuccess: true
        })
      } else {
        const result = immutable
          .fromJS({})
          .merge(state.get(action.payload.path), {
            createClause: action.payload.clause,
            ...action.payload.data,
            isCreateSuccess: true
          })
          .toJS()
        return state.set(action.payload.path, result)
      }
    case ActionTypes.UPDATE_SUCCESS:
    case ActionTypes.UPDATE_MANY_SUCCESS:
      if (state.get(action.payload.path) === undefined) {
        return state.set(action.payload.path, {
          updateClause: action.payload.clause,
          ...action.payload.data,
          isUpdateSuccess: true
        })
      } else {
        const result = immutable
          .fromJS({})
          .merge(state.get(action.payload.path), {
            updateClause: action.payload.clause,
            ...action.payload.data,
            isUpdateSuccess: true
          })
          .toJS()
        return state.set(action.payload.path, result)
      }
    case ActionTypes.DELETE_SUCCESS:
      if (state.get(action.payload.path) === undefined) {
        return state.set(action.payload.path, {
          deleteClause: action.payload.clause,
          ...action.payload.data,
          isDeleteSuccess: true
        })
      } else {
        const result = immutable
          .fromJS({})
          .merge(state.get(action.payload.path), {
            deleteClause: action.payload.clause,
            ...action.payload.data,
            isDeleteSuccess: true
          })
          .toJS()
        return state.set(action.payload.path, result)
      }
    case ActionTypes.CLEAR_SUCCESS:
      if (state.get(action.payload.path) === undefined) {
        return state.set(action.payload.path, {
          isCreateSuccess: false,
          isUpdateSuccess: false,
          isDeleteSuccess: false
        })
      } else {
        const result = immutable
          .fromJS({})
          .merge(state.get(action.payload.path), {
            isCreateSuccess: false,
            isUpdateSuccess: false,
            isDeleteSuccess: false
          })
          .toJS()
        return state.set(action.payload.path, result)
      }
    default:
      return state
  }
}

export default DataReducer
