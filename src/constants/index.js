export { default as validate } from './validate'
export { default as enumType } from './enum'
export { default as queryPath } from './pathQuery'

export { default as query } from './screenWidth'

export const WIDTH_DEFAULT_IMAGE = 500

export const HEIGHT_DEFAULT_IMAGE = 500

export const WIDTH_DEFAULT_AVATAR_IMAGE = 200

export const HEIGHT_DEFAULT_AVATAR_IMAGE = 200

export const WIDTH_DEFAULT_BANNER_IMAGE = 500

export const HEIGHT_DEFAULT_BANNER_IMAGE = 400

export const MIN_WIDTH_IMAGE = 200

export const MIN_PASSWORD_LENGTH = 6

export const DEFAULT_QUANTITY = 1

export const PRODUCT_IMAGE_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/product/pictures/`

export const USER_IMAGE_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/user/pictures/`

export const BANNER_IMAGE_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/banners/pictures/`

export const PING_IMAGE_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/ping/pictures/`

export const CHAT_IMAGE_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/chat/photo/`

export const RESIZE_IMAGE_URL = `${process.env.REACT_APP_API_BASE_URL}/resize`

export const CROP_IMAGE_URL = `${process.env.REACT_APP_API_BASE_URL}/crop`

export const UPLOADS_IMAGE_URL = `${process.env.REACT_APP_API_BASE_URL}/uploads`

export const LANGUAGE = 'LANGUAGE'

export const DEFAULT_FORMAT_DATE_TIME = 'DD.MM.YYYY HH:mm'

export const DEFAULT_FORMAT_DATE = 'DD.MM.YYYY'

export const DEFAULT_FORMAT_DATE_EN = 'MM.DD.YYYY'

export const DEFAULT_FORMAT_DATE_SGN = 'DD/MM/YY hh:mm a'

export const formatDateTimeStamp = 'DD/MM/YYYY HH:mm:ss'

export const DEFAULT_FORMAT_SHORT_DATE = 'MM/DD/YYYY'

export const DEFAULT_ISO_FORMAT_DATE = 'YYYY-MM-DD'

export const DEFAULT_FORMAT_HOURS = 'HH:mm a'

export const DEFAULT_FORMAT_UTC_DATE_TIME = 'MM/DD/YYYY HH:mm a'

export const DEFAULT_PAGE_SIZE = 10

export const DEFAULT_PAGE_INDEX = 1

export const DEFAULT_IMAGE_PRODUCT = require('../img/default-images.png')

export const DEFAULT_IMAGE_BG_PROFILE = require('../img/bg-profile.jpg')

export const DEFAULT_TEXT_EMPTY = `Not specified`

export const DEFAULT_USER_STATUS = 'Normal'

export const DEFAULT_MEMBERSHIP_PLAN = 'Personal'

export const DEFAULT_DECIMAL = 2

export const MAX_PRODUCT_IMAGE_UPLOAD = 4

export const DEFAULT_AVATAR_COLOR = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

export const DEFAULT_LIMIT_TOP_PRODUCT = 10

export const DEFAULT_LIMIT_RECENT_LOGIN = 10

export const DEFAULT_DISCOUNT_RANGE = [5, 95]

export const DIRECTION_STEP_HORIZONTAL = 'horizontal'

export const DIRECTION_STEP_VERTICAL = 'vertical'

export const WIDTH_ORDER = 1024

export const stepWait = 'wait'

export const stepProcess = 'process'

export const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
export const FORM_ITEM_CUSTOM = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  }
}

export const FORM_ITEM_ROLE_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 24 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 24 }
  }
}

export const FORM_LAYOUT_ITEM = {
  labelCol: {
    lg: 9,
    xs: 24
  },
  wrapperCol: {
    lg: 15,
    xs: 24
  }

}

export const FORM_TAIL_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20, offset: 4 }
  }
}

export const hostBlackList = []

export const bannerType = [
  {
    label: 'Link to category',
    value: 0,
    key: 0
  },
  {
    label: 'External link',
    value: 1,
    key: 1
  },
  {
    label: 'Product name',
    value: 2,
    key: 2
  },
  {
    label: 'User name',
    value: 3,
    key: 3
  }
]

