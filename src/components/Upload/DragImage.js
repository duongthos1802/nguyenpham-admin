import React, { useEffect, useState } from 'react'
// lib
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Icon, Modal, Upload } from 'antd'
import classNames from 'classnames'
import upload from '../../services/upload'
import {
  getImagePathByType,
  getPreviewImage, isImageType
} from '../../utils/image'

const { Dragger } = Upload

const DragImage = (props) => {

  const {
    data,
    name,
    multiple = false,
    listType = 'picture-card',
    className,
    handleUploadFile,
    handleChangeFile,
    type
  } = props

  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(
    () => {
      if (data && !_.isEqual(data, fileList)) {
        if (Array.isArray(data)) {
          setFileList(data)
        } else {
          setFileList([data])
        }
      } else {
        setFileList([])
      }
    },
    [data]
  )

  const handleRemoveImage = () => {
    if (handleChangeFile) {
      handleChangeFile(null)
    } else {
      setFileList([])
    }
  }

  const handleShowModalUploadFail = () => {
    Modal.error({
      title: 'Error occur when uploading image',
      content: 'Please check your image again.'
    })
  }

  const handleCheckBeforeUpload = (file, listFileUpload) => {
    if (listFileUpload.find(file => !isImageType(file.type))) {
      Modal.warning({
        title: 'You can only upload JPG/PNG file!'
      })
      return false
    }
  }

  const handleCustomRequest = async(options) => {
    setLoading(true)
    try {
      const resultData = await upload.uploadFile(options.file, type)
      if (resultData && resultData.length > 0) {
        const data = resultData[0]
        const file = {
          uid: data._id,
          status: 'done',
          filename: data.filename,
          url: `${getPreviewImage({
            imagePath: getImagePathByType(props.type),
            fileName: data.filename
          })}`
        }
        setFileList([file])
        if (handleUploadFile) {
          handleUploadFile(file)
        }
      } else {
        handleShowModalUploadFail()
      }
    } catch (e) {
      handleShowModalUploadFail()
    }
    setLoading(false)
  }

  const handleChangeFileDrag = (fileList) => {
    const imageUpload = fileList.filter(item => item.url)
    setFileList(imageUpload)
    if (handleChangeFile) {
      const fileUpload = multiple
        ? imageUpload
        : imageUpload.length > 0
          ? imageUpload[0]
          : null
      handleChangeFile(fileUpload)
    }
  }

  const generateContentImage = () => {
    if (loading) {
      return (
        <Icon
          type='loading'
          className='font-size-36 my-4 text-primary'
        />
      )
    }
    if (fileList.length === 0) {
      return (
        <React.Fragment>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox"/>
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </React.Fragment>
      )
    }
    const image = fileList[0]
    return (
      <div className='height-100 overflow-hidden custom-drag-item'>
        <img
          src={image.url}
          className='img-fluid'
          alt='banner'
        />
        <div className='position-absolute custom-drag-item__actions'>
          <Icon
            type="delete"
            className='text-white font-size-24'
            onClick={handleRemoveImage}
          />
        </div>
      </div>
    )
  }

  return (
    <Dragger
      name={name}
      multiple={multiple}
      listType={listType}
      className={classNames(className, {
        'custom-drag': fileList.length > 0
      })}
      showUploadList={false}
      fileList={fileList}
      beforeUpload={handleCheckBeforeUpload}
      customRequest={handleCustomRequest}
      onChange={({ fileList }) => handleChangeFileDrag(fileList)}
      onRemove={() => handleRemoveImage()}
    >
      <div className='min-height-100 mx-3'>
        {generateContentImage()}
      </div>
    </Dragger>
  )
}

DragImage.propTypes = {
  data: PropTypes.any,
  name: PropTypes.string,
  multiple: PropTypes.bool,
  listType: PropTypes.string,
  className: PropTypes.string,
  imageSquare: PropTypes.bool,
  handleUploadFile: PropTypes.func,
  handleChangeFile: PropTypes.func,
  allowUpload: PropTypes.bool,
  type: PropTypes.string.isRequired
}

export default DragImage