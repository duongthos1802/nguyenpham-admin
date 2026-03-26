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
          slug
          option
          content
          isHome
          isBrand
          isMenu
          typeBrand
          blogId {
            _id
            name
          }
          brands {
            _id
            name
          }
          parentId {
            _id
            name
            index
            option
          }
          banner
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
          metaTitle
          metaDescription
          metaKeyword
          status
          parentId {
            _id
            name
          }
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
  },

  serachCategoryByOption(queryClause) {
    return `
    query {
      serachCategoryByOption(${queryClause}){
        _id
      }
    }
    `
  }
}

