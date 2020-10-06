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
          parentId {
            _id
            name
            index
          }
          banner
          slug
          urlSlug
          url
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
      searchCategories(${queryClause.whereClause}) {
        items {
          _id
          index
          name
          image
          description
          banner
          slug
          urlSlug
          url
          metaTitle
          metaDescription
          metaKeyword
          status
        }
        total
      }
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

