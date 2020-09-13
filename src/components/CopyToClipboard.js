import React from 'react'
import { Icon, notification, Tooltip } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const CopyClipboard = ({ content }) => {

  const handleClickCopy = () => {
    notification.success({
      message: 'Copied to clipboard!',
      duration: 2
    })
  }

  return (
    <CopyToClipboard text={content} onCopy={handleClickCopy}>
      <Tooltip title={content}>
        <Icon type="copy"/>
      </Tooltip>
    </CopyToClipboard>
  )
}

export default CopyClipboard