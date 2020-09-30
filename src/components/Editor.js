import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CKEditor from '../editor/CutomizeCKEditor'

const Editor = (props) => {

  const {
    data,
    handleChange,
    handleBlur,
    placeholder,
    editorConfig,
    element,
    customConfig,
    imageType
  } = props

  const [content, setContent] = useState(data || '')

  useEffect(
    () => {
      setContent(data)
    },
    [data]
  )

  return (
    <CKEditor
      imageType={imageType}
      customConfig={customConfig}
      editorConfig={editorConfig}
      element={element || 'ckeditorContent'}
      placeholder={placeholder}
      data={content}
      onChange={(event) => {
        if (handleChange) {
          handleChange(event.editor.getData())
        }
      }}
      onBlur={() => {
        if (handleBlur) {
          handleBlur()
        }
      }}
    />
  )
}

Editor.propTypes = {
  data: PropTypes.any,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  placeholder: PropTypes.any,
  editorConfig: PropTypes.oneOf(['content', 'header']),
  element: PropTypes.string,
  customConfig: PropTypes.object
}

export default Editor
