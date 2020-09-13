import { imageUtils } from '../utils'
import { DEFAULT_TEXT_EMPTY } from '../constants'

export const isProduct = (product) => {
  return !!product
}

export const getImageProduct = (product) => {
  if (!isProduct(product)) return null
  const imageProduct = product.pictures && product.pictures.length > 0
    ? product.pictures[0]
    : product.picturesThumbnails && product.picturesThumbnails.length > 0
      ? product.picturesThumbnails[0]
      : null
  return imageProduct
    ? imageUtils.getUrlImageProduct(imageProduct)
    : null
}

export const getProductName = (product, defaultName = DEFAULT_TEXT_EMPTY) => {
  if (!isProduct(product)) return defaultName
  return product.name
}

export default {
  isProduct,
  getImageProduct,
  getProductName
}