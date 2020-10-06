import React from 'react'
import { withUpdate } from '../../hocs/withUpdate'
import { enumType, queryPath } from '../../constants'
import { videoServices } from '../../services'
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

  const videoDetail = data && data.video && data.video._id === id
    ? data.video
    : null
  return videoDetail
    ? (
      <Form
        formError={formError}
        data={videoDetail}
        mode={enumType.mode.edit}
        handleCancel={handleCancelForm}
        handleSubmit={handleSubmitForm}
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
    console.log('values', values)
    const query = videoServices.initQueryCreateOrUpdateVideos({
      values: values,
      videoId: values._id  
    })
    updateDataCallback(query)
  },
  pathRedirect: routes.ADMIN_VIDEO
})

export default customUpdate(Edit)