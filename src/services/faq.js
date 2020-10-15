// extensions
import { htmlHelper, queryStringHelper, stringHelper } from '../extensions'
import { enumType } from '../constants'

export default {
  initQuerySearchFAQs(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = ''

    if (searchObject.keyword) {
      const keyword = stringHelper.removeEscapeCharacter(searchObject.keyword)
      query += `keyword: "${keyword}"`
    }

    let orderClause = '_ID_DESC'
    if (searchObject.sortField) {
      if (searchObject.sortDirection === 'descend') {
        orderClause = `${searchObject.sortField}_DESC`
      } else {
        orderClause = `${searchObject.sortField}_ASC`
      }
    }

    return {
      whereClause: `filter: {${query}}, limit:${pageSize}, skip: ${skip}, sort: ${orderClause}`,
      whereConnectionClause: `filter: {${query}}`
    }
  },

  initQueryCreateOrUpdateFAQ(values, objectId) {
    let queryClause = ``

    if (objectId) {
      queryClause += `_id: "${objectId}"`
    }

    if (values.title) {
      const title = stringHelper.removeEscapeCharacter(values.title)
      queryClause += `title: "${title}",`
    } else {
      queryClause += ` title: null,`
    }

    if (values.answer) {
      const answer = htmlHelper.encodeContent(values.answer)
      queryClause += `answer: "${answer}",`
    } else {
      queryClause += `answer: null, `
    }

    if (values.description) {
      const description = stringHelper.removeEscapeCharacter(values.description)
      queryClause += `description: "${description}",`
    } else {
      queryClause += ` description: null, `
    }

    if (values.status) {
      queryClause += `status: ${values.status},`
    } else {
      queryClause += `status: null, `
    }

    if (values.priority > 0) {
      queryClause += `priority: ${values.priority},`
    } else {
      queryClause += ` priority: 0, `
    }

    return `record: {${queryClause}}`
  },

  initQueryDeleteFAQ(data) {
    const queryClause = `_id: "${data._id}", status: ${enumType.FAQStatus.Delete}`
    return `record: {${queryClause}}`
  }
}