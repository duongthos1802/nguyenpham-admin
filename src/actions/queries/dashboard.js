export default {
  loadData(clause){
    return `
    query {
      getDashboard(${clause}){
        totalPremiumUser
        topUserSignUp
        topProducts{
          _id
          name
          pictures
          price
        }
        topRateUser{
          _id
          name
          mail
          icon
          location{
            text
          }
        }
      }
    }
    `
  }
}