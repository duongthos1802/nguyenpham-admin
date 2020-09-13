import React from 'react'
// lib
import { Button } from 'antd'
import PropTypes from 'prop-types'
// hoc
import { withPermission } from '../../hocs/withPermission'
// constant
import { enumType } from '../../constants'
// utils
import utils from '../../utils'

const ButtonSave = (props) => {
  const {
    buttonName = utils.getButtonText(enumType.buttonType.Save),
    handleClickSave,
    disabled = false,
    customClass
  } = props
  return (
    <Button
      htmlType='submit'
      type='primary'
      disabled={disabled}
      onClick={handleClickSave}
      className={customClass}
    >
      {buttonName}
    </Button>
  )
}

ButtonSave.propTypes = {
  buttonName: PropTypes.any,
  handleClickSave: PropTypes.func,
  disabled: PropTypes.bool,
  resource: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  customClass: PropTypes.string
}

export default withPermission(ButtonSave)