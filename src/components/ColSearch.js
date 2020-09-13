import React, { memo } from 'react'
// lib
import classNames from 'classnames'
import PropTypes from 'prop-types'
// component
import { Form } from 'antd'

const ColSearch = ({ children, label, customCol }) => (
  <div className={
    classNames({
      'col-12 col-md-6': true,
      'col-xl-2': !customCol,
      [`${customCol}`]: !!customCol
    })
  }>
    <div className='mb-3'>
      <Form.Item
        colon={false}
        label={label}
      >
        {children}
      </Form.Item>
    </div>
  </div>
)

ColSearch.propTypes = {
  label: PropTypes.any,
  customCol: PropTypes.string
}

export default memo(ColSearch)
