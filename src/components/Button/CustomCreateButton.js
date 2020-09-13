import React from 'react'
// lib
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
// HoCs
import { withPermission } from '../../hocs/withPermission'

const CustomCreateButton = (props) => {
  const {
    linkUrl,
    labelName = 'Create'
  } = props

  return (
    <Link
      to={linkUrl}
      className="ant-btn ant-btn-primary mr-4"
    >
      {labelName}
    </Link>
  )
}

CustomCreateButton.propTypes = {
  linkUrl: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  labelName: PropTypes.string
}

export default withPermission(CustomCreateButton)