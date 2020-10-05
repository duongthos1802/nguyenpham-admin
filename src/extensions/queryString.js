import queryString from 'query-string'
import {DEFAULT_PAGE_INDEX} from '../constants'
import extensions from './index'

export default {
  /**
   * generate query string
   * @param currentData
   * @param originPath
   * @returns {string}
   */
  generateQueryString(currentData, originPath) {
    const searchObject = currentData.toJS()
    extensions.deleteEmptyProps(searchObject)

    const searchQuery = queryString.stringify(searchObject)

    const searchPath = searchQuery === '' ? '' : `?${searchQuery}`
    return `${originPath}${searchPath}`
  },

  /**
   * get page size and page index from query string
   * @param searchObject
   * @param defaultPageSize
   * @returns {{pageIndex: *, pageSize: *, skip: *}}
   */
  getSizeAndIndexPage(searchObject, defaultPageSize) {
    const pageIndex = searchObject && searchObject.pageIndex
      ? searchObject.pageIndex
      : DEFAULT_PAGE_INDEX
    const pageSize =searchObject && searchObject.pageSize
      ? searchObject.pageSize
      : defaultPageSize
    const skip = (pageIndex - 1) * pageSize

    return {
      pageIndex,
      pageSize,
      skip
    }
  },

  getIdParams(props) {
    return props.match.params.id
  }
}