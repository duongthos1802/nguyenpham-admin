import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon, Upload, Modal } from 'antd/lib/index'
import _ from 'lodash'
import upload from '../../services/upload'
import {
  getImagePathByType,
  getPreviewImage, isImageType
} from '../../utils/image'

const UploadImage = (props) => {

  const {
    disabled,
    data,
    name,
    multiple = false,
    listType = 'picture-card',
    className,
    handleUploadFile,
    handleChangeFile,
    type,
    onRemove,
    showUploadList,
    maxFileUpload,
    showSingleImage,
    isUser,
    isMenuIcon
  } = props

  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalUpload, setTotalUpload] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(
    () => {
      if (multiple) {
        handleCheckInputMultiple(data)
      } else {
        handleCheckInputSingle(data)
      }
    },
    [data]
  )

  useEffect(
    () => {
      if (maxFileUpload && totalUpload + fileList.length > maxFileUpload) {
        Modal.warning({
          title: `Upload maximum ${maxFileUpload} images!`
        })
        setTotalUpload(0)
      }
    },
    [totalUpload]
  )

  const handleCheckInputMultiple = (data) => {
    if (data && data.length > 0) {
      if (!_.isEqual(data, fileList)) {
        if (Array.isArray(data)) {
          if (multiple && !firstLoad) {
            const listFile = fileList.concat(data).filter(image => image.url)
            const currentFile = _.uniqBy(listFile, 'url')
            setFileList(currentFile)
            if (!_.isEqual(data, currentFile) && handleChangeFile) {
              handleChangeFile(currentFile)
            }
          } else {
            setFileList(data)
          }
        } else {
          setFileList([data])
        }
      }
    } else {
      setFileList([])
    }
  }

  const handleCheckInputSingle = (data) => {
    if (data && !_.isEqual(data, fileList)) {
      if (Array.isArray(data)) {
        setFileList(data)
      } else {
        setFileList([data])
      }
    } else {
      setFileList([])
    }
  }

  const getFileData = (file) => ({
    id: file._id,
    uid: file._id,
    status: 'done',
    filename: file.filename,
    url: `${getPreviewImage({
      imagePath: getImagePathByType(type),
      fileName: file.filename
    })}`
  })

  const getResultUploadFile = (listFileUpload = []) => {
    let fileResult
    if (multiple) {
      fileResult = listFileUpload.map(file => getFileData(file))
      fileResult = _.uniqBy(
        fileList.concat(fileResult).filter(image => image.url), 'url')
    } else {
      fileResult = getFileData(listFileUpload[0])
    }

    if (handleUploadFile) {
      handleUploadFile(fileResult)
    }
    setFileList(Array.isArray(fileResult) ? fileResult : [fileResult])
    if (handleUploadFile) {
      handleUploadFile(fileResult)
    }
  }

  const getImageSize = (file) => {
    if (!file) {
      return 0
    }
    return file.size / 1024 / 1024
  }

  const handleCheckBeforeUpload = (file, listFileUpload) => {
    return new Promise(async (resolve, reject) => {
      if (listFileUpload.find(file => !isImageType(file.type, isMenuIcon))) {
        if (isMenuIcon) {
          Modal.warning({
            title: 'You can only upload JPG/PNG/SVG file!'
          })
        } else {
          Modal.warning({
            title: 'You can only upload JPG/PNG file!'
          })
        }
        reject(false)
      }
      const isLargeImage = getImageSize(file) >= 4
      if (isLargeImage) {
        Modal.warning({
          title: 'Image must be smaller than 4MB!',
        })
        reject(false)
      }
      if (maxFileUpload && fileList.length + listFileUpload.length >
        maxFileUpload) {
        setTotalUpload(listFileUpload.length)
        reject(false)
      }
      resolve()
    })
  }

  const handleShowModalUploadFail = () => {
    Modal.error({
      title: 'Error occur when uploading image',
      content: 'Please check your image again.'
    })
  }


  // custom request
  const handleCustomRequest = async (options) => {
    setLoading(true)
    setFirstLoad(false)
    try {
      const resultData = await upload.uploadFile(options.file, type)
      if (resultData && resultData.length > 0) {
        getResultUploadFile(resultData)
      } else {
        console.log('upload Fail 01 .........');
        handleShowModalUploadFail()
      }
    } catch (e) {
      console.log('upload Fail 02 .........');
      handleShowModalUploadFail()
    }
    setLoading(false)
  }

  const handleChangeFileUpload = (fileList) => {
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

  return (
    <Upload
      onRemove={onRemove ? true : onRemove}
      disabled={disabled}
      name={name}
      listType={listType || 'picture-card'}
      className={className}
      showUploadList={showUploadList}
      fileList={fileList}
      multiple={!!multiple}
      beforeUpload={handleCheckBeforeUpload}
      customRequest={handleCustomRequest}
      onChange={({ fileList }) => handleChangeFileUpload(fileList)}
    >
      {
        loading
          ? (
            <Icon type={'loading'} />
          )
          : (isUser || showSingleImage) && fileList[0]
            ?
            (
              <img src={fileList[0].url} alt="img" className={`img-fluid`} />
            )
            : !maxFileUpload || fileList.length < maxFileUpload
              ? (
                <React.Fragment>
                  <Icon type={'plus'} />
                  <div className="ant-upload-text">Upload</div>
                </React.Fragment>
              )
              : null
      }

    </Upload>
  )
}

UploadImage.propTypes = {
  disabled: PropTypes.bool,
  data: PropTypes.any,
  name: PropTypes.string,
  multiple: PropTypes.bool,
  listType: PropTypes.string,
  className: PropTypes.string,
  imageSquare: PropTypes.bool,
  handleUploadFile: PropTypes.func,
  handleChangeFile: PropTypes.func,
  allowUpload: PropTypes.bool,
  type: PropTypes.string.isRequired,
  onlyImage: PropTypes.bool,
  showButtonUpload: PropTypes.bool,
  showSingleImage: PropTypes.bool
}

export default UploadImage