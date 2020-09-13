import React from 'react'
// lib
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button } from 'antd'
// hoc
import { withPermission } from '../../hocs/withPermission'
// constant
import { enumType } from '../../constants'
// utils
import utils from '../../utils'

const ButtonAction = (props) => {

  const {
    customClass,
    type,
    buttonName = utils.getButtonText(enumType.buttonType.Create),
    handleClickButton
  } = props
  return (
    <Button
      className={
        classNames({
          [`${customClass}`]: !!customClass
        })
      }
      type={type || 'primary'}
      onClick={() => {
        if (handleClickButton) {
          handleClickButton()
        }
      }}
    >
      {buttonName}
    </Button>
  )
}

ButtonAction.propTypes = {
  customClass: PropTypes.string,
  type: PropTypes.string,
  buttonName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  handleClickButton: PropTypes.func,
  resource: PropTypes.string,
  action: PropTypes.string
}

export default withPermission(ButtonAction)