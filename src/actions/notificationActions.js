import ActionTypes from './types'

const notificationActions = {
  showNotification (notification, type) {
    return (dispatch) => {
      dispatch({
        type: ActionTypes.SHOW_NOTIFICATION,
        notification: {message: notification, type}
      })
    }
  },

  resetNotification () {
    return dispatch => dispatch({type: ActionTypes.RESET_NOTIFICATION})
  }
}

export default notificationActions
