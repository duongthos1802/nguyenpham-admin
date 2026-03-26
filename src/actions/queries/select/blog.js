export default {
  loadDataPager(queryClause) {
    return `
    query {
      blogs(${queryClause}) {
        _id
        name
      }
    }
    `
  }
}