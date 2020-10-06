export default {
  loadData(queryClause) {
    return `
    query {
      video(${queryClause}) {
        _id
        title
        content
        url
        category{
          _id
          name
        }
        pictures
        status
      }
    }`
  },

  loadDataPager(queryClause) {
    return `
    query {
      searchVideos(${queryClause.whereClause}) {
        items {
          _id
          title
          content
          url
          category{
            _id
            name
          }
          pictures
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
      createVideo(${queryClause}) {
        recordId
      }
    }
    `
  },

  update(queryClause) {
    return `
    mutation {
      updateVideo(${queryClause}) {
        recordId
      }
    }
    `
  },
  delete(queryClause) {
    return `
    mutation {
      deleteVideo(${queryClause}) {
        recordId
      }
    }
    `
  }
}

