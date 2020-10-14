export default {
  loadDataPager(queryClause) {
    return `
    query {
      categories(${queryClause}) {
        index
        _id
        name
        option
        parentId{
          _id
          option
        }
      }
    }
    `
  }
}