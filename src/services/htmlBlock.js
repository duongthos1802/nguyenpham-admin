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

    if (values.id) {
      queryClause += `, _id: "${values.id}"`
    }

    if (values.code) {
      const code = stringHelper.removeEscapeCharacter(values.code)
      queryClause += `, code: "${code}"`
    } else {
      queryClause += `, code: null`
    }

    if (values.title) {
      const title = stringHelper.removeEscapeCharacter(values.title)
      queryClause += `, title: "${title}"`
    } else {
      queryClause += `, title: null`
    }

    if (values.content) {
      const content = htmlHelper.encodeContent(values.content)
      queryClause += `, content: "${content}"`
    } else {
      queryClause += `, content: null`
    }

    console.log('fileUpload......', values.fileUpload);

    let queryClauseImage = ``
    queryClause += `, files: [`
    if (values.fileUpload) {
      if (values.fileUpload.uid) {
        queryClause += `"${values.fileUpload.uid}", `
      }
      queryClauseImage += `"${values.fileUpload.filename}", `
    }
    if (values.fileUploadImageMobile) {
      if (values.fileUploadImageMobile.uid) {
        queryClause += `"${values.fileUploadImageMobile.uid}", `
      }
      queryClauseImage += `"${values.fileUploadImageMobile.filename}", `
    }
    queryClause += `]`
    queryClause += `, images: [${queryClauseImage}],`
    if (values.fileUpload) {
      queryClause += `image: "${values.fileUpload.filename}",`
    } else {
      queryClause += `image: null,`
    }
    return `record: {${queryClause}}`
  }
}