export default {
  loadDataPager(queryClause) {
    return `
    query {
      bannerGroups(${queryClause.whereClause}) {
        _id
        name
        description
      }
      bannerGroupsCount(${queryClause.whereConnectionClause})
    }
    `
  },

  loadData(queryClause) {
    return `
      query {
        bannerGroup(${queryClause}) {
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
        createBannerGroup(${dataClause}) {
          recordId
        }
      }
    `
  },

  update(dataClause) {
    return `
      mutation {
        updateBannerGroup(${dataClause}) {
          recordId
        }
      }
    `
  }
}