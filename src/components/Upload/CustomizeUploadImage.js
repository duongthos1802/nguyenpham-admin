import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon, Upload, Modal } from 'antd/lib/index'
import _ from 'lodash'
import upload from '../../services/upload'
import {
  getImagePathByType,
  getPreviewImage,
  isImageType,
} from '../../utils/image'

const FileResult = ({ file, handleSetThumbnail, handleDeleteFile }) => {
  return (
    <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card">
      <div className="ant-upload-list-item-info">
        <span>
          <a
            className="ant-upload-list-item-thumbnail"
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={file.url} className="ant-upload-list-item-image"/>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="ant-upload-list-item-name ant-upload-list-item-name-icon-count-2"
            href={file.url}
          />
        </span>
      </div>
      <span className="ant-upload-list-item-actions">
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          title="Preview file"
        >
          <Icon type="eye-o"/>
        </a>
        <a
          onClick={handleSetThumbnail}
          target="_blank"
          rel="noopener noreferrer"
          title="Set thumbnail file"
          style={{color: 'rgba(255, 255, 255, 0.85)'}}
        >
          <Icon type="home"/>
        </a>
        <a
          onClick={handleDeleteFile}
          target="_blank"
          rel="noopener noreferrer"
          title="Delete file"
        >
          <Icon type="delete"/>
        </a>
      </span>
    </div>
  )
}

const CustomizeUploadImage = (props) => {
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
    customizeFileList,
    isUser,
  } = props

  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalUpload, setTotalUpload] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (multiple) {
      handleCheckInputMultiple(data)
    } else {
      handleCheckInputSingle(data)
    }
  }, [data])

  useEffect(() => {
    if (maxFileUpload && totalUpload + fileList.length > maxFileUpload) {
      Modal.warning({
        title: `Upload maximum ${maxFileUpload} images!`,
      })
      setTotalUpload(0)
    }
  }, [totalUpload])

  const handleCheckInputMultiple = (data) => {
    if (data && data.length > 0) {
      if (!_.isEqual(data, fileList)) {
        if (Array.isArray(data)) {
          if (multiple && !firstLoad) {
            const listFile = fileList.concat(data).filter((image) => image.url)
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
      fileName: file.filename,
    })}`,
    isThumbnail: fileList && fileList.length === 0
  })

  const getResultUploadFile = (listFileUpload = []) => {
    let fileResult
    if (multiple) {
      fileResult = listFileUpload.map((file) => getFileData(file))
      fileResult = _.uniqBy(
        fileList.concat(fileResult).filter((image) => image.url),
        'url'
      )
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

  const handleCheckBeforeUpload = (file, listFileUpload) => {
    return new Promise(async (resolve, reject) => {
      if (listFileUpload.find((file) => !isImageType(file.type))) {
        Modal.warning({
          title: 'You can only upload JPG/PNG file!',
        })
        reject(false)
      }
      if (
        maxFileUpload &&
        fileList.length + listFileUpload.length > maxFileUpload
      ) {
        setTotalUpload(listFileUpload.length)
        reject(false)
      }
      resolve()
    })
  }

  const handleShowModalUploadFail = () => {
    Modal.error({
      title: 'Error occur when uploading image',
      content: 'Please check your image again.',
    })
  }

  const handleCustomRequest = async (options) => {
    setLoading(true)
    setFirstLoad(false)
    try {
      const resultData = await upload.uploadFile(options.file, type)
      if (resultData && resultData.length > 0) {
        getResultUploadFile(resultData)
      } else {
        handleShowModalUploadFail()
      }
    } catch (e) {
      handleShowModalUploadFail()
    }
    setLoading(false)
  }

  const handleChangeFileUpload = (fileList) => {
    const imageUpload = fileList.filter((item) => item.url)
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

  const handleSetThumbnail = (file) => {
    const imageUpload = _
      .chain(fileList)
      .map(item => {
        if (item.isThumbnail && item.url !== file.url) {
          return { ...item, isThumbnail: false }
        } else if (item.url === file.url) {
          return { ...item, isThumbnail: true }
        }
        return { ...item }
      })
      .sortBy('isThumbnail').reverse()
      .value()
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

  const handleDeleteFile = (file) => {
    const imageUpload = _.remove(fileList, function (objectFile) {
      return objectFile.url !== file.url
    })
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
    <div className="d-flex">
      {customizeFileList ? (
        <div className="ant-upload-list ant-upload-list-picture-card d-flex">
          {fileList.map((file, key) => {
            return (
              <FileResult
                key={key}
                file={file}
                handleSetThumbnail={() => handleSetThumbnail(file)}
                handleDeleteFile={() => handleDeleteFile(file)}
              />
            )
          })}
        </div>
      ) : null}
      <Upload
        onRemove={onRemove ? true : onRemove}
        disabled={disabled}
        name={name}
        listType={listType || 'picture-card'}
        className={className}
        showUploadList={customizeFileList ? false : showUploadList}
        fileList={fileList}
        multiple={!!multiple}
        beforeUpload={handleCheckBeforeUpload}
        customRequest={handleCustomRequest}
        onChange={({ fileList }) => handleChangeFileUpload(fileList)}
      >
        {loading ? (
          <Icon type={'loading'}/>
        ) : (isUser || showSingleImage) && fileList[0] ? (
          <img src={fileList[0].url} alt="img" className={`img-fluid`}/>
        ) : !maxFileUpload || fileList.length < maxFileUpload ? (
          <React.Fragment>
            <Icon type={'plus'}/>
            <div className="ant-upload-text">Upload</div>
          </React.Fragment>
        ) : null}
      </Upload>
    </div>
  )
}

CustomizeUploadImage.propTypes = {
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
  showSingleImage: PropTypes.bool,
  customizeFileList: PropTypes.bool,
}

export default CustomizeUploadImage
