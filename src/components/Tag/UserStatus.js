import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import { enumType } from '../../constants'

const ProductStatus = ({ status }) => {
  let currentStatus = enumType.userStatusEnum.find(
    option => option.value === status)
  if (!currentStatus) {
    currentStatus = enumType.userStatusEnum.find(
      option => option.value === enumType.userStatus.Normal)
  }

  if (currentStatus) {
    return (
      <Tag
        color={currentStatus.color}
      >
        <span className='text-uppercase'>
          {currentStatus.label}
        </span>
      </Tag>
    )
  }
  return null
}

ProductStatus.propTypes = {
  status: PropTypes.string
}

export default ProductStatus