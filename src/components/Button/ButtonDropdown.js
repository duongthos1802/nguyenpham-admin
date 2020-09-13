import React from 'react'
import { Dropdown, Icon, Menu } from 'antd'
import {FormattedMessage} from 'react-intl'
// lib
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// hoc
import { withPermission } from '../../hocs/withPermission'
//route
import { routes } from '../../routes'

const OptionSelect = () => {
  return (
    <Menu>
      <Menu.Item key="1">
        <Link
          to={routes.ROUTE_PRODUCT_IMPORT}
        >
          <FormattedMessage
            id={`importJson`}
            defaultMessage= {`Import JSON`}
          />
        </Link>
      </Menu.Item>
    </Menu>
  )
}


const ButtonDropdown = (props) => {
  const {
    linkUrl,
    isMobile,
    isHiddenIcon,
    labelName
  } = props

  return (
    <Dropdown overlay={OptionSelect} className="mr-4">
      <Link
        to={linkUrl}
        className="ant-btn ant-btn-primary"
      >
        <FormattedMessage
          id={`Button.${labelName}`}
          defaultMessage= {`${labelName}`}
        />
        <Icon type="down"/>
      </Link>
    </Dropdown>
  )
}

ButtonDropdown.propTypes = {
  linkUrl: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired
}

export default withPermission(ButtonDropdown)