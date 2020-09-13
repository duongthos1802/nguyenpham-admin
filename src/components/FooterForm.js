import React from 'react'
import PropTypes from 'prop-types'
import { enumType } from '../constants'
import { Button } from 'antd'
import utils from '../utils'
import { ButtonSave } from './Button'

const FooterForm = (
  {
    isMobile,
    resource,
    handleSubmit,
    handleCancel,
    buttonSave = utils.getButtonText(enumType.buttonType.Save, isMobile, true),
    isHiddenCancel = false
  }) => (
  <div
    className='d-flex justify-content-center'
  >
    <ButtonSave
      buttonName={buttonSave}
      action={enumType.action.Write}
      resource={resource}
      handleClickSave={handleSubmit}
      customClass='mx-3 min-width-150'
    />
    {
      isHiddenCancel
        ? null
        : (
          <Button
            type={'default'}
            className='mx-3 min-width-150'
            onClick={handleCancel}
          >
            {utils.getButtonText(enumType.buttonType.Cancel, isMobile, true)}
          </Button>
        )
    }

  </div>
)

FooterForm.propTypes = {
  isMobile: PropTypes.bool,
  resource: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
  buttonSave: PropTypes.any,
  isHiddenCancel: PropTypes.bool
}

export default (FooterForm)