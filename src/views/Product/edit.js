import React from 'react'
import { withUpdate } from '../../hocs/withUpdate'
import { enumType, queryPath } from '../../constants'
import { categoryService } from '../../services'
import Form from './Form'
import { routes } from '../../routes'

const Edit = (props) => {
  const {
    formError,
    data,
    handleSubmitForm,
    handleCancelForm
  } = props

  const categoryDetail = data && data.category
    ? data.category
    : null

  return (
    <Form
      formError={formError}
      data={categoryDetail}
      mode={enumType.mode.edit}
      handleCancel={handleCancelForm}
      handleSubmit={handleSubmitForm}
    />
  )
}

const customUpdate = withUpdate({
  pathName: queryPath.CATEGORY_QUERY,
  loadData: (values, { loadDataCallback }) => {
    const query = `_id: "${values}"`
    loadDataCallback(query)
  },
  updateData: (values, { updateDataCallback }) => {
    const query = categoryService.initQueryCreateOrUpdateCategory({
      values: values,
      categoryId: values._id
    })
    updateDataCallback(query)
  },
  pathRedirect: routes.ADMIN_CATEGORIES
})

export default customUpdate(Edit)