import React, { memo } from 'react'
import { Menu, Dropdown } from 'antd'
import { FormattedMessage } from 'react-intl'

import { LANGUAGE } from '../../../constants'

const Language = () => {
  // functions
  const handleChangeLanguage = ({ key }) => {
    const language = localStorage.getItem(LANGUAGE)
    if (key !== language) {
      localStorage.setItem(LANGUAGE, key)
      window.location.reload()
    }
  }

  // init variables before render
  const language = localStorage.getItem(LANGUAGE)
  const menu = (
    <Menu
      selectable={false}
      onClick={handleChangeLanguage}
    >
      <Menu.Item
        key='vi'
      >
          <span className='mr-2'>
            <img
              src={require('../../../img/flags/32/vietnam.png')}
              className="img-fluid"
              alt={'vietnam'}
            />
          </span>
        <FormattedMessage id="Language.Vietnamese" defaultMessage="Vietnamese"/>
      </Menu.Item>
      <Menu.Item
        key='en'
      >
          <span className='mr-2'>
            <img
              src={require('../../../img/flags/32/united-kingdom.png')}
              className="img-fluid"
              alt={'english'}
            />
          </span>
        <FormattedMessage id="Language.English" defaultMessage="English"/>
      </Menu.Item>
    </Menu>
  )
  // render
  return (
    <div className="topbar__dropdown d-inline-block mr-4">
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <strong>
          <a className="ant-dropdown-link" href="/">
            {language === 'en' ? 'EN' : 'VI'}
          </a>
        </strong>
      </Dropdown>
    </div>
  )
}

export default memo(Language)
