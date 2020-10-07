export default {
  loadDataPager(queryClause) {
    return `
    query {
      categories(${queryClause}) {
        index
        _id
        name
        parentId{
          _id
        }
      }
    }
    `
  }
}