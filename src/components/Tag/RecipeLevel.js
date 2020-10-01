import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import { enumType } from '../../constants'

const RecipeLevel = ({ status }) => {
  let currentStatus = enumType.recipeLevelEnum.find(
    option => option.value === status)
  if (!currentStatus) {
    currentStatus = enumType.recipeLevelEnum.find(
      option => option.value === enumType.recipeLevel.Medium)
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

RecipeLevel.propTypes = {
  status: PropTypes.string
}

export default RecipeLevel