export default {
  loadDataPager(queryClause) {
    return `
    query {
      banners(${queryClause.whereClause}) {
        _id
        image
        imageMobile
        name
        published
        images
        description
        url
      }
      bannersCount(${queryClause.whereConnectionClause})
    }
    `
  },

  loadData(queryClause) {
    return `
      query {
        banner(${queryClause}) {
          _id
          category {
            _id
            index
            name
          }
          image
          imageMobile
          codeEmbed
          name
          published
          images
          files {
            _id
            filename
          }
          description
          url
        }
      }
    `
  },

  create(dataClause) {
    return `
      mutation {
        createBanner(${dataClause}) {
          recordId
        }
      }
    `
  },

  update(dataClause) {
    return `
      mutation {
        updateBanner(${dataClause}) {
          recordId
        }
      }
    `
  },

  delete(dataClause) {
    return `
      mutation {
        deleteBanner(${dataClause}) {
          recordId
        }
      }
    `
  }
}