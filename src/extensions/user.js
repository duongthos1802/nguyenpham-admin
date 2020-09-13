import {
  DEFAULT_MEMBERSHIP_PLAN,
  DEFAULT_TEXT_EMPTY,
  DEFAULT_USER_STATUS
} from '../constants'

export const isUser = (user) => {
  return !!user
}

export const getUserName = (user) => {
  if (!user) {
    return DEFAULT_TEXT_EMPTY
  }
  if (user.name) {
    return user.name
  }
  if (user.mail) {
    return user.mail
  }
  return DEFAULT_TEXT_EMPTY
}

export const getLocationUser = (user) => {
  if (!isUser(user)) return DEFAULT_TEXT_EMPTY
  if (!user.location) return DEFAULT_TEXT_EMPTY
  return user.location.text || DEFAULT_TEXT_EMPTY
}

export const getStatusUser = (status) => {
  if (!status) {
    return DEFAULT_USER_STATUS
  }
  return status
}

export const getMembershipStatus = (membership) => {
  if (!membership || !membership.name) {
    return DEFAULT_MEMBERSHIP_PLAN
  }
  return membership.name
}

export default {
  isUser,
  getUserName,
  getLocationUser,
  getStatusUser,
  getMembershipStatus
}