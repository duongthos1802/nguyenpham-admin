import React, { memo, useRef } from 'react'
import upload from '../../services/upload'
import ReactDOM from 'react-dom'
import { Modal } from 'antd'
import { enumType } from '../../constants'
import { getImagePathByType, getPreviewImage } from '../../utils/image'

const IMAGE_EDITOR_PATH = enumType.imagePath.Banner

const FileUpload = (props) => {

  const inputRef = useRef(null)

  const onChangeFile = async(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]

    const resultData = await upload.uploadFile(file, IMAGE_EDITOR_PATH)
    if (resultData && resultData.length > 0) {
      const file = resultData[0]
      const fileUpload = {
        uid: file._id,
        status: 'done',
        filename: file.filename,
        url: `${getPreviewImage({
          imagePath: getImagePathByType(IMAGE_EDITOR_PATH),
          fileName: file.filename
        })}`
      }
      if (props.handleSave) {
        props.handleSave(fileUpload)
      }
    } else {
      Modal.error({
        title: 'Error',
        content: 'An error occurred while processing your request.',
        centered: true
      })
    }
  }

  return (
    <input
      type="file"
      name="..."
      id={'fileUploadCkEditor'}
      ref={inputRef}
      className="d-none"
      onChange={onChangeFile}
    />
  )
}

export const openUploadImage = (currentUserId, imageType, handleSave) => {
  ReactDOM.render(
    <FileUpload
      imageType={imageType}
      currentUserId={currentUserId}
      handleSave={handleSave}
    />,
    document.getElementById('pluginEditor')
  )
  const input = document.getElementById('fileUploadCkEditor')
  if (input) {
    input.click()
  }
}

export default memo(FileUpload)
