import React from 'react'
// HoCs
import { withCreate } from '../../../hocs/withCreate'
// constants
import { enumType, queryPath } from '../../../constants'
// services
import { bannersServices } from '../../../services'
// components
import Form from './Form'

const Create = props => {

  const {
    isMobile,
    auth,
    formError,
    handleSubmitForm,
    handleCancelForm
  } = props

  return (
    <Form
      mode={enumType.mode.create}
      formError={formError}
      auth={auth}
      isMobile={isMobile}
      handleSubmit={handleSubmitForm}
      handleCancel={handleCancelForm}
    />
  )
}

const customCreate = withCreate({
  pathName: queryPath.BANNERS_QUERY,
  createData: (values, { createDataCallback, match }) => {

    console.log(match)
    const { _id } = match.params
    const queryClause = bannersServices.initQueryCreateOrUpdateBanner(
      { values, groupId: _id })
    createDataCallback(queryClause)
  }
})

export default customCreate(Create)