import configStore from '../configStore'
import { show } from 'redux-modal'

import ActionType from './types'

const history = configStore.history

/**
 * start fetching action
 */
export const startFetchingAction = () => {
  return dispatch => {
    dispatch({
      type: ActionType.START_FETCHING
    })
  }
}

export const startFetchingSelect = () => {
  return dispatch => {
    dispatch({
      type: ActionType.START_FETCHING_SELECT
    })
  }
}

/**
 * stop fetching action
 */
export const stopFetchingAction = () => {
  return dispatch => {
    dispatch({
      type: ActionType.STOP_FETCHING
    })
  }
}

export const stopFetchingSelect = () => {
  return dispatch => {
    dispatch({
      type: ActionType.STOP_FETCHING_SELECT
    })
  }
}

/**
 * clear success action
 * @param {*} actionType
 * @param path
 */
export const clearSuccess = (actionType, path) => {
  return dispatch => {
    dispatch({
      type: actionType,
      payload: { path }
    })
  }
}

/**
 * load data
 * @param {*} actionType
 * @param {*} data
 * @param pathQuery
 */
export const loadData = (actionType, data, pathQuery) => {
  return dispatch => {
    dispatch({
      type: actionType,
      payload: { data, path: pathQuery }
    })
  }
}

/**
 * redirect action
 * @param {*} path
 * @param enableGoBack
 */
export const redirectPath = (path, enableGoBack) => {
  if (path) {
    history.push(path)
  } else if (enableGoBack) {
    history.goBack()
  }
  return dispatch => dispatch({
    type: ActionType.REDIRECT_URL
  })
}

/**
 * load success action
 * @param actionType
 * @param data
 * @param pathQuery
 * @param callback
 * @param message
 * @param pathRedirect
 * @param enableGoBack
 * @returns {function(*): Promise<unknown[]>}
 */
export const loadSuccess = (
  {
    actionType, data, pathQuery, message, pathRedirect, enableGoBack, callback
  }) => {
  return dispatch => {
    let actionList = []
    if (actionType) {
      actionList.push(loadData(actionType, data, pathQuery))
    }
    if (message) {
      actionList.push(show('success', { message: message }))
    }
    if (pathRedirect || enableGoBack) {
      actionList.push(redirectPath(pathRedirect, enableGoBack))
    }
    if (callback) {
      actionList = [...actionList, ...callback]
    }
    if (actionList.length > 0) {
      const dispatchList = actionList.map(item => item && dispatch(item))
      return Promise.all(dispatchList)
    }
  }
}

/**
 * load fail action
 * @param message
 * @param path
 * @param callback
 * @returns {function(*): Promise<unknown[]>}
 */
export const loadFail = (message, path, callback) => {
  return dispatch => {
    let actionList = []
    if (message) {
      actionList.push(show('error', { message: message }))
    }
    if (path) {
      actionList.push(redirectPath(path))
    }
    if (callback) {
      actionList.push(...callback)
    }
    if (actionList.length > 0) {
      const dispatchList = actionList.map(item => dispatch(item))
      return Promise.all(dispatchList)
    }
  }
}
