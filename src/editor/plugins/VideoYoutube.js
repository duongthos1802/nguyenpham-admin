import React, { memo, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import * as Yup from 'yup'
import classNames from 'classnames'
import { enumType, FORM_ITEM_LAYOUT } from '../../constants'
import { Form, Input, Modal } from 'antd'

const YOUTUBE_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/

const VIMEO_REGEX = /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/

const checkFieldRegex = (value) => {
  let valid = false
  let type = null
  let videoId = null

  if (value.match(YOUTUBE_REGEX)) {
    valid = true
    type = enumType.videoType.Youtube
    videoId = value.match(YOUTUBE_REGEX)[1]
  } else if (value.match(VIMEO_REGEX)) {
    valid = true
    type = enumType.videoType.Vimeo
    videoId = value.match(VIMEO_REGEX)[4]
  }

  return {
    valid: valid,
    type: type,
    videoId: videoId
  }
}

const schema = Yup.string()
  .required('This field is required')
  .typeError('This field is required')
  .test({
    name: 'validYoutubeUrl',
    message: 'Invalid Video embed',
    test: (value) => checkFieldRegex(value).valid
  })

const handleValidateField = (fieldValue, validateSuccess, validateFail) => {
  schema.validate(fieldValue)
    .then(value => validateSuccess(value))
    .catch(error => validateFail(error))
}

const VideoYoutube = (props) => {

  const [errors, setErrors] = useState(false)
  const [touched, setTouched] = useState(false)
  const [url, setUrl] = useState(null)
  const [openForm, setOpenForm] = useState(false)

  useEffect(
    () => {
      setErrors(null)
      setTouched(false)
      setUrl(null)
    },
    [openForm]
  )

  const buttonRef = useRef(null)

  const handleValidate = (url) => {
    handleValidateField(url, () => setErrors(null), (errors) => setErrors(errors.message))
  }

  const handleSubmitForm = () => {
    handleValidateField(url,
      (value) => {
        setOpenForm(false)
        props.handleSave(checkFieldRegex(value))
      },
      (errors) => setErrors(errors.message))
  }

  return (
    <React.Fragment>
      <button
        id={'btnVideoYoutube'}
        ref={buttonRef}
        className="d-none"
        onClick={() => setOpenForm(true)}
      />
      <Modal
        className='custom-modal-video-embed'
        visible={openForm}
        mask={false}
        maskClosable={false}
        title="Video Embed"
        centered={true}
        onCancel={() => setOpenForm(false)}
        onOk={handleSubmitForm}
      >
        <Form.Item
          {...FORM_ITEM_LAYOUT}
          label='Url Youtube'
        >
          <Input
            value={url}
            onChange={(event) => {
              setUrl(event.target.value)
              handleValidate(event.target.value)
            }}
            onBlur={() => setTouched(true)}
            className={
              classNames({
                'has-error': errors && touched
              })
            }
          />
          {
            errors
              ? <div className='custom-error'>
                {errors}
              </div>
              : null
          }
        </Form.Item>
      </Modal>
    </React.Fragment>
  )
}

export const openInsertVideo = (handleSave) => {
  ReactDOM.render(
    <VideoYoutube
      handleSave={handleSave}
    />,
    document.getElementById('pluginEditor')
  )
  const input = document.getElementById('btnVideoYoutube')
  if (input) {
    input.click()
  }
}

export default memo(VideoYoutube)
