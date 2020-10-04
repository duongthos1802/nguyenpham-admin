export default {
  loadDataPager(queryClause) {
    return `
    query {
      pages(${queryClause.whereClause}) {
        _id
        name
        urlFrontEnd
        router
        isHomePage
        pathPageConfig
        config
        metaTitle
        metaDescription
        metaKeyword
        isHomePage
        createdAt
      }
      pagesCount(${queryClause.whereConnectionClause})
    }
    `
  },

  loadData(queryClause) {
    return `
    query {
      page(${queryClause}) {
        _id
        name
        urlFrontEnd
        router
        pathPageConfig
        config
        metaTitle
        metaDescription
        metaKeyword
        isHomePage
        createdAt
      }
    }
    `
  },

  create(queryClause) {
    return `
    mutation {
      createPage(${queryClause}) {
        recordId
      }
    }
    `
  },

  update(queryClause) {
    return `
    mutation {
      updatePage(${queryClause}) {
        recordId
      }
    }
    `
  },
  delete(queryClause) {
    return `
    mutation {
      deletePage(${queryClause}) {
        recordId
      }
    }
    `
  }
}