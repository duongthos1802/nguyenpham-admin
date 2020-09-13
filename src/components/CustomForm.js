import React from 'react'
import { Card } from 'antd'
import classNames from 'classnames'

const CustomForm = ({ title, buttonHeader, children, buttonFooter, customCardHead }) => (
  <Card

    title={
      title
        ? (
          <div className='utils__title'>
            <strong>
              {title}
            </strong>
          </div>
        )
        : null
    }

    extra={buttonHeader}
    // size='small'
    // className='custom-card-form card'
    className={
      classNames({
        'custom-card-form': true,
        'custom-card-head': !customCardHead,
        [`${customCardHead}`]: !!customCardHead
      })
    }
  >
    {children}
    {
      buttonFooter
        ? <div className='form-actions px-3 px-sm-0 text-right'>
          {buttonFooter}
        </div>
        : null
    }
  </Card>
)

export default CustomForm