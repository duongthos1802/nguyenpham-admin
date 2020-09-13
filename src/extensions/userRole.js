 export const userRole = (listRole, listUserRole) => {
    let dataUserRole = []
    if (listRole.length > 0) {
      listRole.forEach(role => {
        if (listUserRole.length > 0) {
          const findRole = listUserRole.find(userRole => userRole.role === role._id)
          if (findRole) {
            dataUserRole.push(role._id)
          }
        }
      })
    }

    return dataUserRole
 }
 export default {
    userRole
  }