import { htmlHelper, queryStringHelper, stringHelper } from '../extensions'
import { enumType } from '../constants'

export default {
  initQuerySearchCustomer(values, defaultPageSize) {
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

  initQueryCreateOrUpdateCustomer(values) {
    let queryClause = ``
    if (values.id) {
      queryClause += `, _id: "${values.id}"`
    }

    if (values.name) {
      const name = stringHelper.removeEscapeCharacter(values.name)
      queryClause += `, name: "${name}"`
    } else {
      queryClause += `, name: null`
    }

    if (values.email) {
      const email = stringHelper.removeEscapeCharacter(values.email)
      queryClause += `, email: "${email}"`
    } else {
      queryClause += `, email: null`
    }

    if (values.phone) {
      const phone = stringHelper.removeEscapeCharacter(values.phone)
      queryClause += `, phone: "${phone}"`
    } else {
      queryClause += `, phone: null`
    }

    if (values.address) {
      const address = stringHelper.removeEscapeCharacter(values.address)
      queryClause += `, address: "${address}"`
    } else {
      queryClause += `, address: null`
    }

    if (values.description) {
      const description = stringHelper.removeEscapeCharacter(values.description)
      queryClause += `, description: "${description}"`
    } else {
      queryClause += `, description: ""`
    }

    queryClause += `, status: ${values.status}`

    return `record: {${queryClause}}`
  },

  initQueryDeleteCustomer(data) {
    const queryClause = `_id: "${data._id}", status: ${enumType.customerStatus.Deleted}`
    return `record: {${queryClause}}`
  }
}