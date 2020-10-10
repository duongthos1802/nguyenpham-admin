import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// components
import Form from './Form'
// HOCs
import { withCreate } from '../../hocs/withCreate'
// constants
import { enumType, queryPath } from '../../constants'
// services
import { categoryService, videoServices } from '../../services'
// actions
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
    const queryClause = categoryService.initQuerySearchCategoryByOption(enumType.optionsCategory.VIDEO)
    loadData(queryClause)
  }, [dispatch])
  
  const parentId = state.data?.searchCategories?.items[0]?._id ?? null
  
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
  pathName: queryPath.VIDEO_QUERY,
  createData: (values, { createDataCallback }) => {
    const queryClause = videoServices.initQueryCreateOrUpdateVideos({
      values: values
    })
    createDataCallback(queryClause)
  }
})

export default customCreate(Create)