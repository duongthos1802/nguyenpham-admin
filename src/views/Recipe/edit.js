import React, { useCallback, useEffect } from 'react'
// HOCs
import { withUpdate } from '../../hocs/withUpdate'
// services
import { categoryService, recipeService } from '../../services'
// components
import Form from './Form'
// constants
import { routes } from '../../routes'
import { enumType, queryPath } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import dataActions from '../../actions/dataActions'

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

  const dispatch = useDispatch()

  const loadData = useCallback(
    (queryClause) => dispatch(dataActions.loadDataPager(queryClause, queryPath.CATEGORY_QUERY)),
    [dispatch]
  )
  const state = useSelector(state => {
    return {
      data: state.data ? state.data.get(queryPath.CATEGORY_QUERY) : null
    }
  })
  useEffect(
    () => {
      const queryClause = categoryService.initQuerySearchCategoryByOption(enumType.optionsCategory.RECIPE)
      loadData(queryClause)
    }, [dispatch])

  const parentId = state.data?.searchCategories?.items[0]?._id ?? null

  return (
    <Form
      formError={formError}
      data={recipeDetail}
      mode={enumType.mode.edit}
      handleCancel={handleCancelForm}
      handleSubmit={handleSubmitForm}
      parentId={parentId}
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