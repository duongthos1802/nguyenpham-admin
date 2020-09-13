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

export const DEFAULT_PAGE_SIZE = 20

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

export const stepWait= 'wait'

export const stepProcess= 'process'

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
    lg: {span: 24}
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: {span: 24}
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

//CATEGORY
export const categoryOfProduct = {
  100: 'Mobile Devices & Tablets',
  200: 'Computer & Accessories',
  300: 'Tools & Equipments',
  400: 'Sports equipments',
  500: 'Wedding Essentials',
  600: 'Clothings',
  700: 'Travel essentials',
  800: 'Toys & hobbies',
  900: 'Books & Comics',
  1000: 'Movies Blu-ray DVD',
  1100: 'Camera & Accessories',
  1200: 'Bicycles and E-scooter',
  1300: 'Home Appliances',
  1400: 'Party & Events',
  1500: 'Board games',
  1600: 'Video games',
  1700: 'Everything Else',
  1800: 'Outdoor Essentials',
  1900: 'Music Related',
  2000: 'Luxury',
  2100: 'Car Accessories',
  2200: 'Costumes',
  2300: 'Furniture & Home Decor',
  2400: 'Parents Kids & Babies'
}

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

export const membership = [
  {
    text: 'Personal',
    value: 'Personal'
  },
  {
    text: 'Premium (15%)',
    value: 'Premium (15%)'
  },
  {
    text: 'Small biz ($99)',
    value: 'Small biz ($99)'
  },
  {
    text: 'Business ($149)',
    value: 'Business ($149)'
  },
  {
    text: 'Banned',
    value: 'Banned'
  }
]

export const discountType = [
  {
    text: 'Fixed',
    value: true
  },
  {
    text: 'Percentage',
    value: false
  }
]

export const orderStatuses = [
  {
    key: 1,
    value: 'Lendee Loan Requested',
    text: 'Lendee Loan Requested'
  },
  {
    key: 2,
    value: 'Lendee cancelled Loan Request',
    text: 'Lendee cancelled Loan Request'
  },
  {
    key: 3,
    value: 'Lendor Loan Accepted',
    text: 'Lendor Loan Accepted'
  },
  {
    key: 4,
    value: 'Lendee collected item',
    text: 'Lendee collected item'
  },
  {
    key: 5,
    value: 'Item returned in order',
    text: 'Item returned in order'
  },
  {
    key: 6,
    value: 'Lendor disputed item',
    text: 'Lendor disputed item'
  }
]

export const csvDetails = [
  {
    key: 1,
    label: 'Name of item'
  },
  {
    key: 2,
    label: 'Category'
  },
  {
    key: 3,
    label: 'Description'
  },
  {
    key: 4,
    label: 'Daily rate'
  },
  {
    key: 5,
    label: 'Quantity'
  },
  {
    key: 6,
    label: 'Self Collection(Yes/No)'
  },
  {
    key: 7,
    label: 'Shipping Delivery'
  },
  {
    key: 8,
    label: 'Refundable Deposits'
  },
  {
    key: 9,
    label: 'Weekly Discount'
  },
  {
    key: 10,
    label: 'Monthly Discount'
  }
]