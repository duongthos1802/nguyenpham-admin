import React from 'react'
import { withCreate } from '../../hocs/withCreate'
import { enumType, queryPath } from '../../constants'
import Form from './Form'
import { blogServices } from '../../services'

const Create = (props) => {
  const {
    formError,
    handleSubmitForm,
    handleCancelForm,
    user
  } = props
  return (
    <Form
      formError={formError}
      mode={enumType.mode.create}
      handleSubmit={handleSubmitForm}
      handleCancel={handleCancelForm}
      user={user}
    />
  )
}

const customCreate = withCreate({
  pathName: queryPath.BLOG_QUERY,
  createData: (values, { createDataCallback }) => {
    const queryClause = blogServices.initQueryCreateOrUpdateBlogs({
      values: values
    })
    createDataCallback(queryClause)
  }
})

export default customCreate(Create)