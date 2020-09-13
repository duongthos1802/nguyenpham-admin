import React from 'react'
// lib
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { InputNumber as AntInputNumber } from 'antd'

const CurrencyInput = (props) => {
  const {
    placeholder,
    value,
    customClass,
    handleChange,
    handleBlur,
    isPercentage,
    disablePrefix,
    min,
    max,
    step
  } = props

  const parserValue = (value) => {
    return value.replace(/\$\s?|(,*)/g, '').replace(/%/g, '')
  }

  const formatValue = (value) => {
    if (isPercentage) {
      return `${value}%`
    }
    return (disablePrefix ? `${value}` : `$ ${value}`).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const prefix = isPercentage
    ? null
    : '$'

  const maxValue = isPercentage
    ? 100
    : max

  return (
    <AntInputNumber
      placeholder={placeholder}
      className={
        classNames('ant-input w-100', customClass)
      }
      value={value}
      formatter={formatValue}
      parser={parserValue}
      min={min || 0}
      max={maxValue}
      step={ step || 0.1}
      prefix={prefix}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

CurrencyInput.propTypes = {
  placeholder: PropTypes.any,
  value: PropTypes.any,
  customClass: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  prefix: PropTypes.string,
  isPercentage: PropTypes.bool,
  max: PropTypes.number
}

export default CurrencyInput