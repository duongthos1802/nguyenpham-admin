import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import { enumType } from '../../constants'

const RecipePriority = ({ status }) => {
  let currentStatus = enumType.recipePriorityEnum.find(
    option => option.value === status)
  if (!currentStatus) {
    currentStatus = enumType.recipePriorityEnum.find(
      option => option.value === enumType.recipePriority.No)
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

RecipePriority.propTypes = {
  status: PropTypes.string
}

export default RecipePriority