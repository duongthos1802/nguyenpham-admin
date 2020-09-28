import { queryStringHelper, stringHelper, htmlHelper } from '../extensions'

export default {
  initQuerySearchRecipes(searchObject, defaultPageSize) {
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

  initQueryCreateOrUpdateRecipes({ values, recipeId }) {
    let queryClause = ``

    if (recipeId) {
      queryClause += `_id: "${recipeId}"`
    }

    if (values.name) {
      const name = stringHelper.removeEscapeCharacter(values.name)
      queryClause += `, name: "${name}"`

    } else {
      queryClause += `, name: null`
    }

    if (values.slug) {
      const slug = stringHelper.generateSlug(stringHelper.removeEscapeCharacter(values.slug))
      queryClause += `, slug: "${slug}"`
    } else if (values.name) {
      const name = stringHelper.removeEscapeCharacter(values.name)
      queryClause += `, slug: ${stringHelper.removeEscapeCharacter(name)}`
    } else {
      queryClause += `, slug: null`
    }

    if (values.description) {
      queryClause += `, description: "${values.description}"`
    } else {
      queryClause += `, description: ""`
    }

    if (values.ingredient) {
      const ingredient = htmlHelper.encodeContent(values.ingredient)
      queryClause += `, ingredient: "${ingredient}"`
    } else {
      queryClause += `, ingredient: null`
    }

    if (values.method) {
      const method = htmlHelper.encodeContent(values.method)
      queryClause += `, method: "${method}"`
    } else {
      queryClause += `, method: null`
    }

    // if (values.priority) {
    //   queryClause += `, priority: ${values.priority}`
    // }

    if (values.level) {
      queryClause += `, level: ${values.level}`
    }

    // query upload image
    let recipeImages = []
    if (values.thumbnail) {
      recipeImages.push(values.thumbnail)
    }
    if (values.fileUpload && values.fileUpload.length > 0) {
      recipeImages = recipeImages.concat(values.fileUpload)
    }
    if (recipeImages.length > 0) {
      let queryClauseThumbnails = ``
      let queryClausePictures = ``
      queryClause += `, images: [`
      recipeImages.forEach((item) => {
        if (item.id) {
          queryClause += `"${item.id}", `
        }
        queryClausePictures += `"${item.filename}", `
        queryClauseThumbnails += `"${item.filename}", `
      })
      queryClause += `], `

      queryClause += `, picturesThumbnails: [${queryClauseThumbnails}]`

      queryClause += `, pictures: [${queryClausePictures}]`
    } else {
      queryClause += `, picturesThumbnails: []`
      queryClause += `, pictures: []`
      queryClause += `, images: []`
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