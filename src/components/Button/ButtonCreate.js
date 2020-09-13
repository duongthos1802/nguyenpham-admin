import React from 'react'
// lib
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
// hoc
import {withPermission} from '../../hocs/withPermission'
// constant
import {enumType} from '../../constants'
// utils
import utils from '../../utils'

const ButtonCreate = (props) => {
  const {
    linkUrl,
    isMobile,
    isHiddenIcon
  } = props

  return (
    <Link
      to={linkUrl}
      className="ant-btn ant-btn-primary"
    >
      {utils.getButtonText(enumType.buttonType.Create, isMobile, isHiddenIcon)}
    </Link>
  )
}

ButtonCreate.propTypes = {
  linkUrl: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired
}

export default withPermission(ButtonCreate)