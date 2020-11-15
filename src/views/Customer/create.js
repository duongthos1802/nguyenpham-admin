import React from 'react'
import Form from './Form'
import { withCreate } from '../../hocs/withCreate'
import { enumType, queryPath } from '../../constants'
import { customerServices } from '../../services'

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
  pathName: queryPath.CUSTOMER_QUERY,
  createData: (values, { createDataCallback }) => {
    const queryClause = customerServices.initQueryCreateOrUpdateCustomer(values)
    createDataCallback(queryClause)
  }
})

export default customCreate(Create)