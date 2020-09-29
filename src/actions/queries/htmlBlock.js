export default {
  loadDataPager(queryClause) {
    return `
    query {
      htmlBlocks(${queryClause.whereClause}) {
        _id
        code
        content
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
        code
        content
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