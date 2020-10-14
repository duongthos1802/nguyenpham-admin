import _ from 'lodash'
import numberExtensions from '../extensions/number'

export default {
  formatObjectSelect: (rawValue, valueField, labelField) => {
    if (rawValue) {
      return {
        ...rawValue,
        key: valueField ? rawValue[valueField] : rawValue.id,
        value: valueField ? rawValue[valueField] : rawValue.id,
        label: labelField ? rawValue[labelField] : rawValue.name
      }
    }
    return null
  },

  getValueOption(data, originValue) {
    if (data && data.length > 0) {
      if (_.isArray(originValue)) {
        let optionSelected = originValue.map((item,index) => {
          if (item._id) {
            return {
              ...item,
              value: item._id,
              label: item.name,
              key: item._id,
              option: item.option
            }
          } else if (item.value) {
            return {
              ...item,
              value: item.value.toString(),
              label: item.label,
              key: item.value,
              option: item.option
            }
          } else if (item.key) {
            return {
              ...item,
              value: item.key,
              label: item.label,
              option: item.option
            }
          } else {
            const value = _.find(data, (x) => x.value === item)
            if (value) {
              return {
                ...value,
                key: value.value
              }
            }
            return null
          }
        })
        optionSelected = _.compact(optionSelected)
        optionSelected = _.filter(optionSelected, (item) => item.value)
        return optionSelected
      }
      if (_.isObject(originValue)) {
        let valueOption = originValue
        if (originValue._id) {
          valueOption = originValue._id
        } else if (originValue.value) {
          valueOption = originValue.value
        } else if (originValue.key) {
          valueOption = originValue.key
        }

        let optionSelected = _.find(
          data,
          (item) => item.value === valueOption || item._id === valueOption
        )
        if (optionSelected) {
          optionSelected = {
            ...originValue,
            ...optionSelected
          }
        }
        return optionSelected
      }
      if (_.isString(originValue)) {
        let optionSelected = _.find(
          data,
          (item) => item.value === originValue || item.code === originValue
        )
        if (optionSelected) {
          return {
            ...optionSelected,
            key: originValue
          }
        }
        //return _.find(data, (item) => item.value === originValue || item.code === originValue)
      }
    }
    // if (originValue) {
    //   return originValue
    // }
    return undefined
  },

  getCountAndDataGrid(
    resultQuery, connectionField, dataGridField, pageSize, pageIndex) {
    let countConnection = 0
    let dataGrid = []

    if (resultQuery) {
      if (resultQuery[connectionField] &&
        resultQuery[connectionField].aggregate) {
        if (resultQuery[connectionField].aggregate.count > 0) {
          countConnection = resultQuery[connectionField].aggregate.count
        }
      }

      if (resultQuery[dataGridField] && resultQuery[dataGridField].length > 0) {
        dataGrid = resultQuery[dataGridField].map((item, index) => ({
          ...item,
          index: pageSize && pageIndex ? countConnection - (pageIndex - 1) *
            pageSize - index : index
        }))
      }
    }

    return {
      countConnection: countConnection,
      dataGrid: dataGrid
    }
  },

  getCountAndDataGridItems(result, dataGridField, pageSize, pageIndex) {
    let countConnection = 0
    let dataGrid = []
    if (result) {
      const resultData = result[dataGridField]
      if (resultData) {
        if (resultData.total && resultData.total > 0) {
          countConnection = resultData.total
        }
        if (resultData.items && resultData.items.length > 0) {
          dataGrid = resultData.items.map((item, index) => {
            return {
              ...item,
              number: item.index || null,
              index: pageSize && pageIndex 
                ? numberExtensions.formatNumberToIndex(
                  countConnection - (pageIndex - 1) * pageSize - index 
                )
                : index + 1
            }
          })
        }
      }
    }

    return {
      countConnection: countConnection,
      dataGrid: dataGrid
    }
  },

  initValueToOption(optionSelected, listOptions) {
    if (optionSelected) {
      if (_.isArray(optionSelected)) {
        optionSelected.forEach(option => {
          const index = listOptions.findIndex(
            item => (item.value === option.value) ||
              (item.key === option.value))
          if (index < 0) {
            // listOptions.push(option)
          }
        })
      } else if (_.isObject(optionSelected)) {
        const index = listOptions.findIndex(
          item => item.value === optionSelected.value || item.key ===
            optionSelected.key)
        if (index < 0) {
          listOptions.push(optionSelected)
        }
      }
    }

    return listOptions
  },

  getReporterName(reporter, fullName) {
    if (!reporter) {
      return fullName
    }
    return reporter.username
      ? reporter.username
      : null
  }
}