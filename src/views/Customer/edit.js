import React from 'react'
import { withUpdate } from '../../hocs/withUpdate'
import { enumType, queryPath } from '../../constants'
import { customerServices } from '../../services'
import Form from './Form'
import { routes } from '../../routes'
const Edit = (props) => {

  const {
    data,
    auth,
    isMobile,
    formError,
    handleSubmitForm,
    handleCancelForm
  } = props

  const customerDetail = data && data.customer
    ? data.customer
    : null

  return (
    <Form
      mode={enumType.mode.edit}
      formError={formError}
      data={customerDetail}
      auth={auth}
      isMobile={isMobile}
      handleSubmit={handleSubmitForm}
      handleCancel={handleCancelForm}
    />
  )
}

const customUpdate = withUpdate({
  pathName: queryPath.CUSTOMER_QUERY,
  loadData: (values, { loadDataCallback }) => {
    const query = `_id: "${values}"`
    loadDataCallback(query)
  },
  updateData: (values, { updateDataCallback }) => {
    const query = customerServices.initQueryCreateOrUpdateCustomer(values)
    updateDataCallback(query)
  },
  pathRedirect: routes.ADMIN_CUSTOMER
})

export default customUpdate(Edit)