import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import { enumType } from '../../constants'

const OrderStatus = ({ status }) => {
  let currentStatus = enumType.orderTransactionStatusEnum.find(
    option => option.value === status)
  if (!currentStatus) {
    currentStatus = enumType.orderTransactionStatusEnum.find(
      option => option.value === enumType.orderStatus.Placed)
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

OrderStatus.propTypes = {
  status: PropTypes.string
}

export default OrderStatus