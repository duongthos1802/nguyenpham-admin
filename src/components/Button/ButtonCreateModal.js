import React from 'react'
// lib
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Button } from 'antd'
// hoc
import { withPermission } from '../../hocs/withPermission'
// constant
import { enumType } from '../../constants'
// utils
import utils from '../../utils'

const ButtonCreateModal = (props) => {
  const {
    customClass,
    record,
    type = enumType.buttonTypeComponent.Default,
    isMobile = false,
    isHiddenIcon = false,
    handleChangeItemUpdate,
    labelName
  } = props

  return (
    <Button
      type={type}
      htmlType='button'
      className={
        classNames({
          'ant-btn ant-btn-primary': type ===
            enumType.buttonTypeComponent.Default,
          [`${customClass}`]: !!customClass
        })
      }
      onClick={(e) => {
        e.stopPropagation()
        handleChangeItemUpdate(record,enumType.confirmType.Create)
      }}
    >
      {labelName}
    </Button>
  )
}

ButtonCreateModal.propTypes = {
  customClass: PropTypes.string,
  resource: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  handleChangeItemUpdate: PropTypes.func,
  type: PropTypes.string,
  isHiddenIcon: PropTypes.bool,
  isMobile: PropTypes.bool
}

export default withPermission(ButtonCreateModal)