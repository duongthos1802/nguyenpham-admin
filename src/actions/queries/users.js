export default {
  loadData(queryClause) {
    return `
    query {
      user(${queryClause}) {
        _id
        icon
        iconThumbnail
        iconFile {
          _id
        }
        banner
        bannerThumbnail
        bannerFile {
          _id
        }
        name
        phone
        mail
        description
        location {
          _id
          text
        }
        membershipPlan {
          _id
          name
        }
        status
        facebookName
        instagramName
        verification
        phoneVerified
        date
        lastActive
        verificationCode {
          code
          codeSms
        }
      }
    }
    `
  },
  loadDataPager(queryClause) {
    return `
      query {
        users(${queryClause.whereClause}) {
          _id
          mail
          name
          products
          icon
          iconThumbnail
          location {
            text
          }
          date
          lastActive
          status
          membershipPlan {
            _id
            name
          }
        }
        usersCount(${queryClause.whereConnectionClause})
      }
    `
  },
  create(queryClause) {
    return `
    mutation {
      createUserAdmin(${queryClause}) {
        _id
      }
    }
    `
  },
  update(queryClause) {
    return `
    mutation {
      updateUserAdmin(${queryClause}) {
        _id
        membershipPlan{
          _id
          isProtected
          isUnlimitProduct
          limitProducts
        }
      }
    }
    `
  },
  updateUser(queryClause) {
    return `
    mutation {
      updateUser(${queryClause}) {
        recordId
      }
    }
    `
  },
  sendMailUser() {
    return `
      mutation {
        singleSendDynamicMail
      }
    `
  },
  removeUserDeleted() {
    return `
      mutation{
        deleteManyUsersDeleted   
      }
    `
  },
  convertUser() {
    return `
    mutation{
      convertUser
    }`
  }
}