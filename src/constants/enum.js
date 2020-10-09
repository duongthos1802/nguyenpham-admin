import { FormattedMessage } from 'react-intl'
import React from 'react'
import { startCase } from 'lodash'

const mode = {
  edit: 'edit',
  create: 'create',
  detail: 'detail'
}

const action = {
  NoControl: 'NoControl',
  View: 'View',
  Write: 'Write'
}

const actionTypePermission = [
  {
    value: action.NoControl,
    label: 'NoControl'
  },
  {
    value: 'View',
    label: 'View'
  },
  {
    value: 'Write',
    label: 'Write'
  },

]

const actionType = [
  {
    value: action.NoControl,
    label: (
      <FormattedMessage
        id={'Enum.Action.NoControl'}
        defaultMessage="No Control"
      />
    )
  },
  {
    value: action.View,
    label: <FormattedMessage id={'Enum.Action.View'} defaultMessage="View" />
  },
  {
    value: action.Write,
    label: <FormattedMessage id={'Enum.Action.Write'} defaultMessage="Write" />
  }
]

const actionACL = {
  Create: 'create',
  Read: 'read',
  Update: 'update',
  Delete: 'delete'
}

const notification = {
  Success: 'success',
  Error: 'error',
  Warning: 'warning',
  Info: 'info'
}

const optionsCategory = {
  PRODUCT: 'Product',
  RECIPE: 'Recipe',
  BLOG: 'Blog'
}

const buttonType = {
  Cancel: 'Cancel',
  Create: 'Create',
  Edit: 'Edit',
  Delete: 'Delete',
  Remove: 'Remove',
  Print: 'Print',
  Back: 'Back',
  Complete: 'Complete',
  Save: 'Save',
  Draft: 'Draft',
  Confirm: 'Confirm',
  Close: 'Close',
  Accept: 'Accept',
  SaveAndConfirm: 'SaveAndConfirm',
  Adjustment: 'Adjustment',
  Search: 'Search',
  Hide: 'Hide',
  Add: 'Add',
  Preview: 'Preview',
  RestoreSuspend: 'Restore-Suspend',
  RestoreLock: 'Restore-Lock',
  Restore: 'Restore',
  Lock: 'Lock',
  Unlock: 'Unlock',
  Change: 'Change',
  Role: 'Role',
  GoToPost: 'GoToPost',
  Profile: 'Profile',
  PostList: 'PostList',
  CommentList: 'CommentList',
  Suspend: 'Suspend',
  Ignore: 'Ignore',
  Resume: 'Resume',
  ContentGroupCategory: 'ContentGroupCategory',
  ContentGroupUser: 'ContentGroupUser',
  Submit: 'Submit',
  Revert: 'Revert',
  Reject: 'Reject',
  Publish: 'Publish',
  History: 'History',
  Setting: 'Setting',
  LockedSelected: 'LockedSelected',
  HideSelected: 'HideSelected',
  SuspendedSelected: 'SuspendSelected',
  RestoreSelected: 'RestoreSelected'
}

const buttonTypeComponent = {
  Primary: 'primary',
  Ghost: 'ghost',
  Dashed: 'dashed',
  Link: 'link',
  Default: 'default'
}

const confirmType = {
  Create: 'create',
  Delete: 'delete',
  Publish: 'publish',
  Hide: 'hide',
  Restore: 'restore',
  Remove: 'remove',
  Suspend: 'suspend',
  Reset: 'reset',
  Lock: 'lock',
  Ignore: 'ignore',
  HideSelected: 'hide-selected',
  SuspendedSelected: 'suspend-selected',
  LockedSelected: 'locked-selected',
  RestoreSelected: 'restore-selected'
}

const uploadType = {
  Product: 'product',
  Banner: 'banner',
  Recipe: 'recipe',
  Html_Block: 'htmlBlock',
  Category: 'category',
  Blog: 'blog',
  Video: 'video'
}

const imagePath = {
  Product: 'product_pictures',
  Avatar: 'profile_pictures',
  Banner: 'banner_pictures',
  Recipe: 'recipe_pictures',
  Html_Block: 'html_block_pictures',
  Chat: 'chat_pictures',
  Ping: 'ping_pictures',
  Category: 'category_pictures',
  Blog: 'blog_pictures',
  Video: 'video_pictures'
}

const userAdminTab = {
  UserRole: 'user-role'
}

const userEditTab = {
  Profile: 'profile',
  Notifications: 'notifications',
  Products: 'products',
  OrdersAsLendor: 'orders-lendor',
  OrdersAsLendee: 'orders-lendee',
  OrdersAffiliateCode: 'affiliate-code',
}

const pageEditTab = {
  Information: 'information'
}

const userRoleEditTabArray = Object.keys(userAdminTab).map(tab => ({
  value: userAdminTab[tab],
  title: startCase(tab)
}))

const userEditTabArray = Object.keys(userEditTab).map(tab => ({
  value: userEditTab[tab],
  title: startCase(tab)
}))

const sortDirection = {
  DESC: 'descend',
  ASC: 'ascend'
}

const productStatus = {
  Deleted: 'Deleted',
  Published: 'Published',
  Suspended: 'Suspended'
}

const productStatusEnum = [
  {
    value: productStatus.Suspended,
    label: <FormattedMessage
      id="Enum.ProductStatus.Suspended"
      defaultMessage="Suspended"
    />,
    color: 'orange',
    description: <FormattedMessage
      id="Label.Suspended"
      defaultMessage="Suspended"
    />
  },
  {
    value: productStatus.Published,
    label: <FormattedMessage
      id="Enum.ProductStatus.Published"
      defaultMessage="Published"
    />,
    color: 'green',
    description: <FormattedMessage
      id="Label.Published"
      defaultMessage="Published"
    />
  },
  {
    value: productStatus.Deleted,
    label: <FormattedMessage
      id="Enum.ProductStatus.Deleted"
      defaultMessage="Deleted"
    />,
    color: 'red',
    description: <FormattedMessage
      id="Label.Deleted"
      defaultMessage="Deleted"
    />
  }
]

const recipeStatus = {
  Deleted: 'Deleted',
  Published: 'Published',
  Suspended: 'Suspended'
}

const recipeStatusEnum = [
  {
    value: recipeStatus.Suspended,
    label: <FormattedMessage
      id="Enum.recipeStatus.Removed"
      defaultMessage="Removed"
    />,
    color: 'orange',
    description: <FormattedMessage
      id="Label.Removed"
      defaultMessage="Removed"
    />
  },
  {
    value: recipeStatus.Published,
    label: <FormattedMessage
      id="Enum.recipeStatus.Published"
      defaultMessage="Published"
    />,
    color: 'green',
    description: <FormattedMessage
      id="Label.Published"
      defaultMessage="Published"
    />
  },
  {
    value: recipeStatus.Deleted,
    label: <FormattedMessage
      id="Enum.recipeStatus.Deleted"
      defaultMessage="Deleted"
    />,
    color: 'red',
    description: <FormattedMessage
      id="Label.Deleted"
      defaultMessage="Deleted"
    />
  }
]


const recipeLevel = {
  Easy: 'Easy',
  Medium: 'Medium',
  Difficult: 'Difficult'
}

const recipeLevelEnum = [
  {
    value: recipeLevel.Easy,
    label: <FormattedMessage
      id="Enum.recipeLevel.Easy"
      defaultMessage="Easy"
    />,
    color: 'green',
    description: <FormattedMessage
      id="Label.Easy"
      defaultMessage="Easy"
    />

  },
  {
    value: recipeLevel.Medium,
    label: <FormattedMessage
      id="Enum.recipeLevel.Medium"
      defaultMessage="Medium"
    />,
    color: 'orange',
    description: <FormattedMessage
      id="Label.Medium"
      defaultMessage="Medium"
    />
  },
  {
    value: recipeLevel.Difficult,
    label: <FormattedMessage
      id="Enum.recipeLevel.Difficult"
      defaultMessage="Difficult"
    />,
    color: 'red',
    description: <FormattedMessage
      id="Label.Difficult"
      defaultMessage="Difficult"
    />
  }
]

const recipePriority = {
  Yes: true,
  No: false,
}

const recipePriorityEnum = [
  {
    value: recipePriority.Yes,
    label: <FormattedMessage
      id="Enum.recipePriority.Yes"
      defaultMessage="Yes"
    />,
    color: 'green',
    description: <FormattedMessage
      id="Label.Yes"
      defaultMessage="Yes"
    />

  },
  {
    value: recipePriority.No,
    label: <FormattedMessage
      id="Enum.recipePriority.No"
      defaultMessage="No"
    />,
    color: 'red',
    description: <FormattedMessage
      id="Label.No"
      defaultMessage="No"
    />
  }
]


const bannerStatus = {
  Published: true,
  Unpublished: false
}

const userStatus = {
  Normal: 'Normal',
  Deleted: 'Deleted',
  Suspended: 'Suspended'
}

const userStatusEnum = [
  {
    value: userStatus.Normal,
    label: (
      <FormattedMessage
        id="Enum.UserStatus.Normal"
        defaultMessage="Normal"
      />
    ),
    color: 'green'
  },
  {
    value: userStatus.Deleted,
    label: (
      <FormattedMessage
        id="Enum.UserStatus.Deleted"
        defaultMessage="Deleted"
      />
    ),
    color: 'red'
  },
  {
    value: userStatus.Suspended,
    label: (
      <FormattedMessage
        id="Enum.UserStatus.Suspended"
        defaultMessage="Suspended"
      />
    ),
    color: 'blue'
  }
]

// TEAMO================================================================

const categoryStatus = {
  PUBLISHED: 'Published',
  SUSPENDED: 'Suspended'
}

const categoryStatusEnum = [
  {
    value: categoryStatus.PUBLISHED,
    label: <FormattedMessage
      id="Enum.Category.Published"
      defaultMessage="Published"
    />,
    color: 'green',
    description: <FormattedMessage
      id="Label.Published"
      defaultMessage="Published"
    />
  },
  {
    value: categoryStatus.SUSPENDED,
    label: <FormattedMessage
      id="Enum.Category.Suspended"
      defaultMessage="Suspended"
    />,
    color: 'red',
    description: <FormattedMessage
      id="Label.Suspended"
      defaultMessage="Suspended"
    />
  }
]

const blogStatus = {
  Deleted: 'Deleted',
  Published: 'Published',
  Suspended: 'Suspended'
}

const blogStatusEnum = [
  {
    value: blogStatus.Suspended,
    label: <FormattedMessage
      id="Enum.blogStatus.Suspended"
      defaultMessage="Suspended"
    />,
    color: 'orange',
    description: <FormattedMessage
      id="Label.Suspended"
      defaultMessage="Suspended"
    />
  },
  {
    value: blogStatus.Published,
    label: <FormattedMessage
      id="Enum.blogStatus.Published"
      defaultMessage="Published"
    />,
    color: 'green',
    description: <FormattedMessage
      id="Label.Published"
      defaultMessage="Published"
    />
  },
  {
    value: blogStatus.Deleted,
    label: <FormattedMessage
      id="Enum.blogStatus.Deleted"
      defaultMessage="Deleted"
    />,
    color: 'red',
    description: <FormattedMessage
      id="Label.Deleted"
      defaultMessage="Deleted"
    />
  }
]


const videoStatus = {
  Deleted: 'Deleted',
  Published: 'Published',
  Suspended: 'Suspended'
}

const videoStatusEnum = [
  {
    value: videoStatus.Suspended,
    label: <FormattedMessage
      id="Enum.videoStatus.Suspended"
      defaultMessage="Suspended"
    />,
    color: 'orange',
    description: <FormattedMessage
      id="Label.Suspended"
      defaultMessage="Suspended"
    />
  },
  {
    value: videoStatus.Published,
    label: <FormattedMessage
      id="Enum.videoStatus.Published"
      defaultMessage="Published"
    />,
    color: 'green',
    description: <FormattedMessage
      id="Label.Published"
      defaultMessage="Published"
    />
  },
  {
    value: videoStatus.Deleted,
    label: <FormattedMessage
      id="Enum.videoStatus.Deleted"
      defaultMessage="Deleted"
    />,
    color: 'red',
    description: <FormattedMessage
      id="Label.Deleted"
      defaultMessage="Deleted"
    />
  }
]


// const productStatus = {
//   PUBLISHED: 'Published',
//   SUSPENDED: 'Suspended'
// }

// const StatusProductEnum = [
//   {
//     label: 'Published',
//     value: productStatus.PUBLISHED
//   },
//   {
//     label: 'Suspended',
//     value: productStatus.SUSPENDED
//   }
// ]



export default {
  mode,
  action,
  actionType,
  actionACL,
  buttonType,
  notification,
  confirmType,
  uploadType,
  imagePath,
  buttonTypeComponent,
  userEditTab,
  userAdminTab,
  userEditTabArray,
  userRoleEditTabArray,
  sortDirection,
  productStatus,
  productStatusEnum,
  bannerStatus,
  pageEditTab,
  userStatus,
  userStatusEnum,
  actionTypePermission,
  categoryStatus,
  categoryStatusEnum,
  recipeStatus,
  recipeStatusEnum,
  recipeLevel,
  recipeLevelEnum,
  recipePriority,
  recipePriorityEnum,
  blogStatus,
  blogStatusEnum,
  videoStatus,
  videoStatusEnum,
  optionsCategory
}