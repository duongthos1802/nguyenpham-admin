import React from 'react'
import { Link } from 'react-router-dom'
import ShortItemInfo from '../../../components/CleanUIComponents/ShortItemInfo'
import { imageUtils, urlUtils} from '../../../utils'
import { getLocationUser, getUserName } from '../../../extensions/user'
import { enumType } from '../../../constants'

const ListUser = ({ data }) => {
  return (
    <div className="card-body">
      {data.map((item, key) => {
        const actionData = (
          <Link
            to={urlUtils.getUrlEditUser(item._id, enumType.userEditTab.Profile)}
            className="btn btn-sm btn-outline-default">
            View
          </Link>
        )
        return (
          <ShortItemInfo
            key={key}
            img={imageUtils.getAvatarByUser(item)}
            name={getUserName(item)}
            note={getLocationUser(item)}
            actionData={actionData}
          />
        )
      })}
    </div>
  )
}

const RatingUser = ({ data }) => {

  return (
    <div className="col-xl-4">
      <div className="card card--fullHeight">
        <div className="card-header">
          <div className="utils__title utils__title--flat">
            <strong className="text-uppercase font-size-16">Rating</strong>
          </div>
        </div>
        {
          data && data.topRateUser ? (<ListUser data={data.topRateUser}/>) : null
        }
      </div>
    </div>
  )
}

export default RatingUser