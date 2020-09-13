import React from 'react'
import { Icon } from 'antd'

const IconCheck = ({ checked }) => {
  return checked
    ? <Icon type="check" className='text-success'/>
    : <Icon type="close" className='text-danger'/>
}

export default IconCheck