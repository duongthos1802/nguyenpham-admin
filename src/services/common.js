// lib
import _ from 'lodash'
// extensions
import {datetimeHelper, htmlHelper, queryStringHelper, stringHelper} from '../extensions'
// constant
import {enumType} from '../constants'
import utils from '../utils'

const getDataCategory = (newAdInfo, oldAdInfo) => {
  const newDataCategory =
    newAdInfo.category && newAdInfo.category.length > 0 ? newAdInfo.category : []
  const oldDataCategory =
    oldAdInfo &&
    oldAdInfo.advertisementDetailCategories &&
    oldAdInfo.advertisementDetailCategories.length > 0
      ? oldAdInfo.advertisementDetailCategories.map(item => ({
        relationId: item.id,
        categoryId: item.categoryId
      }))
      : []

  const unChangeCategory = _.intersectionWith(
    oldDataCategory,
    newDataCategory,
    (arrVal, othVal) => arrVal.categoryId === othVal
  )
  const createCategory = _.differenceWith(
    newDataCategory,
    unChangeCategory,
    (arrVal, othVal) => arrVal === othVal.categoryId
  )
  const removeCategory = _.differenceWith(
    oldDataCategory,
    unChangeCategory,
    (arrVal, othVal) => arrVal.categoryId === othVal.categoryId
  )

  return {
    createCategory,
    removeCategory
  }
}

const formatContentDetail = (listContentDetail, type) => {
  if (listContentDetail && listContentDetail.length > 0) {
    const listContentByType = listContentDetail
      .filter(item => item.type === type)

    return listContentByType.map((content, index) => ({
      id: content.id,
      image: content.image
        ? content.image
        : content.filePath
          ? {
            uid: content.fileId,
            url: content.filePath,
            status: 'done'
          }
          : null
      ,
      link: content.link,
      type: type,
      sortOrder: content.sortOrder ? content.sortOrder : index + 1
    }))
  }
  return []
}

const initFieldAdvertisement = (type, position) => {
  return {
    type: true,
    startDate: true,
    endDate: true,
    position: true,
    contractId: true,
    title: true,
    link: position !== enumType.adPosition.Comment,
    image: position !== enumType.adPosition.Comment,
    place: position !== enumType.adPosition.Comment,
    sale: type === enumType.adType.Sponsored,
    content: type === enumType.adType.Event || position === enumType.adPosition.Comment,
    category: position === enumType.adPosition.Comment || position === enumType.adPosition.CommunityDetail,
    frontAccountId: position === enumType.adPosition.Comment
  }
}

const getUpdateContentDetail = (rawOldData, rawNewData, type) => {

  const oldData = formatContentDetail(rawOldData, type)

  const newData = formatContentDetail(rawNewData, type)

  const unChangeData = _.intersectionWith(oldData, newData, _.isEqual)

  const changeData = _.differenceWith(newData, unChangeData, _.isEqual)

  const updateDataInfo = changeData.filter(item => item.id)

  const createDataInfo = changeData.filter(item => !item.id)

  const removeDataInfo = _.differenceBy(oldData, newData, 'id')

  return {
    updateDataInfo,
    createDataInfo,
    removeDataInfo
  }

}

const getDataContent = (oldDetailContent, data) => {

  const pcContent = getUpdateContentDetail(oldDetailContent, data.pcContent, enumType.popupDetailType.PC)

  const mobileContent = getUpdateContentDetail(oldDetailContent, data.mobileContent, enumType.popupDetailType.Mobile)

  const createDetail = pcContent.createDataInfo.concat(mobileContent.createDataInfo)

  const updateDetail = pcContent.updateDataInfo.concat(mobileContent.updateDataInfo)

  const deleteDetail = pcContent.removeDataInfo.concat(mobileContent.removeDataInfo)

  return {
    createDetail,
    updateDetail,
    deleteDetail
  }
}

export default {
  initQueryAdvertisement(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = `isDeleted: false`

    if (searchObject.keyword) {
      query += `, name: {like: "%${stringHelper.removeEscapeCharacter(searchObject.keyword)}%"}`
    }

    if (searchObject.type) {
      query += `, advertisementId: "${searchObject.type}"`
    }

    switch (searchObject.status) {
      case enumType.adStatus.Published:
        query += `, and: [`
        query += `{ startDate: { lte: "${datetimeHelper.initNewVnDateTime(null, false)}" } }`
        query += `{ endDate: { gte: "${datetimeHelper.initNewVnDateTime(null, false)}" } }`
        query += `]`
        break
      case  enumType.adStatus.Waiting:
        query += `, startDate: { gte: "${datetimeHelper.initNewVnDateTime(null, false)}" }`
        break
      case enumType.adStatus.Ended:
        query += `, endDate: { gte: "${datetimeHelper.initNewVnDateTime(null, false)}" }`
        break
      default:
        break
    }

    const orderClause = 'reverse:createdAt'

    return {
      whereClause: `where: {${query}}, limit: ${pageSize}, offset: ${skip}, order: "${orderClause}"`,
      whereConnectionClause: `where: {${query}}, first: ${pageSize}`
    }
  },

  initQueryDeleteAd(ad, userId) {
    let query = `isDeleted: true, deletedAt: "${datetimeHelper.initNewVnDateTime(null, false)}"`
    if (userId) {
      query += `, deletedBy: "${userId}"`
    }
    return `where: {id: "${ad.id}"}, data: {${query}}`
  },

  initQueryCreateAd(adInfo, userId) {

    const {
      position,
      type,
      category,
      content,
      place,
      endDate,
      startDate,
      image,
      title,
      contractId,
      frontAccountId,
      link,
      sale
    } = initFieldAdvertisement(adInfo.type, adInfo.position)

    let query = `mode: ${enumType.adDetailMode.Native}`

    if (type && adInfo.advertisement) {
      query += `, advertisementId: "${adInfo.advertisement.value}"`
    }

    if (position) {
      if (adInfo.type === enumType.adType.Sponsored) {
        if (adInfo.position) {
          query += `, position: ${adInfo.position}`
        }
      } else {
        query += `, position: ${enumType.adPosition.Trending}`
      }
    }

    if (place) {
      if (adInfo.type === enumType.adType.Sponsored) {
        if (adInfo.place) {
          query += `, place: ${adInfo.place}`
        }
      } else {
        query += `, place: ${enumType.adPlace.EditorPick}`
      }
    }

    if (startDate && adInfo.startDate) {
      query += `, startDate: "${datetimeHelper.initNewVnDateTime(adInfo.startDate, true)}"`
    }

    if (endDate && adInfo.endDate) {
      query += `, endDate: "${datetimeHelper.initNewVnDateTime(adInfo.endDate, true)}"`
    }

    if (userId) {
      query += `, createdBy: "${userId}"`
    }

    if (link) {
      if (adInfo.link) {
        query += `, link: "${stringHelper.removeEscapeCharacter(adInfo.link)}"`
      }

      if (adInfo.postId) {
        query += `, postId: "${adInfo.postId}"`
      }
    }

    if (image && adInfo.image) {
      query += `, fileId: "${adInfo.image.uid}"`
      query += `, fileUrl: "${adInfo.image.url}"`
    }

    if (title && adInfo.title) {
      query += `, name: "${stringHelper.removeEscapeCharacter(adInfo.title)}"`
    }

    if (sale && adInfo.sale) {
      query += `, sale: "${stringHelper.removeEscapeCharacter(adInfo.sale)}"`
    }

    if (contractId && adInfo.contractId) {
      query += `, contractId: "${stringHelper.removeEscapeCharacter(adInfo.contractId)}"`
    }

    if (content && adInfo.content) {
      query += `, content: "${htmlHelper.encodeContent(adInfo.content)}"`
    }

    if (frontAccountId && adInfo.frontendAccount) {
      query += `, accountId: "${adInfo.frontendAccount.value}"`
    }

    if (category && adInfo.category && adInfo.category.length > 0) {
      query += `, category: [`
      adInfo.category.forEach(categoryId => {
        query += `"${categoryId}",`
      })
      query += `]`
    }

    return `data: {${query}}`
  },

  initQueryUpdateAd(adInfo, oldAdInfo, adId, userId) {

    const {
      position,
      type,
      category,
      content,
      place,
      endDate,
      startDate,
      image,
      title,
      contractId,
      frontAccountId,
      link,
      sale
    } = initFieldAdvertisement(adInfo.type, adInfo.position)

    let query = ``

    if (type && adInfo.advertisement) {
      query += `, advertisementId: "${adInfo.advertisement.value}"`
    } else {
      query += `, advertisementId: null`
    }

    if (position) {
      if (adInfo.type === enumType.adType.Sponsored) {
        if (adInfo.position) {
          query += `, position: ${adInfo.position}`
        }
      } else {
        query += `, position: ${enumType.adPosition.Trending}`
      }
    } else {
      query += `, position: null`
    }

    if (place) {
      if (adInfo.type === enumType.adType.Sponsored) {
        if (adInfo.place) {
          query += `, place: ${adInfo.place}`
        }
      } else {
        query += `, place: ${enumType.adPlace.EditorPick}`
      }
    } else {
      query += `, place: null`
    }

    if (startDate && adInfo.startDate) {
      query += `, startDate: "${datetimeHelper.initNewVnDateTime(adInfo.startDate, true)}"`
    } else {
      query += `, startDate: null`
    }

    if (endDate && adInfo.endDate) {
      query += `, endDate: "${datetimeHelper.initNewVnDateTime(adInfo.endDate, true)}"`
    } else {
      query += `, endDate: null`
    }

    if (link) {
      if (adInfo.link) {
        query += `, link: "${stringHelper.removeEscapeCharacter(adInfo.link)}"`
      }

      if (adInfo.postId) {
        query += `, postId: "${adInfo.postId}"`
      }
    } else {
      query += `, link: null`
      query += `, postId: null`
    }

    if (image && adInfo.image) {
      query += `, fileId: "${adInfo.image.uid}"`
      query += `, fileUrl: "${adInfo.image.url}"`
    } else {
      query += `, fileId: null`
      query += `, fileUrl: null`
    }

    if (title && adInfo.title) {
      query += `, name: "${stringHelper.removeEscapeCharacter(adInfo.title)}"`
    } else {
      query += `, name: null`
    }

    if (sale && adInfo.sale) {
      query += `, sale: "${stringHelper.removeEscapeCharacter(adInfo.sale)}"`
    } else {
      query += `, sale: null`
    }

    if (contractId && adInfo.contractId) {
      query += `, contractId: "${stringHelper.removeEscapeCharacter(adInfo.contractId)}"`
    } else {
      query += `, contractId: null`
    }

    if (content && adInfo.content) {
      query += `, content: "${htmlHelper.encodeContent(adInfo.content)}"`
    } else {
      query += `, content: null`
    }

    if (frontAccountId && adInfo.frontendAccount) {
      query += `, accountId: "${adInfo.frontendAccount.value}"`
    } else {
      query += `, accountId: null`
    }

    if (category && adInfo.category && adInfo.category.length > 0) {
      const {createCategory, removeCategory} = getDataCategory(adInfo, oldAdInfo)

      if (createCategory.length > 0 || removeCategory.length > 0) {
        query += `, category: {`

        if (createCategory.length > 0) {
          query += ` create: [`
          createCategory.forEach(categoryId => {
            query += `, {`
            query += `data: {`
            query += `advertisementDetailId: "${adId}"`
            query += `, categoryId: "${categoryId}"`
            query += `}`
            query += `}`
          })
          query += `]`
        }

        if (removeCategory.length > 0) {
          query += `, remove: [`
          removeCategory.forEach(relation => {
            query += `{where: {id: "${relation.relationId}"}}`
          })
          query += `]`
        }
        query += `}`
      } else {
        query += `, category: []`
      }
    } else {
      query += `, category: null`
    }

    if (userId) {
      query += `, updatedBy: "${userId}"`
    }

    return `data: {${query}}, where: {id: "${adId}"}`
  },

  initQuerySearchWorkflow(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    const query = ''

    const orderClause = 'sortOrder'

    return {
      whereClause: `where: {${query}}, limit: ${pageSize}, offset: ${skip}, order: "${orderClause}"`,
      whereConnectionClause: `where: {${query}}, first: ${pageSize}`
    }
  },

  initQueryCreateWorkflow(workflow) {
    let query = ``

    if (workflow.fromGroupId) {
      query += `, fromGroupId: "${workflow.fromGroupId}"`
    }

    if (workflow.toGroupId) {
      query += `, toGroupId: "${workflow.toGroupId}"`
    }

    if (workflow.sortOrder) {
      query += `, sortOrder: ${workflow.sortOrder}`
    }

    return `data: {${query}}`
  },

  initQueryUpdateWorkflow(workflow, workflowId) {
    let query = ``

    if (workflow.fromGroupId) {
      query += `, fromGroupId: "${workflow.fromGroupId}"`
    }

    if (workflow.toGroupId) {
      query += `, toGroupId: "${workflow.toGroupId}"`
    }

    if (workflow.sortOrder) {
      query += `, sortOrder: ${workflow.sortOrder}`
    }

    return `data: {${query}}, where: {id: "${workflowId}"}`
  },

  initQuerySearchContentGroup(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = `isDeleted: false`
    if (searchObject.keyword) {
      const searchWord = stringHelper.removeEscapeCharacter(searchObject.keyword)
      query += `, or: [`
      query += `{name: {like: "%${searchWord}%"}}, `
      query += `{code: {like: "%${searchWord}%"}}`
      query += `]`
    }

    const orderClause = 'reverse:createdAt'

    return {
      whereClause: `where: {${query}}, limit: ${pageSize}, offset: ${skip}, order: "${orderClause}"`,
      whereConnectionClause: `where: {${query}}, first: ${pageSize}`
    }
  },

  initQueryCreateContentGroup(contentGroup) {
    let query = 'isDeleted: false'
    if (contentGroup.name) {
      query += `, name: "${stringHelper.removeEscapeCharacter(contentGroup.name)}"`
    }
    if (contentGroup.code) {
      query += `, code: "${stringHelper.removeEscapeCharacter(contentGroup.code)}"`
    }
    if (contentGroup.description) {
      query += `, description: "${stringHelper.removeEscapeCharacter(contentGroup.description)}"`
    }

    return `data: {${query}}`
  },

  initQueryUpdateContentGroup(contentGroup, contentGroupId) {
    let query = ''
    if (contentGroup.name) {
      query += `, name: "${stringHelper.removeEscapeCharacter(contentGroup.name)}"`
    }
    if (contentGroup.code) {
      query += `, code: "${stringHelper.removeEscapeCharacter(contentGroup.code)}"`
    }
    if (contentGroup.description) {
      query += `, description: "${stringHelper.removeEscapeCharacter(contentGroup.description)}"`
    } else {
      query += `, description: null`
    }

    return `data: {${query}}, where: {id: "${contentGroupId}"}`
  },

  initQuerySearchContentGroupCategory(searchObject, defaultPageSize, contentGroupId) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)
    let query = `contentGroupId: "${contentGroupId}"`
    if (searchObject.keyword) {
    }

    const orderClause = `reverse:createdAt`

    return {
      whereClause: `where: {${query}}, limit: ${pageSize}, offset: ${skip}, order: "${orderClause}"`,
      whereConnectionClause: `where: {${query}}, first: ${pageSize}`
    }
  },

  initQuerySearchBannedWord(searchObject, defaultPageSize, bannedType) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    const startDate = datetimeHelper.formatStartOfDay(
      datetimeHelper.initNewVnDate(
        searchObject.startDate,
        null,
        true),
      true)

    const endDate = datetimeHelper.formatEndOfDay(
      datetimeHelper.initNewVnDate(
        searchObject.endDate,
        null,
        true),
      true)

    let query = `type: ${bannedType}`

    if (searchObject.keyword) {
      const searchWord = stringHelper.removeEscapeCharacter(searchObject.keyword)
      query += `, word: {like: "%${searchWord}%"}`
    }

    if (startDate && endDate) {
      query += `, createdAt: {`
      query += ` between: ["${startDate}", "${endDate}"]`
      query += `}`
    } else {
      if (startDate && !endDate) {
        query += `, createdAt: { gte: "${startDate}" }`
      }
      if (!startDate && endDate) {
        query += `, createdAt: {lte: "${endDate}"}`
      }
    }

    if (searchObject.addBy) {
      query += `, createdBy: "${searchObject.addBy}"`
    }

    let orderClause = `reverse:createdAt`
    if (searchObject.sortField) {
      if (searchObject.sortDirection === 'descend') {
        orderClause = `reverse:${searchObject.sortField}`
      } else {
        orderClause = searchObject.sortField
      }
    }

    return {
      whereClause: `where: {${query}}, limit: ${pageSize}, offset: ${skip}, order: "${orderClause}"`,
      whereConnectionClause: `where: {${query}}, first: ${pageSize}`
    }
  },

  initQueryCreateBannedWord(data, userId) {
    let query = ''
    if (data.type) {
      query += `type: ${data.type}`
    }
    if (userId) {
      query += `, createdBy: "${userId}"`
    }
    if (data.word) {
      query += `, newWord: "${stringHelper.removeEscapeCharacter(data.word)}"`
    }
    if (data.dataUpload && data.dataUpload.length > 0) {
      const validData = data.dataUpload.filter(item => item.length > 1)
      if (validData.length > 0) {
        query += `, excelWords: [`
        validData.forEach(item => {
          if (item[1]) {
            query += `, "${stringHelper.removeEscapeCharacter(item[1].toString())}"`
          }
        })
        query += `]`

      }
    }
    return `data: {${query}}`
  },

  initQuerySearchAnnouncement(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = ``

    if (searchObject.keyword) {
      query += `, title: "${stringHelper.removeEscapeCharacter(searchObject.keyword)}"`
    }
    if (searchObject.category) {
      query += `, category: ["${searchObject.category}"]`
    }

    return `where: {${query}}, limit: ${pageSize}, offset: ${skip}, order: "createdAt DESC"`
  },

  initQueryCreateAnnouncement(data, userId) {
    let query = ''
    if (data.title) {
      query += `, title: "${utils.removeEscapeCharacter(data.title)}"`
    }

    const content = htmlHelper.encodeContent(data.content)

    if (content) {
      query += `, content: "${content}"`
    }

    query += `, applyAllCategories: ${!!data.applyAll}`

    query += `, publishedAt: "${datetimeHelper.initNewVnDateTime(data.publishedAt, false)}"`

    if (userId) {
      query += `, createdBy: "${userId}"`
    }

    let listCategoryIds = data.category && data.category.length > 0
      ? data.category.map(category => `"${category}"`)
      : []

    return `data: {announcement: {${query}}, categoryIds: [${listCategoryIds}]}`
  },

  initQuerySearchContentGroupUser(searchObject, defaultPageSize, contentGroupId) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = `contentGroupId: "${contentGroupId}"`

    const orderClause = `reverse:createdAt`

    return {
      whereClause: `where: {${query}}, limit: ${pageSize}, offset: ${skip}, order: "${orderClause}"`,
      whereConnectionClause: `where: {${query}}, first: ${pageSize}`
    }
  },

  initQuerySearchPopup(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = ``
    query += `, isDeleted: false`

    if (searchObject.keyword) {
      const searchWord = utils.removeEscapeCharacter(searchObject.keyword)
      query += `, title: { like: "%${searchWord}%"}`
    }

    const orderClause = `reverse:createdAt`

    return {
      whereClause: `where: {${query}}, limit: ${pageSize}, offset: ${skip}, order:"${orderClause}"`,
      whereConnectionClause: `where: {${query}}, first: ${pageSize}`
    }
  },

  initQueryCreatePopup(data, userId) {
    let query = ``

    if (data.title) {
      const title = stringHelper.removeEscapeCharacter(data.title)
      query += `, title: "${title}"`
      query += `, code: "${utils.generateSlug(data.title)}"`
    }

    const startDate = datetimeHelper.initNewVnDateTime(data.startDate, true)
    const endDate = datetimeHelper.initNewVnDateTime(data.endDate, true)

    if (startDate) {
      query += `, startDate: "${startDate}"`
    }

    if (endDate) {
      query += `, endDate: "${endDate}"`
    }

    if (userId) {
      query += `, createdBy: "${userId}"`
    }

    const pcContent = formatContentDetail(data.pcContent, enumType.popupDetailType.PC)

    query += `, countPC: ${pcContent.length}`

    const mobileContent = formatContentDetail(data.mobileContent, enumType.popupDetailType.Mobile)

    query += `, countMobile: ${mobileContent.length}`

    const createDetail = pcContent.concat(mobileContent)

    let queryDetail = ``
    if (createDetail && createDetail.length > 0) {

      createDetail.forEach((content) => {
        queryDetail += `{`
        queryDetail += ` type: ${content.type}`
        if (content.image) {
          queryDetail += `, fileId: "${content.image.uid}"`
          queryDetail += `, filePath: "${content.image.url}"`
        }
        if (content.link) {
          queryDetail += `, url: "${content.link}"`
        }

        queryDetail += `, sortOrder: ${content.sortOrder}`

        queryDetail += `}`
      })
    }

    return `data: {${query}}, detail: [${queryDetail}]`
  },

  initQueryUpdateFAQ(data, objectId) {
    let query = `type: ${enumType.internalBoardType.FAQ}`

    if (data.title) {
      query += `, title: "${stringHelper.removeEscapeCharacter(data.title)}"`
    }

    if (data.code) {
      query += `, code: "${stringHelper.removeEscapeCharacter(data.code)}"`
    }

    if (data.body) {
      query += `, body: "${htmlHelper.encodeContent(data.body)}"`
    }

    if (data.classification) {
      query += `, classificationId: "${data.classification.value}"`
    }

    return `data: {${query}}, where: {id: "${objectId}"}`
  },

  initQueryCreateFAQ(data, userId) {
    let query = `type: ${enumType.internalBoardType.FAQ}`

    if (data.title) {
      query += `, title: "${stringHelper.removeEscapeCharacter(data.title)}"`
    }

    if (data.code) {
      query += `, code: "${stringHelper.removeEscapeCharacter(data.code)}"`
    }

    if (data.body) {
      query += `, body: "${htmlHelper.encodeContent(data.body)}"`
    }

    if (data.classification) {
      query += `, classificationId: "${data.classification.value}"`
    }

    if (userId) {
      query += `, createdBy: "${userId}"`
    }

    return `data: {${query}}`
  },

  initQueryUpdateNotice(data, objectId) {
    let query = `type: ${enumType.internalBoardType.Notice}`

    if (data.title) {
      query += `, title: "${stringHelper.removeEscapeCharacter(data.title)}"`
    }

    if (data.code) {
      query += `, code: "${stringHelper.removeEscapeCharacter(data.code)}"`
    }

    if (data.body) {
      query += `, body: "${htmlHelper.encodeContent(data.body)}"`
    }

    if (data.publishNow) {
      query += `, startDate: "${datetimeHelper.initNewVnDateTime(null, false)}"`
    } else {
      query += `, startDate: "${datetimeHelper.initNewVnDateTime(data.publishedAt, false)}"`
    }

    return `data: {${query}}, where: {id: "${objectId}"}`
  },

  initQueryCreateNotice(data, userId) {
    let query = `type: ${enumType.internalBoardType.Notice}`

    if (data.title) {
      query += `, title: "${stringHelper.removeEscapeCharacter(data.title)}"`
    }

    if (data.code) {
      query += `, code: "${stringHelper.removeEscapeCharacter(data.code)}"`
    }

    if (data.body) {
      query += `, body: "${htmlHelper.encodeContent(data.body)}"`
    }

    if (data.publishNow) {
      query += `, startDate: "${datetimeHelper.initNewVnDateTime(null, false)}"`
    } else {
      query += `, startDate: "${datetimeHelper.initNewVnDateTime(data.publishedAt, false)}"`
    }

    if (userId) {
      query += `, createdBy: "${userId}"`
    }

    return `data: {${query}}`
  },

  initQueryUpdatePopup(data, popupId, userId, oldDetailContent) {
    let query = ``

    const title = stringHelper.removeEscapeCharacter(data.title)
    const startDate = datetimeHelper.initNewVnDateTime(data.startDate, false)
    const endDate = datetimeHelper.initNewVnDateTime(data.endDate, false)

    if (title) {
      query += `, title: "${title}"`
      query += `, code: "${stringHelper.generateSlug(title)}"`
    }

    if (startDate) {
      query += `, startDate: "${startDate}"`
    }

    if (endDate) {
      query += `, endDate: "${endDate}"`
    }

    if (data.pcContent) {
      query += `, countPC: ${data.pcContent.length}`
    }

    if (data.mobileContent) {
      query += `, countMobile: ${data.mobileContent.length}`
    }

    if (userId) {
      query += `, updatedBy: "${userId}"`
    }

    const {createDetail, deleteDetail, updateDetail} = getDataContent(oldDetailContent, data)

    let queryDetail = ``
    queryDetail += `, create: [`

    if (createDetail && createDetail.length > 0) {

      createDetail.forEach(content => {

        queryDetail += `{`
        queryDetail += ` type: ${content.type}`
        if (content.image) {
          queryDetail += `, fileId: "${content.image.uid}"`
          queryDetail += `, filePath: "${content.image.url}"`
        } else {
          queryDetail += `, fileId: null`
          queryDetail += `, filePath: null`
        }
        if (content.link) {
          queryDetail += `, url: "${content.link}"`
        }

        queryDetail += `, sortOrder: ${content.sortOrder}`

        queryDetail += `}`

      })
    }
    queryDetail += `]`

    queryDetail += `, update: [`
    if (updateDetail && updateDetail.length > 0) {
      updateDetail.forEach(content => {
        queryDetail += `{`
        queryDetail += `, data: {`
        queryDetail += ` type: ${content.type}`
        if (content.image) {
          queryDetail += `, fileId: "${content.image.uid}"`
          queryDetail += `, filePath: "${content.image.url}"`
        } else {
          queryDetail += `, fileId: null`
          queryDetail += `, filePath: null`
        }
        if (content.link) {
          queryDetail += `, url: "${content.link}"`
        }

        queryDetail += `, sortOrder: ${content.sortOrder}`
        queryDetail += `}`
        queryDetail += `, where: {id: "${content.id}"}`
        queryDetail += `}`
      })
    }
    queryDetail += `]`

    queryDetail += `, remove: [`
    if (deleteDetail && deleteDetail.length > 0) {
      deleteDetail.forEach(content => {
        queryDetail += `, "${content.id}"`
      })
    }
    queryDetail += `]`

    return `data: {${query}}, where: {id: "${popupId}"}, detail: {${queryDetail}}`
  },

  initQuerySearchCategory(searchObject, defaultPageSize) {
    const {
      pageSize,
      skip
    } = queryStringHelper.getSizeAndIndexPage(searchObject, defaultPageSize)

    let query = ``
    query += `isDeleted: false`
    if (searchObject.keyword) {
      const searchWord = stringHelper.removeEscapeCharacter(searchObject.keyword)
      query += `, or: [`
      query += `{name: {like: "%${searchWord}%"}},`
      query += `{code: {like: "%${searchWord}%"}}`
      query += `]`
    }

    return {
      whereClause: `where: {${query}}, limit: ${pageSize}, offset: ${skip}, order: "sortOrder"`,
      whereConnectionClause: `where: {${query}}, first: ${pageSize}`
    }
  },

  initQueryCreateOrUpdateCategory(category, objectId) {
    let query = ``
    query += `, isLocked: false`
    query += `, isDeleted: false`

    if (category.name) {
      query += `, name: "${utils.removeEscapeCharacter(category.name)}"`
    } else {
      query += `, name: null`
    }

    if (category.code) {
      query += `, code: "${utils.removeEscapeCharacter(category.code)}"`
    } else {
      query += `, code: null`
    }

    if (category.description) {
      query += `, description: "${utils.removeEscapeCharacter(category.description)}"`
    } else {
      query += `, description: null`
    }

    if (category.color) {
      query += `, color: "${category.color}"`
    } else {
      query += `, color: null`
    }

    if (category.sortOrder) {
      query += `, sortOrder: ${category.sortOrder}`
    } else {
      query += `, sortOrder: null`
    }

    if (objectId) {
      return `data: {${query}}, where: {id: "${objectId}"}`
    }

    return `data: {${query}}`
  }
}