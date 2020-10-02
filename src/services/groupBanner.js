// extensions
import {
  queryStringHelper,
  stringHelper,
} from '../extensions'
// constant
import { enumType } from '../constants'

export default {
  initQuerySearchBanners(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = ''

    if (searchObject.keyword) {
      query += `name_contains: "${stringHelper.removeEscapeCharacter(
        searchObject.keyword).toLowerCase()}"`
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

  initQueryCreateOrUpdateBannerGroup({ values, objectId }) {
    let queryClause = ``

    if (objectId) {
      queryClause += `_id: "${objectId}"`
    }

    if (values.name) {
      const name = stringHelper.removeEscapeCharacter(values.name)
      queryClause += `, name: "${name}"`
    } else {
      queryClause += `, name: null`
    }

    if (values.description) {
      const description = stringHelper.removeEscapeCharacter(values.description)
      queryClause += `description: "${description}",`
    } else {
      queryClause += `, description: null`
    }

    return `record: {${queryClause}}`
  },

  initQueryUpdateBanner(data) {
    return ` where: {_id: "${data._id}"} data: {published: ${enumType.bannerStatus.Unpublished}}`
  }
}