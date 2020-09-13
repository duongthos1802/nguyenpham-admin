import React, {memo} from 'react'
// lib
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {Button} from 'antd'

const CustomButtonHeader = ({layout, isMobile, children}) => (
  <Button.Group
    className={
      classNames({
        'custom-mobile-btn-group': isMobile,
        'custom-btn-group': !isMobile && layout !== 'vertical',
        'flex-column': layout === 'vertical'
      })
    }
  >
    {children}
  </Button.Group>
)

CustomButtonHeader.propTypes = {
  isMobile: PropTypes.oneOfType([PropTypes.bool]),
  layout: PropTypes.oneOf(['vertical', 'horizontal'])
}

export default memo(CustomButtonHeader)