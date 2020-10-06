import { enumType } from '../constants'
import { queryStringHelper, stringHelper, htmlHelper } from '../extensions'

export default {
  initQuerySearchBlogs(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = ''

    if (searchObject.keyword) {
      const keyword = stringHelper.removeEscapeCharacter(searchObject.keyword)
      query += `keyword: "${keyword}"`
    }

    if (searchObject.status) {
      query += `, status: "${searchObject.status}"`
    }

    let orderClause = 'date_ASC'
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

  initQueryCreateOrUpdateBlogs({ values, blogId }) {
    let queryClause = ``

    if (blogId) {
      queryClause += `_id: "${blogId}"`
    }

    if (values.name) {
      const name = stringHelper.removeEscapeCharacter(values.name)
      queryClause += `, name: "${name}"`

    } else {
      queryClause += `, name: null`
    }

    if (values.slug) {
      const slug = values.slug
      queryClause += `, slug: "${slug}"`
    } else if (values.name) {
      queryClause += `, slug: ${stringHelper.generateSlug(values.name)}`
    } else {
      queryClause += `, slug: null`
    }

    if (values.description) {
      queryClause += `, description: "${values.description}"`
    } else {
      queryClause += `, description: ""`
    }

    if (values.content) {
      const content = htmlHelper.encodeContent(values.content)
      queryClause += `, content: "${content}"`
    } else {
    queryClause += `, content: null`
    }

    if(values.updateBy) {
      queryClause += `, updateBy: "${values.updateBy}"`
    }

    if (values.metaTitle) {
      const metaTitle = htmlHelper.encodeContent(values.metaTitle)
      queryClause += `, metaTitle: "${metaTitle}"`
    } else {
      queryClause += `, metaTitle: null`
    }

    if (values.metaDescription) {
      const metaDescription = htmlHelper.encodeContent(values.metaDescription)
      queryClause += `, metaDescription: "${metaDescription}"`
    } else {
      queryClause += `, metaDescription: null`
    }

    if (values.metaKeyword) {
      const metaKeyword = htmlHelper.encodeContent(values.metaKeyword)
      queryClause += `, metaKeyword: "${metaKeyword}"`
    } else {
      queryClause += `, metaKeyword: null`
    }

    // query upload image
    let BlogsImage = []
    if (values.thumbnail) {
      BlogsImage.push(values.thumbnail)
    }
    if (values.fileUpload && values.fileUpload.length > 0) {
      BlogsImage = BlogsImage.concat(values.fileUpload)
    }
    if (BlogsImage.length > 0) {
      let queryClauseThumbnails = ``
      let queryClausePictures = ``
      queryClause += `, images: [`
      BlogsImage.forEach((item) => {
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

    queryClause += `, status: ${values.status}`
    queryClause += `, index: ${values.index} `

    return `record: {${queryClause}}`
  },

  initQueryDeleteBlog(data) {
    return ` record: {_id: "${data._id}", status: ${enumType.blogStatus.Deleted}}`
  },
}