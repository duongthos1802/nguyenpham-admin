import React from 'react'
import PropTypes from 'prop-types'
import { formikHelper } from '../extensions'

const ErrorMessage = (props) => {
  const {
    errors,
    touched,
    fieldName,
    isValidate = true
  } = props

  return (
    <div className='custom-error'>
      {
        isValidate && formikHelper.checkFieldError(errors, touched, fieldName)
          ? errors[fieldName]
          : null
      }
    </div>
  )
}

ErrorMessage.propTypes = {
  errors: PropTypes.any,
  touched: PropTypes.any,
  fieldName: PropTypes.string,
  isValidate: PropTypes.bool
}

export default ErrorMessage