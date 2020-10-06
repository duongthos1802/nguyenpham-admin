import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import { enumType } from '../../constants'

const BlogStatus = ({ status }) => {
  let currentStatus = enumType.blogStatusEnum.find(
    option => option.value === status)
  if (!currentStatus) {
    currentStatus = enumType.blogStatusEnum.find(
      option => option.value === enumType.blogStatus.Published)
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

BlogStatus.propTypes = {
  status: PropTypes.string
}

export default BlogStatus