import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import { enumType } from '../../constants'

const CustomerStatus = ({ status }) => {
  let currentStatus = enumType.customerStatusEnum.find(
    option => option.value === status)

    
  if (!currentStatus) {
    currentStatus = enumType.customerStatusEnum.find(
      option => option.value === enumType.customerStatus.Awaiting)
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

CustomerStatus.propTypes = {
  status: PropTypes.string
}

export default CustomerStatus