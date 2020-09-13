export default {
  login(login, password) {
    return `
      mutation {
        loginAdmin(email: "${login}", password: "${password}") {
          token
          user {
            _id
            verification
            mail
            name
            icon
            iconThumbnail
            playIds
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
        mail
        name
        icon
        iconThumbnail
        banner
        verification
        phoneVerified
        phone
        description
        playIds
        isTermsOfUse
        isPrivacyPolicy
        isLoanPolicy
        isProhibitedItems
        userAddress{
          _id
        }
        location{
          _id
          coordinate{
            latitude
            longitude
          }
        }
      }
    }
    `
  },
}