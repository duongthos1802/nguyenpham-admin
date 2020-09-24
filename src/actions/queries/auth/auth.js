export default {
  login(username, password) {
    return `
      mutation {
        loginAdmin(username: "${username}", password: "${password}") {
          token
          user {
            _id
            username
          }
          userSession {
            _id
          }
          permissions {
            resource
            action
          }
        }
      }
    `
  },

  register(username, email, password) {
    return `
      mutation {
        register(
          email: "${email}"
          password: "${password}"
          username: "${username}"
        ) {
          token
          user {
            id
            username
            email
          }
          permissions {
            action
            resource
          }
        }
      }
    `
  },

 
  changePassword(login, oldPass, newPass) {
    return `
    mutation {
      changePasswordUser(_id: "${login}", currentPassword: "${oldPass}", passwordNew: "${newPass}") {
        _id
      }
    }
    `
  },

  sendVerifyEmail(username) {
    return `
    mutation {
      sendEmailVerify(login: "${username}") {
        token
      }
    }
    `
  },
   
  checkUserSession (session) {
    return `
    mutation {
      checkUserSession(sessionId: "${session}") {
        _id
        username
        isAdmin
        status
        firstTime
        lastActive
      }
    }
    `
  },
}