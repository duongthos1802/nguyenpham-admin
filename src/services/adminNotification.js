// extensions
import { datetimeHelper, queryStringHelper, stringHelper } from '../extensions'
// constant
import { enumType } from '../constants'

export default {
  initQuerySearchNotifications(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = ''

    if (searchObject.keyword) {
      query += `text_contains: "${stringHelper.removeEscapeCharacter(searchObject.keyword)}"`
    }

    let orderClause = '_id_DESC'
    if (searchObject.sortField) {
      if (searchObject.sortDirection === 'descend') {
        orderClause = `${searchObject.sortField}_DESC`
      } else {
        orderClause = `${searchObject.sortField}_ASC`
      }
    }

    return {
      whereClause: `where: {${query}},first :${pageSize}, skip: ${skip}, orderBy: ${orderClause}`,
      whereConnectionClause: `where: {${query}}, first: ${pageSize}`
    }
  },
}