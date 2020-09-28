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
      products(${queryClause.whereClause}) {
        _id
        name
        images
        description,
        attribute
        slug
        packing
        tutorial
        status
      }
      productsCount(${queryClause.whereConnectionClause})
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

