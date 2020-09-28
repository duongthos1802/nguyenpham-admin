import React from 'react'
import { withCreate } from '../../hocs/withCreate'
import { enumType, queryPath } from '../../constants'
import Form from './Form'
import { recipeService } from '../../services'

const Create = (props) => {
  const {
    formError,
    handleSubmitForm,
    handleCancelForm
  } = props
  return (
    <Form
      formError={formError}
      mode={enumType.mode.create}
      handleSubmit={handleSubmitForm}
      handleCancel={handleCancelForm}
    />
  )
}

const customCreate = withCreate({
  pathName: queryPath.RECIPE_QUERY,
  createData: (values, { createDataCallback }) => {
    const queryClause = recipeService.initQueryCreateOrUpdateRecipes({
      values: values
    })
    console.log('queryClause......', queryClause);
    createDataCallback(queryClause)
  }
})

export default customCreate(Create)