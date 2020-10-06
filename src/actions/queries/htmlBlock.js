export default {
  loadDataPager(queryClause) {
    return `
    query {
      htmlBlocks(${queryClause.whereClause}) {
        _id
        code
        title
        content
        description
        htmlBlockGroup { 
          _id
          name
        }
        images
      }
      htmlBlocksCount(${queryClause.whereConnectionClause})
    }
    `
  },

  loadData(queryClause) {
    return `
    query {
      htmlBlock(${queryClause}) {
        _id
        title
        code
        description
        htmlBlockGroup { 
          _id
          name
        }
        content
        images
        image
      }
    }
    `
  },

  create(queryClause) {
    return `
    mutation {
      createHtmlBlock(${queryClause}) {
        recordId
      }
    }
    `
  },

  update(queryClause) {
    return `
    mutation {
      updateHtmlBlock(${queryClause}) {
        recordId
      }
    }
    `
  },
  delete(queryClause) {
    return `
    mutation {
      deleteHtmlBlock(${queryClause}) {
        recordId
      }
    }
    `
  }
}