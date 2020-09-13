import React from 'react'
// lib
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { InputNumber as AntInputNumber } from 'antd'

const InputNumber = (props) => {
  const {
    placeholder,
    value,
    customClass,
    handleChange,
    handleBlur
  } = props

  return (
    <AntInputNumber
      placeholder={placeholder}
      className={classNames('ant-input w-100', customClass)}
      value={value}
      formatter={value => `${value}`.replace(
        /\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/\$\s?|(,*)/g, '')}
      min={0}
      step={1}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

InputNumber.propTypes = {
  placeholder: PropTypes.any,
  value: PropTypes.any,
  customClass: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
}

export default InputNumber
