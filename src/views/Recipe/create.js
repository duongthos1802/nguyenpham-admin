import React, { useCallback, useEffect } from 'react'
import { withCreate } from '../../hocs/withCreate'
import { enumType, queryPath } from '../../constants'
import Form from './Form'
import { recipeService, categoryService } from '../../services'
import { useDispatch, useSelector } from 'react-redux'
import dataActions from '../../actions/dataActions'

const Create = (props) => {
  const {
    formError,
    handleSubmitForm,
    handleCancelForm
  } = props

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
  
  const parentId = state.data && state.data.searchCategories && state.data.searchCategories?.items.length > 0 ? state.data.searchCategories.items[0]._id : null
  
  return (
    <Form
      formError={formError}
      mode={enumType.mode.create}
      handleSubmit={handleSubmitForm}
      handleCancel={handleCancelForm}
      parentId={parentId}
    />
  )
}

const customCreate = withCreate({
  pathName: queryPath.RECIPE_QUERY,
  createData: (values, { createDataCallback }) => {
    const queryClause = recipeService.initQueryCreateOrUpdateRecipes({
      values: values
    })
    createDataCallback(queryClause)
  }
})

export default customCreate(Create)