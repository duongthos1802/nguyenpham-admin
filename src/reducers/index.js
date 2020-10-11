import {reducer as notifications} from 'react-notification-system-redux'
import {connectRouter} from 'connected-react-router'
import {combineReducers} from 'redux'

import fetching from './fetching'
import data from './data'
import auth from './auth'
import form from './form'
import upload from './upload'
import category from './category'

const rootReducer = (history) => combineReducers({
  notifications,
  router: connectRouter(history),
  fetching,
  data,
  auth,
  form,
  upload,
  category
})

export default rootReducer