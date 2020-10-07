export default {
  loadData(queryClause) {
    return `
    query {
      blog(${queryClause}) {
        _id
        index
        name
        description
        slug
        content
        createdBy
        pictures
        status
        metaTitle
        metaDescription
        metaKeyword
      }
    }`
  },

  loadDataPager(queryClause) {
    return `
    query {
      searchBlogs(${queryClause.whereClause}) {
        items {
          _id
          index
          name
          description
          slug
          content
          createdBy
          pictures
          status
          metaTitle
          metaDescription
          metaKeyword
        }
        total
      }
    }
    `
  },

  create(queryClause) {
    return `
    mutation {
      createBlog(${queryClause}) {
        recordId
      }
    }
    `
  },

  update(queryClause) {
    return `
    mutation {
      updateBlog(${queryClause}) {
        recordId
      }
    }
    `
  },
  delete(queryClause) {
    return `
    mutation {
      deleteBlog(${queryClause}) {
        recordId
      }
    }
    `
  }
}

