import React from 'react'
// lib
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// hoc
import { withPermission } from '../../hocs/withPermission'
// constant
import { enumType } from '../../constants'
// utils
import utils from '../../utils'

const ButtonLink = (props) => {
  const {
    linkUrl,
    customClass,
    isHiddenIcon,
    type = enumType.buttonTypeComponent.Default,
    buttonName = utils.getButtonText(enumType.buttonType.Edit, false,
      isHiddenIcon)
  } = props

  return (
    <Link
      to={linkUrl}
      className={
        classNames({
          'ant-btn text-primary border-primary mb-2 d-inline-block': type !==
            enumType.buttonTypeComponent.Link,
          [`${customClass}`]: !!customClass
        })
      }>
      {buttonName}
    </Link>
  )
}

ButtonLink.propTypes = {
  customClass: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  isHiddenIcon: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(enumType.buttonTypeComponent)),
  buttonName: PropTypes.any
}

export default withPermission(ButtonLink)

