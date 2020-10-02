import React from 'react'
import Form from './Form'
import { enumType, queryPath } from '../../constants'
import { withUpdate } from '../../hocs/withUpdate'
import { groupBannerServices } from '../../services'
import { routes } from '../../routes'

const Edit = props => {

  const {
    match,
    data,
    auth,
    isMobile,
    formError,
    handleSubmitForm,
    handleCancelForm
  } = props

  const { id } = match.params

  const bannerGroups = data && data.bannerGroup
    ? data.bannerGroup
    : null

  return bannerGroups && bannerGroups._id === id
    ? (
      <Form
        mode={enumType.mode.edit}
        formError={formError}
        data={bannerGroups}
        auth={auth}
        isMobile={isMobile}
        handleSubmit={handleSubmitForm}
        handleCancel={handleCancelForm}
      />
    ) : null
}

const customUpdate = withUpdate({
  pathName: queryPath.GROUP_BANNERS_QUERY,
  loadData: (value, { loadDataCallback }) => {
    const queryClause = `_id: "${value}"`
    loadDataCallback(queryClause)
  },
  updateData: (values, { updateDataCallback }) => {
    const queryClause = groupBannerServices.initQueryCreateOrUpdateBannerGroup({
      values: values,
      objectId: values._id
    })
    updateDataCallback(queryClause)
  },
  pathRedirect: routes.ADMIN_BANNER_GROUP
})

export default customUpdate(Edit)
