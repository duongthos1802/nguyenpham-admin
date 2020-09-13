export { default as immutableHelper } from './immutable'
export { default as queryStringHelper } from './queryString.js'
export { default as datetimeHelper } from './datetime'
export { default as stringHelper } from './string'
export { default as htmlHelper } from './html'
export { default as formikHelper } from './formik'
export { default as numberHelper } from './number'
export { default as yupHelper } from './yup'
export { default as productHelper } from './product'
export { default as userHelper } from './user'
export { default as orderHelper } from './order'
export { default as excelHelper } from './excel'

export default {
  deleteEmptyProps(obj) {
    return Object.keys(obj).
      forEach(
        (key) => (obj[key] === null || obj[key] === '') && delete obj[key])
  },

  getDataAndCount(
    {
      data,
      dataField,
      connectionField,
      pageSize,
      pageIndex
    }
  ) {
    let dataGrid = []
    let total = 0
    if (data) {
      if (data[connectionField] > 0) {
        total = data[connectionField]
      }
      if (data[dataField] && data[dataField].length > 0) {
        dataGrid = data[dataField].map((item, index) => {
          if (!item) {
            return null
          }
          const record = item
          if (!item.index) {
            record.index = pageSize && pageIndex ? total - (pageIndex - 1) *
              pageSize - index : index
          }
          return record
        })
      }
    }

    return {
      dataGrid,
      total
    }
  }
}