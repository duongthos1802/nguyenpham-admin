import React from 'react'
import { withUpdate } from '../../hocs/withUpdate'
import { enumType, queryPath } from '../../constants'
import { productService } from '../../services'
import Form from './Form'
import { routes } from '../../routes'

const Edit = (props) => {
  const {
    formError,
    data,
    handleSubmitForm,
    handleCancelForm
  } = props

  const productDetail = data && data.product
    ? data.product
    : null

  return (
    <Form
      formError={formError}
      data={productDetail}
      mode={enumType.mode.edit}
      handleCancel={handleCancelForm}
      handleSubmit={handleSubmitForm}
    />
  )
}

const customUpdate = withUpdate({
  pathName: queryPath.PRODUCT_QUERY,
  loadData: (values, { loadDataCallback }) => {
    const query = `_id: "${values}"`
    loadDataCallback(query)
  },
  updateData: (values, { updateDataCallback }) => {
    const query = productService.initQueryCreateOrUpdateProduct({
      values: values,
      productId: values._id
    })
    updateDataCallback(query)
  },
  pathRedirect: routes.ADMIN_PRODUCT
})

export default customUpdate(Edit)