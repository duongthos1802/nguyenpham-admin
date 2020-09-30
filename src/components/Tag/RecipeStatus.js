import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import { enumType } from '../../constants'

const RecipeStatus = ({ status }) => {
  let currentStatus = enumType.recipeStatusEnum.find(
    option => option.value === status)
  if (!currentStatus) {
    currentStatus = enumType.recipeStatusEnum.find(
      option => option.value === enumType.recipeStatus.Published)
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

RecipeStatus.propTypes = {
  status: PropTypes.string
}

export default RecipeStatus