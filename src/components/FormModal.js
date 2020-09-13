import React, {memo, useRef, createRef} from 'react'
// lib
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Button, Modal} from 'antd'
import {FormattedMessage} from 'react-intl'
// component
import CustomButtonHeader from './CustomButtonHeader'

const FormModal = (props) => {

  const {
    isMobile,
    title,
    open,
    customClass,
    handleCloseModal
  } = props

  const buttonRef = useRef(createRef())

  const initPropsToComponent = props.children
    ? React.cloneElement(props.children, {
      buttonSubmit: (
        <button
          ref={buttonRef}
          type='submit'
          className='d-none'
        />
      ),
    })
    : null

  return (
    <Modal
      className={
        classNames({
          [`${customClass}`]: !!customClass
        })
      }
      centered={true}
      closable={false}
      footer={
        <CustomButtonHeader
          isMobile={isMobile}
        >
          <Button
            type='primary'
            icon='check'
            onClick={() => {
              if (buttonRef.current) {
                buttonRef.current.click()
              }
            }}
            ghost={true}
          >
            <FormattedMessage
              id="Button.Accept"
              defaultMessage="Accept"
            />
          </Button>
          <Button
            className='border-danger'
            icon='close'
            type='danger'
            onClick={() => {
              if (handleCloseModal) {
                handleCloseModal()
              }
            }}
            ghost={true}
          >
            <FormattedMessage
              id="Button.Cancel"
              defaultMessage="Cancel"
            />
          </Button>
        </CustomButtonHeader>
      }
      maskClosable={false}
      title={title}
      visible={open}
    >
      {
        initPropsToComponent
      }
    </Modal>
  )
}

FormModal.propTypes = {
  isMobile: PropTypes.oneOfType([PropTypes.bool]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  customClass: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func
}

export default memo(FormModal)
