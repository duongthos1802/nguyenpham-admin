import React from 'react'
// component
import {Form} from 'antd'
// constant
import {FORM_ITEM_LAYOUT} from '../constants'


const CustomFormItem = ({label, children}) => (
  <Form.Item
    {...FORM_ITEM_LAYOUT}
    label={
      <span className='font-weight-bold'>
        {label}
      </span>
    }
    className='w-100 mb-0 custom-form-field__detail-list'
  >
    {children}
  </Form.Item>
)

export default CustomFormItem