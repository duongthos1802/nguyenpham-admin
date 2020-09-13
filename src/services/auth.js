// lib
import AccessControl from 'accesscontrol'

// constant
import {enumType} from '../constants'

/**
 * format permission with access control format
 * @param listPermission
 * @returns {Array}
 */
const mapPermission = listPermission => {
  return listPermission && listPermission.length > 0
    ? listPermission.map(permission => {
      return {
        action: permission.action,
        role: 'everyone',
        resource: permission.resource
      }
    })
    : []
}

/**
 * convert permission to grant list
 * @param permissions
 * @returns {[]}
 */
const convertPermissionToGrantList = permissions => {
  let grantList = []
  const action = [
    enumType.actionACL.Read,
    enumType.actionACL.Create,
    enumType.actionACL.Delete,
    enumType.actionACL.Update
  ]
  if (permissions && permissions.length > 0) {
    permissions.forEach(item => {
      if (item.action === enumType.action.View) {
        grantList.push({
          role: item.role,
          resource: item.resource.toLowerCase().replace(/[^\w\s]/gi, ''),
          action: enumType.actionACL.Read,
          possession: 'any',
          attributes: '*'
        })
      } else if (item.action === enumType.action.Write) {
        action.forEach(x => {
          grantList.push({
            role: item.role,
            resource: item.resource.toLowerCase().replace(/[^\w\s]/gi, ''),
            action: x,
            possession: 'any',
            attributes: '*'
          })
        })
      }
    })
  }
  return grantList
}

const authServices = {
  /**
   * get access control
   * @param listPermissions
   * @returns {*[]}
   */
  getAccessControl: (listPermissions) => {
    const permission = mapPermission(listPermissions)
    // convert permission to grant list
    return convertPermissionToGrantList(permission)
  },

  /**
   * check permission with action and resource
   * @param action
   * @param resource
   * @param auth
   * @returns {boolean}
   */
  checkPermission: (action, resource, auth) => {
    const USE_PERMISSION = process.env.REACT_APP_USE_PERMISSION || false
    if(!JSON.parse(USE_PERMISSION)){
      return true
    }

    if (!action || !resource || !auth) {
      return false
    }

    const accessControl = new AccessControl(auth && auth.grantList ? auth.grantList : [])

    // get role from ACL
    const userRole = accessControl.getRoles()

    const userAction =
      action === enumType.action.View
        ? enumType.actionACL.Read
        : enumType.actionACL.Update

    for (let index = 0; index < userRole.length; index++) {
      const permission = accessControl.permission({
        role: userRole[index],
        action: userAction,
        resource: resource.toLowerCase().replace(/[^\w\s]/gi, '')
      })
      if (permission.granted === true) return true
    }
    return false
  }
}

export default authServices
