import React, { memo } from 'react'
import { FormattedMessage } from 'react-intl'

const AccessDenied = (props) => {
  return (
    <div className="middle-box text-center loginscreen animated fadeInDown">
      <h1>403</h1>
      <h3 className="font-bold">
        <FormattedMessage id="Title.AccessDenied" defaultMessage="Access Denied"/>
      </h3>
      <div>
        <FormattedMessage
          id="Content.AccessDenied"
          defaultMessage=" You don't have permission to open this page. Try logging out and login with difference account."/>
      </div>
    </div>
  )
}

export default memo(AccessDenied)