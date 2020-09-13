import upload from './uploadFile'

// AUTHORIZATION
import authorization from './auth'

// DASHBOARD
import dashboardQuery from './dashboard'

// SELECT
import select from './select'

export default {
  ...select,

  ...authorization,

  dashboardQuery
}