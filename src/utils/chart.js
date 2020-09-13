import _ from 'lodash'

const withSuffix = (number, decimal) => {
  let size = ('' + number).length
  decimal = Math.pow(10, decimal)
  size -= size % 3
  return Math.round(number * decimal / Math.pow(10, size)) / decimal + ' KMGTPE'[size / 3]
}
export default {
  formatNumberChart: (number) => {
    if (_.isNumber(number)) {
      return withSuffix(number, 2)
    }
    return 0
  }
}