export default {
  loadData(queryClause) {
    return `
    query {
        category(${queryClause}) {
          _id
          index
          name
          image
          description,
          parentId
          banner
          slug
          metaTitle
          metaDescription
          metaKeyword
          status
        }
      }`
  },

  loadDataPager(queryClause) {
    return `
    query {
      categories(${queryClause.whereClause}) {
        _id
        index
        name
        image
        description
        banner
        slug
        metaTitle
        metaDescription
        metaKeyword
        status
      }
      categoriesCount(${queryClause.whereConnectionClause})
    }
    `
  },

  create(queryClause) {
    return `
    mutation {
      createCategory(${queryClause}) {
        recordId
      }
    }
    `
  },

  update(queryClause) {
    return `
    mutation {
      updateCategory(${queryClause}) {
        recordId
      }
    }
    `
  },
  delete(queryClause) {
    return `
    mutation {
      deleteCategory(${queryClause}) {
        recordId
      }
    }
    `
  }
}

