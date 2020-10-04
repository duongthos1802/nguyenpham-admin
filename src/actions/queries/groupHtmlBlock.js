export default {
  loadDataPager(queryClause) {
    return `
    query {
      htmlBlockGroups(${queryClause.whereClause}) {
        _id
        name
        description
      }
      htmlBlockGroupsCount(${queryClause.whereConnectionClause})
    }
    `
  },

  loadData(queryClause) {
    return `
      query {
        htmlBlockGroup(${queryClause}) {
          _id
          name
          description 
        }
      }
    `
  },

  create(dataClause) {
    return `
      mutation {
        createHtmlBlockGroup(${dataClause}) {
          recordId
        }
      }
    `
  },

  update(dataClause) {
    return `
      mutation {
        updateHtmlBlockGroup(${dataClause}) {
          recordId
        }
      }
    `
  }
}