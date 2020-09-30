import { getIn } from 'formik'
import _ from 'lodash'
import { imageUtils } from '../utils'
import { categoryOfProduct } from '../constants'

export default {
  checkFieldError(errors, touched, fieldName) {
    return !!(getIn(errors, fieldName) && getIn(touched, fieldName))
  },

  getDefaultValueField(data, fieldName, defaultFieldValue) {
    if (!data || (typeof data[fieldName] !== 'boolean' && !data[fieldName])) {
      return defaultFieldValue ? defaultFieldValue : null
    }
    return data[fieldName]
  },

  getImageValueField(data, fieldName, imageType, autoSize) {
    if (!data || !data[fieldName]) {
      return null
    }

    const fileName = _.isArray(data[fieldName])
      ? data[fieldName][0]
      : data[fieldName]
    return {
      uid: null,
      status: 'done',
      filename: fileName,
      url: imageUtils.getImageUrlByFilename({
        fileName: fileName,
        type: imageType,
        autoSize
      })
    }
  },

  getListImageValueField(
    {
      data,
      fieldName,
      imageType,
      fileNameField = null
    }) {
    if (!data || !data[fieldName] || data[fieldName].length === 0) {
      return []
    }

    const dataField = data[fieldName]
    return dataField.map(image => {
      const fileName = fileNameField && image[fileNameField]
        ? image[fileNameField]
        : image
      return {
        id: image._id,
        uid: image._id || Math.random(),
        status: 'done',
        filename: fileName,
        url: imageUtils.getImageUrlByFilename({
          fileName: fileName,
          type: imageType
        }),
        isThumbnail: false
      }
    })
  },

  getObjectValueField(
    {
      rawValue, valueField, labelField
    }) {
    if (rawValue) {
      return {
        ...rawValue,
        key: valueField ? rawValue[valueField] : rawValue._id,
        value: valueField ? rawValue[valueField] : rawValue._id,
        label: labelField ? rawValue[labelField] : rawValue.name
      }
    }
    return null
  },

  getListCategoryValueField(
    {
      data,
      fieldName
    }
  ) {
    if (!data || !data[fieldName]) {
      return []
    }

    return data[fieldName].map(categoryIndex => {
      return {
        key: `${categoryIndex}`,
        value: `${categoryIndex}`,
        label: categoryOfProduct[categoryIndex]
      }
    })
  },

  getListObjectValueField(
    {
      data,
      fieldName,
      labelField,
      valueField
    }
  ) {
    if (!data || !data[fieldName]) {
      return []
    }

    return data[fieldName].map(item => this.getObjectValueField({
      rawValue: item,
      labelField: labelField,
      valueField: valueField
    }))
  },

  preventEnterSubmitForm(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault()
    }
  }
}