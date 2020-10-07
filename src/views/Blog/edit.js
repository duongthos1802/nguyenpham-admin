import React from 'react'
import { withUpdate } from '../../hocs/withUpdate'
import { enumType, queryPath } from '../../constants'
import { blogServices } from '../../services'
import Form from './Form'
import { routes } from '../../routes'

const Edit = (props) => {
  const {
    match,
    formError,
    data,
    handleSubmitForm,
    handleCancelForm,
    user
  } = props

  const { id } = match.params

  const blockDetail = data && data.blog && data.blog._id === id
    ? data.blog
    : null
  return blockDetail
    ? (
      <Form
        formError={formError}
        data={blockDetail}
        mode={enumType.mode.edit}
        handleCancel={handleCancelForm}
        handleSubmit={handleSubmitForm}
        user={user}
      />
    )
    : null
}

const customUpdate = withUpdate({
  pathName: queryPath.BLOG_QUERY,
  loadData: (values, { loadDataCallback }) => {
    const query = `_id: "${values}"`
    loadDataCallback(query)
  },
  updateData: (values, { updateDataCallback }) => {
    console.log('values', values)
    const query = blogServices.initQueryCreateOrUpdateBlogs({
      values: values,
      blogId: values._id  
    })
    updateDataCallback(query)
  },
  pathRedirect: routes.ADMIN_BLOG
})

export default customUpdate(Edit)