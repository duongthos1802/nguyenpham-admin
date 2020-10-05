export default {
  loadData(queryClause) {
    return `
    query {
        product(${queryClause}) {
          _id
          name
          images
          description,
          attribute
          isPriority
          pictures
          category {
            _id
            name
          }
          slug
          packing
          tutorial
          status
        }
      }`
  },

  loadDataPager(queryClause) {
    return `
    query {
      searchProducts(${queryClause.whereClause}) {
        items {
          _id
          name
          images
          description,
          attribute
          isPriority
          pictures
          category {
            _id
            name
          }
          slug
          packing
          tutorial
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
      createProduct(${queryClause}) {
        recordId
      }
    }
    `
  },

  update(queryClause) {
    return `
    mutation {
      updateProduct(${queryClause}) {
        recordId
      }
    }
    `
  },
  delete(queryClause) {
    return `
    mutation {
      deleteProduct(${queryClause}) {
        recordId
      }
    }
    `
  }
}

