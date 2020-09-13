import React, { memo } from 'react'
// lib
import PropTypes from 'prop-types'
import { Modal, Icon } from 'antd'

const ConfirmModal = (props) => {

  const {
    title,
    open,
    handleAcceptConfirm,
    handleCloseConfirm,
    children,
    saveText
  } = props
  // functions
  // render
  return (
    <Modal
      centered={true}
      closable={false}
      onCancel={handleCloseConfirm}
      onOk={handleAcceptConfirm}
      maskClosable={false}
      okText={saveText}
      title={
        <div className='d-flex align-items-center'>
          <Icon
            type="question-circle"
            className='mr-2 font-size-24'
            style={{ color: '#f39834' }}
          />
          {title}
        </div>
      }
      visible={open}
    >
      {children}
    </Modal>
  )
}

ConfirmModal.propTypes = {
  confirmType: PropTypes.string,
  isMobile: PropTypes.oneOfType([PropTypes.bool]),
  open: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  saveText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  cancelText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  handleAcceptConfirm: PropTypes.func,
  handleCloseConfirm: PropTypes.func
}

export default memo(ConfirmModal)
