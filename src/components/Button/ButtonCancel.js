import React from 'react'
// lib
import PropTypes from 'prop-types'
// constant
import {enumType} from '../../constants'
// utils
import utils from '../../utils'
// component
import {Button} from 'antd'

const ButtonCancel = (props) => {
  const {
    isMobile,
    isHiddenIcon,
    handleClickButton
  } = props

  return (
    <Button
      type={'default'}
      className='border border-secondary bg-secondary text-white'
      onClick={handleClickButton}
    >
      {utils.getButtonText(enumType.buttonType.Cancel, isMobile, isHiddenIcon)}
    </Button>
  )
}

ButtonCancel.propTypes = {
  handleClickButton: PropTypes.func
}

export default ButtonCancel