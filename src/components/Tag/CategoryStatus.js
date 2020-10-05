import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import { enumType } from '../../constants'

const CategoryStatus = ({ status }) => {
  let currentStatus = enumType.categoryStatusEnum.find(
    option => option.value === status)
  if (!currentStatus) {
    currentStatus = enumType.categoryStatusEnum.find(
      option => option.value === enumType.categoryStatus.PUBLISHED)
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

CategoryStatus.propTypes = {
  status: PropTypes.string
}

export default CategoryStatus