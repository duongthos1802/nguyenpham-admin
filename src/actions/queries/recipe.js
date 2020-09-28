export default {
  loadData(queryClause) {
    return `
    query {
        recipe(${queryClause}) {
          _id
          name
          description
          slug
          status
          category {
            index
            name
            description
          }
          ingredient
          method
          level
          viewCount
        }
      }`
  },

  loadDataPager(queryClause) {
    return `
    query {
      recipes(${queryClause.whereClause}) {
        _id
        name
        description
        slug
        status
        category {
          index
          name
          description
        }
        ingredient
        method
        level
        viewCount
      }
      recipesCount(${queryClause.whereConnectionClause})
    }
    `
  },

  create(queryClause) {
    return `
    mutation {
      createRecipe(${queryClause}) {
        recordId
      }
    }
    `
  },

  update(queryClause) {
    return `
    mutation {
      updateRecipe(${queryClause}) {
        recordId
      }
    }
    `
  },
  delete(queryClause) {
    return `
    mutation {
      deleteRecipe(${queryClause}) {
        recordId
      }
    }
    `
  }
}

