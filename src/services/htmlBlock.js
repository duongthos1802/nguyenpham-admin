import { htmlHelper, queryStringHelper, stringHelper } from '../extensions'
import { enumType } from '../constants'

export default {
  initQuerySearchHtmlBlock(values, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(values, defaultPageSize)

    let query = ``
    if (values.keyword) {
      const keyword = stringHelper.removeEscapeCharacter(values.keyword)
      query += `, keyword: "${keyword}"`
    }

    let orderClause = `CREATEDAT_DESC`
    if (values.sortField) {
      if (values.sortDirection === enumType.sortDirection.DESC) {
        orderClause = `${values.sortField}_DESC`
      } else {
        orderClause = `${values.sortField}_ASC`
      }
    }

    return {
      whereClause: `filter: {${query}}, limit: ${pageSize}, skip: ${skip}`,//, sort: ${orderClause}`,
      whereConnectionClause: `filter: {${query}}`
    }
  },

  initQueryCreateOrUpdateHtmlBlock(values) {
    let queryClause = ``
    if (values.code) {
      const code = stringHelper.removeEscapeCharacter(values.code)
      queryClause += `, code: "${code}"`
    } else {
      queryClause += `, code: null`
    }

    if (values.content) {
      const content = htmlHelper.encodeContent(values.content)
      queryClause += `, content: "${content}"`
    } else {
      queryClause += `, content: null`
    }

    if (values.id) {
      queryClause += `, _id: "${values.id}"`
    }

    return `record: {${queryClause}}`
  }
}