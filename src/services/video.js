import { enumType } from '../constants'
import { queryStringHelper, stringHelper, htmlHelper } from '../extensions'

const getIdByUrl = (url) => {
  if (!url) return null
  const arrayStringUrl = url.split('/')
  const id = arrayStringUrl.slice(arrayStringUrl.length - 1, arrayStringUrl.length)
  return id
}

export default {
  initQuerySearchVideos(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = ''

    if (searchObject.keyword) {
      const keyword = stringHelper.removeEscapeCharacter(searchObject.keyword)
      query += `keyword: "${keyword}"`
    }

    if (searchObject.category) {
      query += `, category: "${searchObject.category}"`
    }

    if (searchObject.status) {
      query += `, status: "${searchObject.status}"`
    }

    let orderClause = 'date_DESC'
    if (searchObject.sortField) {
      if (searchObject.sortDirection === enumType.sortDirection.DESC) {
        orderClause = `${searchObject.sortField}_DESC`
      } else {
        orderClause = `${searchObject.sortField}_ASC`
      }
    }

    return {
      whereClause: `where: {${query}}, first :${pageSize}, skip: ${skip}, sortBy: "${orderClause}"`
    }
  },

  initQueryCreateOrUpdateVideos({ values, videoId }) {
    let queryClause = ``

    if (videoId) {
      queryClause += `_id: "${videoId}"`
    }

    if (values.url) {
      const idVideo = getIdByUrl(values.url)
      queryClause += `, url: "${values.url}"`
      queryClause += `, idUrl: "${idVideo}"`
    } else {
      queryClause += `, url: null`
      queryClause += `, idUrl: ""`
    }

    if (values.category) {
      queryClause += `, category: "${values.category.value}"`
    } else {
      queryClause += `, category: null`
    }

    if (values.title) {
      const title = stringHelper.removeEscapeCharacter(values.title)
      const slug = stringHelper.generateSlug(title)

      queryClause += `, title: "${title}"`
      queryClause += `, slug: "${slug}"`
    } else {
      queryClause += `, title: null`
      queryClause += `, slug: null`
    }

    if (values.content) {
      const content = htmlHelper.encodeContent(values.content)
      queryClause += `, content: "${content}"`
    } else {
      queryClause += `, content: null`
    }

    let videoImages = []
    if (values.fileUpload && values.fileUpload.length > 0) {
      videoImages = videoImages.concat(values.fileUpload)
    }
    if (videoImages.length > 0) {
      let queryClausePictures = ``
      queryClause += `, images: [`
      videoImages.forEach((item) => {
        if (item.id) {
          queryClause += `"${item.id}", `
        }
        queryClausePictures += `"${item.filename}", `
      })
      queryClause += `], `


      queryClause += `, pictures: [${queryClausePictures}]`
    } else {
      queryClause += `, pictures: []`
      queryClause += `, images: []`
    }


    queryClause += `, status: ${values.status}`

    return `record: {${queryClause}}`
  },

  initQueryDeleteVideo(data) {
    return ` record: {_id: "${data._id}", status: ${enumType.videoStatus.Deleted}}`
  },
}