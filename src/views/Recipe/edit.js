import React from 'react'
// HOCs
import { withUpdate } from '../../hocs/withUpdate'
// services
import { recipeService } from '../../services'
// components
import Form from './Form'
// constants
import { routes } from '../../routes'
import { enumType, queryPath } from '../../constants'

const Edit = (props) => {
  const {
    formError,
    data,
    handleSubmitForm,
    handleCancelForm
  } = props

  const recipeDetail = data && data.recipe
    ? data.recipe
    : null

  return (
    <Form
      formError={formError}
      data={recipeDetail}
      mode={enumType.mode.edit}
      handleCancel={handleCancelForm}
      handleSubmit={handleSubmitForm}
    />
  )
}

const customUpdate = withUpdate({
  pathName: queryPath.RECIPE_QUERY,
  loadData: (values, { loadDataCallback }) => {
    const query = `_id: "${values}"`
    loadDataCallback(query)
  },
  updateData: (values, { updateDataCallback }) => {
    const query = recipeService.initQueryCreateOrUpdateRecipes({
      values: values,
      recipeId: values._id
    })
    updateDataCallback(query)
  },
  pathRedirect: routes.ADMIN_RECIPES
})

export default customUpdate(Edit)