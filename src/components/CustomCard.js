import React, { memo } from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const CustomCard = ({ title, buttonGroup, children, customCardHead }) => (
  <Card
    title={
      title
        ? (
          <div className='utils__title'>
            {title}
          </div>
        )
        : null
    }
    extra={buttonGroup ? buttonGroup : null}
    // extra={!isMobile ? (buttonGroup ? buttonGroup : null) : null}
    // actions={isMobile ? (buttonGroup ? [buttonGroup] : null) : null}
    // size='small'
    className={
      classNames({
        'custom-card-head': !customCardHead,
        [`${customCardHead}`]: !!customCardHead
      })
    }
  >
    {children}
  </Card>
)

CustomCard.propTypes = {
  title: PropTypes.any,
  buttonGroup: PropTypes.any,
  customCardHead: PropTypes.string
}

export default memo(CustomCard)
