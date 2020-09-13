import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

const InfoBlock = ({ header, children, buttonHeader }) => (
  <Card
    title={
      header
        ? <h5>
          {header}
        </h5>
        : null
    }
    extra={buttonHeader}
    size='small'
    className={header
      ? 'border-0'
      : 'border-left-0 border-right-0 border-bottom-0'}
  >
    {children}
  </Card>
)

InfoBlock.propTypes = {
  header: PropTypes.any,
  children: PropTypes.any,
  buttonHeader: PropTypes.any
}

export default memo(InfoBlock)
