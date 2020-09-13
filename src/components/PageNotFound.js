import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../routes'
import { FormattedMessage } from 'react-intl'

const PageNotFound = () =>
  <div className="middle-box text-center loginscreen animated fadeInDown">
    <h1>404</h1>
    <h3 className="font-bold">
      <FormattedMessage id="Title.PageNotFound" defaultMessage="Page Not Found"/>
    </h3>
    <div>
      <FormattedMessage
        id="Content.PageNotFound"
        defaultMessage="The page you are looking for does not exist it may have been moved, or removed altogether.
        You might want to try the search function. Alternatively, return to the front page."/>
    </div>
    <Link to={routes.ADMIN_DASHBOARD} className=" btn my-3">
      Go back to the main page
    </Link>
  </div>

export default PageNotFound
