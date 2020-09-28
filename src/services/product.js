import { queryStringHelper, stringHelper } from '../extensions'

export default {
  initQuerySearchProduct(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = ''

    if (searchObject.keyword) {
      const keyword = stringHelper.removeEscapeCharacter(searchObject.keyword)
      query += `keyword: "${keyword}"`
    }

    return {
      whereClause: `filter: {${query}}, limit :${pageSize}, skip: ${skip}`,
      whereConnectionClause: `filter: {${query}}`
    }
  },


  initQueryCreateOrUpdateProduct({ values, categoryId }) {
    let queryClause = ``

    if (categoryId) {
      queryClause += `_id: "${categoryId}"`
    }

    if (values.name) {
      const name = stringHelper.removeEscapeCharacter(values.name)
      const slug = stringHelper.generateSlug(name)
      queryClause += `, name: "${name}"`
      queryClause += `, slug: "${slug}"`

    } else {
      queryClause += `, name: null`
      queryClause += `, slug: null`
    }


    if (values.description) {
      queryClause += `, description: "${values.description}"`
    } else {
      queryClause += `, description: ""`
    }

    if (values.image) {
      if (values.image.filename) {
        queryClause += `, image: "${values.image.filename}"`
      }
      if (values.image.uid) {
        queryClause += `, imageFile: "${values.image.uid}"`
      }
    } else {
      queryClause += `, images: null`
      // queryClause += `, imageFile: null`
    }

    // banner
    // if (values.banner) {
    //   if (values.banner.filename) {
    //     queryClause += `, banner: "${values.banner.filename}"`
    //   }
    // } else {
    //   queryClause += `, banner: null`
    // }

    queryClause += `, status: ${values.status}`
    return `record: {${queryClause}}`
  }
}