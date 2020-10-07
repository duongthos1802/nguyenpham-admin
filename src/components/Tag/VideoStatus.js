import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import { enumType } from '../../constants'

const VideoStatus = ({ status }) => {
  let currentStatus = enumType.videoStatusEnum.find(
    option => option.value === status)
  if (!currentStatus) {
    currentStatus = enumType.videoStatusEnum.find(
      option => option.value === enumType.videoStatus.Published)
  }

  if (currentStatus) {
    return (
      <Tag
        color={currentStatus.color}
      >
        <span className='text-uppercase'>
          {currentStatus.description}
        </span>
      </Tag>
    )
  }
  return null
}

VideoStatus.propTypes = {
  status: PropTypes.string
}

export default VideoStatus