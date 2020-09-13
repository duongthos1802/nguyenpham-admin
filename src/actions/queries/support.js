export default {
  resetUserPassword(queryClause) {
    return `
    mutation {
      resetPassword(${queryClause}) {
        _id
      }
    }
    `
  }
}