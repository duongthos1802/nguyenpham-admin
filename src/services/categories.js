import { queryStringHelper, stringHelper } from '../extensions'

export default {
  initQuerySearchCategories(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = ''

    if (searchObject.keyword) {
      const keyword = stringHelper.removeEscapeCharacter(searchObject.keyword)
      query += `keyword: "${keyword}"`
    }

    // let orderClause = 'priority_ASC'
    // if (searchObject.sortField) {
    //   if (searchObject.sortDirection === 'descend') {
    //     orderClause = `${searchObject.sortField}_DESC`
    //   } else {
    //     orderClause = `${searchObject.sortField}_ASC`
    //   }
    // }

    return {
      whereClause: `filter: {${query}}, limit :${pageSize}, skip: ${skip}`,
      whereConnectionClause: `filter: {${query}}`
    }
  },

  initQueryCreateOrUpdateCategory({ values, categoryId }) {
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

    if (values.metaTitle) {
      const metaTitle = stringHelper.removeEscapeCharacter(values.metaTitle)
      queryClause += `, metaTitle: "${metaTitle}"`
    } else {
      queryClause += `, metaTitle: null`
    }

    if (values.metaDescription) {
      const metaDescription = stringHelper.removeEscapeCharacter(
        values.metaDescription)
      queryClause += `, metaDescription: "${metaDescription}"`
    } else {
      queryClause += `, metaDescription: null`
    }

    if (values.metaKeyword) {
      const metaKeyword = stringHelper.removeEscapeCharacter(values.metaKeyword)
      queryClause += `, metaKeyword: "${metaKeyword}"`
    } else {
      queryClause += `, metaKeyword: null`
    }

    if (values.image) {
      if (values.image.filename) {
        queryClause += `, image: "${values.image.filename}"`
      }
      if (values.image.uid) {
        queryClause += `, imageFile: "${values.image.uid}"`
      }
    } else {
      queryClause += `, image: null`
      queryClause += `, imageFile: null`
    }

    // banner
    if (values.banner) {
      if (values.banner.filename) {
        queryClause += `, banner: "${values.banner.filename}"`
      }
    } else {
      queryClause += `, banner: null`
    }

    queryClause += `, status: ${values.status}`
    queryClause += `, index: ${values.index}`
    return `record: {${queryClause}}`
  }
}