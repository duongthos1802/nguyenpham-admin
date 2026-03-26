import { queryStringHelper, stringHelper } from '../extensions'

export default {

  initQuerySelectCategoryProduct() {
    return `filter: {status: Published}`
  },

  initQuerySelectGroupBanner(search, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(search, defaultPageSize)

    let queryClause = ``

    if (search.keyword) {
      const keyword = stringHelper.removeEscapeCharacter(search.keyword)
      queryClause += `, keyword: "${keyword}"`
    }

    return {
      whereClause: `filter: {${queryClause}}, limit: ${pageSize}, skip: ${skip}`,
      whereConnectionClause: `filter: {${queryClause}}`
    }
  },

  initQuerySelectResource(keyword, defaultPageSize) {
    let query = ''

    if (keyword) {
      const word = stringHelper.removeEscapeCharacter(keyword)
      query += `keyword: "${word}"`
    }
    const orderClause = '_ID_DESC'

    return `filter: {${query}}, limit: ${defaultPageSize}, sort: ${orderClause}`
  },

  initQuerySelectRecipe(keyword, defaultPageSize) {
    let query = ''

    if (keyword) {
      const word = stringHelper.removeEscapeCharacter(keyword)
      query += `keyword: "${word}"`
    }

    const orderClause = 'date_DESC'

    return `filter: {${query}}, limit: ${defaultPageSize}, sort: ${orderClause}`
  }, 

  initQuerySelectBlog(keyword, defaultPageSize) {
    let query = ''

    if (keyword) {
      const word = stringHelper.removeEscapeCharacter(keyword)
      query += `keyword: "${word}"`
    }

    const orderClause = 'date_DESC'

    return `filter: {${query}}, limit: ${defaultPageSize}, sort: ${orderClause}`
  },

  initQuerySelectBrand(keyword, defaultPageSize) {
    let query = ''

    if (keyword) {
      const word = stringHelper.removeEscapeCharacter(keyword)
      query += `keyword: "${word}"`
    }

    return `filter: {${query}}, limit: ${defaultPageSize}`
  }

}