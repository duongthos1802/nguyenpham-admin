export default {
  loadDataPager(queryClause) {
    return `
    query {
      recipes(${queryClause}) {
        _id
        name
      }
    }
    `
  }
}