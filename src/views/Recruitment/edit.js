import React, { useEffect, useCallback } from 'react'
import { withUpdate } from '../../hocs/withUpdate'
import { enumType, queryPath } from '../../constants'
import { blogServices, categoryService } from '../../services'
import Form from './Form'
import { routes } from '../../routes'
import { useDispatch, useSelector } from 'react-redux'
import dataActions from '../../actions/dataActions'

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

    const parentId = state.data?.searchCategories?.items[0]?._id ?? null

  return blockDetail
    ? (
      <Form
        formError={formError}
        data={blockDetail}
        mode={enumType.mode.edit}
        handleCancel={handleCancelForm}
        handleSubmit={handleSubmitForm}
        user={user}
        parentId={parentId}
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
    const query = blogServices.initQueryCreateOrUpdateBlogs({
      values: values,
      blogId: values._id
    })
    updateDataCallback(query)
  },
  pathRedirect: routes.ADMIN_BLOG
})

export default customUpdate(Edit)