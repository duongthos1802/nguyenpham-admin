import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// components
import Form from './Form'
// HOCs
import { withUpdate } from '../../hocs/withUpdate'
// constants
import { routes } from '../../routes'
import { enumType, queryPath } from '../../constants'
// actions
import dataActions from '../../actions/dataActions'
// services
import { categoryService, videoServices } from '../../services'

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

  const videoDetail = data && data.video && data.video._id === id
    ? data.video
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
      const queryClause = categoryService.initQuerySearchCategoryByOption(enumType.optionsCategory.VIDEO)
      loadData(queryClause)
    }, [dispatch])

  const parentId = state.data?.searchCategories?.items[0]?._id ?? null

  return videoDetail
    ? (
      <Form
        formError={formError}
        data={videoDetail}
        mode={enumType.mode.edit}
        handleCancel={handleCancelForm}
        handleSubmit={handleSubmitForm}
        parentId={parentId}
      />
    )
    : null
}

const customUpdate = withUpdate({
  pathName: queryPath.VIDEO_QUERY,
  loadData: (values, { loadDataCallback }) => {
    const query = `_id: "${values}"`
    loadDataCallback(query)
  },
  updateData: (values, { updateDataCallback }) => {
    const query = videoServices.initQueryCreateOrUpdateVideos({
      values: values,
      videoId: values._id
    })
    updateDataCallback(query)
  },
  pathRedirect: routes.ADMIN_VIDEO
})

export default customUpdate(Edit)