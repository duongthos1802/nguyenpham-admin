// extensions

import {
  queryStringHelper,
  stringHelper
} from '../extensions'
// constant

export default {
  initQuerySearchBanners(searchObject, defaultPageSize, bannerGroupId) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = ''
    if (bannerGroupId) {
      query += `bannerGroup: "${bannerGroupId}"`
    }

    if (searchObject.keyword) {
      const keyword = stringHelper.removeEscapeCharacter(searchObject.keyword)
      query += `, keyword: "${keyword}"`
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

  initQueryCreateOrUpdateBanner({ values, groupId, objectId }) {
    let queryClause = ``

    if (objectId) {
      queryClause += `_id: "${objectId}"`
    }

    if (values.name) {
      const name = stringHelper.removeEscapeCharacter(values.name)
      queryClause += `, name: "${name}"`
    } else {
      queryClause += `. name: null`
    }

    if (groupId) {
      queryClause += `, bannerGroup: "${groupId}"`
    } else {
      queryClause += `, bannerGroup: null`
    }

    if (values.codeEmbed) {
      const codeEmbed = stringHelper.removeEscapeCharacter(values.codeEmbed)
      queryClause += `, codeEmbed: "${codeEmbed}",`
    } else {
      queryClause += `, codeEmbed: null ,`
    }

    if (values.description) {
      const description = stringHelper.removeEscapeCharacter(values.description)
      queryClause += `description: "${description}",`
    } else {
      queryClause += `description: null,`
    }

    if (values.url) {
      const url = stringHelper.removeEscapeCharacter(values.url)
      queryClause += `url: "${url}",`
    } else {
      queryClause += `url: null, `
    }

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
    if (values.fileUploadImageMobile) {
      queryClause += `imageMobile: "${values.fileUploadImageMobile.filename}"`
    } else {
      queryClause += `imageMobile: null,`
    }

    // if (values.fileUpload) {
    //   let queryClauseImage = ``
    //   queryClause += `, files: [`
    //   if (values.fileUpload.uid) {
    //     queryClause += `"${values.fileUpload.uid}", `
    //   }
    //   queryClauseImage += `"${values.fileUpload.filename}", `
    //   queryClause += `]`

    //   queryClause += `, images: [${queryClauseImage}],`
    //   queryClause += `image: "${values.fileUpload.filename}"`
    // } else {
    //   queryClause += `, files: []`
    //   queryClause += `, images: []`
    //   queryClause += `, image: null, `
    // }

    // if (values.fileUpload && values.fileUpload.length > 0) {
    //   let queryClauseImage = ``
    //   queryClause += `, files: {`
    //   queryClause += `connect: [`
    //   values.fileUpload.forEach((item) => {
    //     if (item.uid) {
    //       queryClause += `{ _id: "${item.uid}" }, `
    //     }
    //     queryClauseImage += `"${item.filename}", `
    //   })
    //   queryClause += `], `

    //   if (removeImages.length > 0) {
    //     queryClause += `, disconnect: [`
    //     removeImages.forEach(image => {
    //       if (image.uid) {
    //         queryClause += `{_id: "${image.uid}"}`
    //       }
    //     })
    //     queryClause += `]`
    //   }

    //   queryClause += `}`

    //   queryClause += `, images: {`
    //   queryClause += ` set: [${queryClauseImage}]`
    //   queryClause += `},`
    // } else {
    //   queryClause += `, images: {set: []}`
    // }

    // if (values.fileUpload) {
    //   queryClause += `image: "${values.fileUpload.url}",`
    // }

    queryClause += `published: ${!!values.published}`

    return `record: {${queryClause}}`
  },

  initQueryUpdateBanner(data) {
    const queryClause = `published: false, _id: "${data._id}"`
    return `record: {${queryClause}}`
  }
}