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
        videoUrl
        isPriority
        category {
          _id
          index
          name
          description
        }
        pictures
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
      searchRecipes(${queryClause.whereClause}) {
        items {
          _id
          name
          description
          slug
          status
          isPriority
          pictures
          category {
            _id
            index
            name
          }
          videoUrl
          ingredient
          method
          level
          viewCount
        }
        total
      }
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

