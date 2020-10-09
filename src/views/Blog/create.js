import React, { useCallback, useEffect } from 'react'
import { withCreate } from '../../hocs/withCreate'
import { enumType, queryPath } from '../../constants'
import Form from './Form'
import { blogServices, categoryService } from '../../services'
import { useDispatch, useSelector } from 'react-redux'
import dataActions from '../../actions/dataActions'

const Create = (props) => {
  const {
    formError,
    handleSubmitForm,
    handleCancelForm,
    user
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
    const queryClause = categoryService.initQuerySearchCategoryByOption(enumType.optionsCategory.BLOG)
    loadData(queryClause)
  }, [dispatch])
  
  const parentId = state.data && state.data.searchCategories && state.data.searchCategories?.items.length > 0 ? state.data.searchCategories.items[0]._id : null

  return (
    <Form
      formError={formError}
      mode={enumType.mode.create}
      handleSubmit={handleSubmitForm}
      handleCancel={handleCancelForm}
      user={user}
      parentId={parentId}
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