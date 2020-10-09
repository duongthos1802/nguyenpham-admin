import {
  enumType,
  DEFAULT_IMAGE_PRODUCT, DEFAULT_IMAGE_BG_PROFILE,
  HEIGHT_DEFAULT_BANNER_IMAGE,
  WIDTH_DEFAULT_BANNER_IMAGE,
  HEIGHT_DEFAULT_AVATAR_IMAGE,
  HEIGHT_DEFAULT_IMAGE,
  MIN_WIDTH_IMAGE,
  WIDTH_DEFAULT_AVATAR_IMAGE,
  WIDTH_DEFAULT_IMAGE,
  BANNER_IMAGE_BASE_URL,
  UPLOADS_IMAGE_URL
} from '../constants'
import { isUser } from '../extensions/user'
import stringExtensions from '../extensions/string'

const USE_AWS = process.env.REACT_APP_USE_AWS || false

// export const btoa = (str) => {
//   if (Buffer.byteLength(str) !== str.length)
//     throw new Error('bad string!');
//   return Buffer(str, 'binary').toString('base64');
// }

export const checkHttpUrl = (url) => {
  let pattern = /^((http|https|ftp):\/\/)/
  return pattern.test(url)
}

export const isImageType = (fileType, isMenuIcon) =>  {
  if (!isMenuIcon) {
    return fileType === 'image/jpeg' || fileType === 'image/png'
  }
  return fileType === 'image/svg+xml' || fileType === 'image/jpeg' || fileType === 'image/png'
}

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export const getInfoImage = async (image) => {
  //check whether browser fully supports all File API
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    return new Promise((resolve) => {
      const fr = new FileReader
      fr.onload = function () { // file is loaded
        const img = new Image
        img.onload = function () { // image is loaded; sizes are available
          return resolve({
            width: img.width,
            height: img.height
          })
        }
        img.src = fr.result // is the data URL because called with readAsDataURL
      }
      fr.readAsDataURL(image)
    })
  } else {
    return null
  }
}

export const checkImageSize = async (image) => {
  return await getInfoImage(image).then(result => {
    if (!result) return false
    if (!result.width || !result.height) return false
    return (result.width === result.height) && result.width >= MIN_WIDTH_IMAGE
  })
}

export const getImagePathByType = (type) => {
  switch (type) {
    case enumType.uploadType.Product:
      return enumType.imagePath.Product
    case enumType.uploadType.Recipe:
      return enumType.imagePath.Recipe
    case enumType.uploadType.Banner:
      return enumType.imagePath.Banner
    case enumType.uploadType.Html_Block:
      return enumType.imagePath.Html_Block
    case enumType.uploadType.Blog:
      return enumType.imagePath.Blog
    case enumType.uploadType.Video:
      return enumType.imagePath.Video
    default:
      return enumType.imagePath.Product
  }
}

export const getDefaultImage = (path) => {
  switch (path) {
    case enumType.imagePath.Product:
      return {
        width: WIDTH_DEFAULT_IMAGE,
        height: HEIGHT_DEFAULT_IMAGE
      }
    case enumType.imagePath.Recipe:
      return {
        width: WIDTH_DEFAULT_IMAGE,
        height: HEIGHT_DEFAULT_IMAGE
      }
    case enumType.imagePath.Avatar:
      return {
        width: WIDTH_DEFAULT_AVATAR_IMAGE,
        height: HEIGHT_DEFAULT_AVATAR_IMAGE
      }
    case enumType.imagePath.Banner:
      return {
        width: WIDTH_DEFAULT_BANNER_IMAGE,
        height: HEIGHT_DEFAULT_BANNER_IMAGE
      }
    default:
      return {
        width: WIDTH_DEFAULT_IMAGE,
        height: HEIGHT_DEFAULT_IMAGE
      }
  }
}

export const getPreviewImage = (
  {
    imagePath,
    fileName
  }
) => {
  const keyName = `${imagePath}/${fileName}`
  return `${UPLOADS_IMAGE_URL}/${keyName}`
}

export const getImageUrlByFilename = (
  {
    fileName,
    type,
    defaultImage = null,
    autoSize = false
  }) => {
  if (!fileName) return defaultImage
  if (checkHttpUrl(fileName)) return fileName
  return true
    ? getPreviewImage({
      fileName: fileName,
      imagePath: type,
      autoSize
    })
    : `${BANNER_IMAGE_BASE_URL}${fileName}`
}

// lấy link anh của avatar
export const getAvatarUrl = (url) => {
  return getImageUrlByFilename({
    fileName: url,
    type: enumType.imagePath.Avatar
  })
}

export const getAvatarByUser = (user) => {
  if (!isUser(user)) return null
  const userAvatarUrl = user.icon || user.iconThumbnail
  return getAvatarUrl(userAvatarUrl)
}

export const getUrlImageProduct = (url) => {
  return getImageUrlByFilename({
    type: enumType.imagePath.Product,
    fileName: url,
    defaultImage: DEFAULT_IMAGE_PRODUCT
  })
}

//lấy link banner
export const getBannerUrl = (url, type) => {
  return getImageUrlByFilename({
    type: type || enumType.imagePath.Banner,
    defaultImage: DEFAULT_IMAGE_BG_PROFILE,
    fileName: url
  })
}

export default {
  isImageType,
  getAvatarByUser,
  getAvatarUrl,
  getBannerUrl,
  getPreviewImage,
  getUrlImageProduct,
  getImageUrlByFilename
}