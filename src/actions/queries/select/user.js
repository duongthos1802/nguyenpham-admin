export default {
  loadDataPager(queryClause) {
    return `
    query {
      users(${queryClause}) {
        _id
        name
        mail
      }
    }
    `
  }
}