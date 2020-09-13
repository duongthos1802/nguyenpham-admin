import React from 'react'
//components
import { Avatar } from 'antd'
//utils
import { getAvatarByUser } from '../utils/image'
import utils from '../utils'

const CustomAvatar = ({ user }) => {
  const userAvatarUrl = getAvatarByUser(user)
  if (userAvatarUrl) {
    return (
      <Avatar
        src={userAvatarUrl}
        size='large'
      />
    )
  }

  let username = 'L'
  if (user) {
    username = user.name
    if (!username && user.mail) {
      username = user.mail
    }
  }
  const avatar = utils.getAvatarBackground(username)
  return (
    <Avatar
      style={{
        backgroundColor: avatar.background
      }}
      size='large'
    >
      <span className='text-uppercase font-weight-bold'>
        {avatar.username}
      </span>
    </Avatar>
  )
}

export default CustomAvatar
