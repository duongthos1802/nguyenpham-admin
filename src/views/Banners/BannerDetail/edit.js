import React from 'react'
// HoCs
import { withUpdate } from '../../../hocs/withUpdate'
// constants
import { enumType, queryPath } from '../../../constants'
// services
import { bannersServices } from '../../../services'
// components
import Form from './Form'

const Edit = props => {

  const {
    data,
    auth,
    isMobile,
    formError,
    handleSubmitForm,
    handleCancelForm
  } = props

  const banner = data && data.banner
    ? data.banner
    : null

  return banner ? (
    <Form
      mode={enumType.mode.edit}
      formError={formError}
      data={banner}
      auth={auth}
      isMobile={isMobile}
      handleSubmit={handleSubmitForm}
      handleCancel={handleCancelForm}
    />
  ) : null
}

const customUpdate = withUpdate({
  pathName: queryPath.BANNERS_QUERY,
  loadData: (value, { loadDataCallback, match }) => {

    const { _idBanner } = match.params
    const queryClause = `_id: "${_idBanner}"`
    loadDataCallback(queryClause)
  },
  updateData: (values, { updateDataCallback, match }) => {
    const { _id } = match.params

    const queryClause = bannersServices.initQueryCreateOrUpdateBanner({
      values: values,
      objectId: values.id,
      groupId: _id
    })
    updateDataCallback(queryClause)
  }
  // pathRedirect: routes.ADMIN_BANNER_GROUP
})

export default customUpdate(Edit)
