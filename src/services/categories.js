import { enumType } from '../constants'
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

    if (values.categoryParent) {
      queryClause += `, parentId: "${values.categoryParent.value}"`
    } else {
      queryClause += `, parentId: null`
    }

    if(values.option) {
      queryClause += `, option: ${values.option}`
    } else if(values.categoryParent.option) {
      queryClause += `, option: ${values.categoryParent.option}`
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

    queryClause += `, status: ${values.status} `
    queryClause += `, index: ${values.index} `
    return `record: { ${queryClause} } `
  },

  initQueryDeleteCategory(data) {
    return ` record: {_id: "${data._id}", status: ${enumType.categoryStatus.SUSPENDED}}`
  },

  initQuerySearchCategoryByOption(option) {
    switch (option) {
      case enumType.optionsCategory.PRODUCT:
        return {
          whereClause: `where: {option: "${option}"}`
        }
      case enumType.optionsCategory.RECIPE:
        return {
          whereClause: `where: {option: "${option}"}`
        }
      case enumType.optionsCategory.BLOG:
        return {
          whereClause: `where: {option: "${option}"}`
        }
      case enumType.optionsCategory.VIDEO:
        return {
          whereClause: `where: {option: "${option}"}`
        }
      case enumType.optionsCategory.SERVICE:
        return {
          whereClause: `where: {option: "${option}"}`
        }
      default:
        return {
          whereClause: `where: {}`
        }
    }
  }
}