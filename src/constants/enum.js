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
  Avatar: 'avatar',
  Banner: 'banner',
  Chat: 'chat',
  Ping: 'ping',
  Category: 'category',
}

const imagePath = {
  Product: 'product_pictures',
  Avatar: 'profile_pictures',
  Banner: 'banner_pictures',
  Chat: 'chat_pictures',
  Ping: 'ping_pictures',
  Category: 'category_pictures'
}

// const discountType = {
//   Weekly: 'weekly',
//   Monthly: 'monthly'
// }

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
      id="Enum.ProductStatus.Removed"
      defaultMessage="Removed"
    />,
    color: 'orange',
    description: <FormattedMessage
      id="Label.Removed"
      defaultMessage="Removed"
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


// const orderStatusValues = {
//   RequestCancelled: 'requestCancel',
//   Expired: 'expired',
//   Placed: 'placed',
//   Accepted: 'accepted',
//   Payment: 'payment',
//   WithDraw: 'withDraw',
//   Delivered: 'delivered',
//   Received: 'received',
//   AcceptedItIs: 'acceptedItIs',
//   Resolved: 'resolved',
//   Returned: 'returned',
//   Reviewed: 'reviewed',
//   Canceled: 'canceled',
//   LendeeCanceled: 'lendeeCanceled',
//   Declined: 'declined',
//   CanceledByAdmin: 'canceled-by-admin',
//   DisputeOrderByLendor: 'dispute-order-by-lendor',
//   DisputeOrderByLendee: 'dispute-order-by-lendee'
// }

// const orderTransactionStatusEnum = [
//   {
//     value: orderStatusValues.Placed,
//     label: <FormattedMessage
//       id="Enum.OrderTransactionStatus.Placed"
//       defaultMessage="Loan requested"
//     />,
//     color: 'orange',
//     description: <FormattedMessage
//       id="Label.Placed"
//       defaultMessage="Placed"
//     />
//   },
//   {
//     value: orderStatusValues.Accepted,
//     label: <FormattedMessage
//       id="Enum.OrderTransactionStatus.Accepted"
//       defaultMessage="Request accepted"
//     />,
//     color: 'orange',
//     description: <FormattedMessage
//       id="Label.Accepted"
//       defaultMessage="Accepted"
//     />
//   },
//   {
//     value: orderStatusValues.Delivered,
//     label: <FormattedMessage
//       id="Enum.OrderTransactionStatus.Delivered"
//       defaultMessage="Item Sent"
//     />,
//     color: 'orange',
//     description: <FormattedMessage
//       id="Label.Delivered"
//       defaultMessage="Delivered"
//     />
//   },
//   {
//     value: orderStatusValues.Received,
//     label: <FormattedMessage
//       id="Enum.OrderTransactionStatus.Received"
//       defaultMessage="Item Accepted"
//     />,
//     color: 'orange',
//     description: <FormattedMessage
//       id="Label.Received"
//       defaultMessage="Received"
//     />
//   },
//   {
//     value: orderStatusValues.Returned,
//     label: <FormattedMessage
//       id="Enum.OrderTransactionStatus.Returned"
//       defaultMessage="Item Returned"
//     />,
//     color: 'orange',
//     description: <FormattedMessage
//       id="Label.Returned"
//       defaultMessage="Returned"
//     />
//   },
//   {
//     value: orderStatusValues.Reviewed,
//     label: <FormattedMessage
//       id="Enum.OrderTransactionStatus.Reviewed"
//       defaultMessage="Item Returned In Order"
//     />,
//     color: 'green',
//     description: <FormattedMessage
//       id="Label.Reviewed"
//       defaultMessage="Reviewed"
//     />
//   },
//   {
//     value: orderStatusValues.Canceled,
//     label: <FormattedMessage
//       id="Enum.OrderTransactionStatus.Canceled"
//       defaultMessage="Request Canceled"
//     />,
//     color: 'gray',
//     description: <FormattedMessage
//       id="Label.Canceled"
//       defaultMessage="Canceled"
//     />
//   },
//   {
//     value: orderStatusValues.Declined,
//     label: <FormattedMessage
//       id="Enum.OrderTransactionStatus.Declined"
//       defaultMessage="Request Declined"
//     />,
//     color: 'gray',
//     description: <FormattedMessage
//       id="Label.Declined"
//       defaultMessage="Declined"
//     />
//   },
//   {
//     value: 'disputeOrderByLendor',
//     label: <FormattedMessage
//       id="Enum.OrderTransactionStatus.DisputeOrderByLendor"
//       defaultMessage="disputed"
//     />,
//     color: 'red',
//     description: <FormattedMessage
//       id="Label.disputeOrderByLendor"
//       defaultMessage="Disputed By Lendor"
//     />
//   },
//   {
//     value: 'disputeOrderByLendee',
//     label: <FormattedMessage
//       id="Enum.OrderTransactionStatus.DisputeOrderByLendee"
//       defaultMessage="disputed"
//     />,
//     color: 'red',
//     description: <FormattedMessage
//       id="Label.disputeOrderByLendee"
//       defaultMessage="Disputed By Lendee"
//     />
//   },
//   {
//     value: orderStatusValues.Expired,
//     label: <FormattedMessage
//       id="Enum.OrderTransactionStatus.Expired"
//       defaultMessage="Request expired"
//     />,
//     color: 'gray',
//     description: <FormattedMessage
//       id="Label.Expired"
//       defaultMessage="Expired"
//     />
//   },
// ]

// const orderStatusValue = {
//   LendeeLoanRequested: 'Lendee Loan Requested',
//   LendeeCancelledLoanRequest: 'Lendee cancelled Loan Request',
//   LendorLoanAccepted: 'Lendor Loan Accepted',
//   LendeeCollectedItem: 'Lendee collected item',
//   ItemReturnedInOrder: 'Item returned in order',
//   LendorDisputedItem: 'Lendor disputed item'
// }

// const orderStatusEnum = [
//   {
//     value: orderStatusValue.LendeeLoanRequested,
//     description: <FormattedMessage
//       id="Label.LendeeLoanRequested"
//       defaultMessage={orderStatusValue.LendeeLoanRequested}
//     />
//   },
//   {
//     value: orderStatusValue.LendeeCancelledLoanRequest,
//     description: <FormattedMessage
//       id="Label.LendeeCancelledLoanRequest"
//       defaultMessage={orderStatusValue.LendeeCancelledLoanRequest}
//     />
//   },
//   {
//     value: orderStatusValue.LendorLoanAccepted,
//     description: <FormattedMessage
//       id="Label.LendorLoanAccepted"
//       defaultMessage={orderStatusValue.LendorLoanAccepted}
//     />
//   },
//   {
//     value: orderStatusValue.LendeeCollectedItem,
//     description: <FormattedMessage
//       id="Label.LendeeCollectedItem"
//       defaultMessage={orderStatusValue.LendeeCollectedItem}
//     />
//   },
//   {
//     value: orderStatusValue.ItemReturnedInOrder,
//     description: <FormattedMessage
//       id="Label.ItemReturnedInOrder"
//       defaultMessage={orderStatusValue.ItemReturnedInOrder}
//     />
//   },
//   {
//     value: orderStatusValue.LendorDisputedItem,
//     description: <FormattedMessage
//       id="Label.LendorDisputedItem"
//       defaultMessage={orderStatusValue.LendorDisputedItem}
//     />
//   }
// ]

// const orderStatusQuery = {
//   Published: 'Published',
//   Waiting: 'Waiting',
//   Ended: 'Ended'
// }

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

const paymentMethod = {
  Cash: 'cash',
  CreditCash: 'CreditCash'
}

// const stepRequestViaCard = [
//   {
//     value: orderStatusValues.Placed,
//     label: 'Loan Requested'
//   },
//   {
//     value: orderStatusValues.Delivered,
//     label: 'Item Sent'
//   },
//   {
//     value: orderStatusValues.Received,
//     label: 'Item Accepted'
//   },
//   {
//     value: orderStatusValues.Returned,
//     label: 'Item Returned'
//   },
//   {
//     value: orderStatusValues.Reviewed,
//     label: 'Item Returned In Order'
//   }
// ]

// const stepRequest = [
//   {
//     value: orderStatusValues.Placed,
//     label: 'Loan Requested'
//   },
//   {
//     value: orderStatusValues.Accepted,
//     label: 'Loan Accepted'
//   },
//   {
//     value: orderStatusValues.Delivered,
//     label: 'Item Sent'
//   },
//   {
//     value: orderStatusValues.Received,
//     label: 'Item Accepted'
//   },
//   {
//     value: orderStatusValues.Returned,
//     label: 'Item Returned'
//   },
//   {
//     value: orderStatusValues.Reviewed,
//     label: 'Item Returned In Order'
//   }
// ]

// const stepCancel = [
//   {
//     value: orderStatusValues.Placed,
//     label: 'Loan Requested'
//   },
//   {
//     value: orderStatusValues.Canceled,
//     label: 'Request Cancelled'
//   }
// ]

// const stepDecline = [
//   {
//     value: orderStatusValues.Placed,
//     label: 'Loan Requested'
//   },
//   {
//     value: orderStatusValues.Declined,
//     label: 'Request Declined'
//   }
// ]

// const stepExpired = [
//   {
//     value: orderStatusValues.Placed,
//     label: 'Loan Requested'
//   },
//   {
//     value: orderStatusValues.Expired,
//     label: 'Request Expired'
//   }
// ]

// const orderStatus = {
//   Placed: 'placed',
//   Accepted: 'accepted',
//   WithDraw: 'withDraw',
//   Delivered: 'delivered',
//   Received: ['received', 'acceptedItIs'],
//   Returned: 'returned',
//   Reviewed: ['reviewed', 'resolved'],
//   Declined: 'declined',
//   Canceled: 'canceled',
//   CanceledByAdmin: 'canceled-by-admin',
//   DisputeOrderByLendor: 'dispute-order-by-lendor',
//   DisputeOrderByLendee: 'dispute-order-by-lendee',
//   Expired: 'expired'
// }

// const collectionMethod = {
//   SelfCollect: 'Self Collection',
//   Delivery: 'Delivery'
// }

// export const promoDiscount = {
//   Fixed: 'fixed',
//   Percentage: 'percentage'
// }

// export const promoDiscountEnum = [
//   {
//     value: promoDiscount.Fixed,
//     label: 'Fixed'
//   },
//   {
//     value: promoDiscount.Percentage,
//     label: 'Percentage'
//   }
// ]

// const promoStatus = {
//   Inactive: 'inactive',
//   Active: 'active'
// }

// const promoStatusEnum = [
//   {
//     label: 'Active',
//     value: promoStatus.Active
//   },
//   {
//     label: 'Inactive',
//     value: promoStatus.Inactive
//   }
// ]

// export const FAQType = {
//   Lendor: 'Lendor',
//   Lendee: 'Lendee'
// }

// export const FAQTypeEnum = [
//   {
//     label: 'Lendor',
//     value: FAQType.Lendor
//   },
//   {
//     label: 'Lendee',
//     value: FAQType.Lendee
//   }
// ]

// export const FAQStatus = {
//   Normal: 'Normal',
//   Delete: 'Delete'
// }

// export const FAQStatusEnum = [
//   {
//     label: 'Normal',
//     value: FAQStatus.Normal,
//     color: 'green'
//   },
//   {
//     label: 'Delete',
//     value: FAQStatus.Delete,
//     color: 'red'
//   }
// ]

// export const DeliveryOptions = ['1 way trip', '2 way trip']

// export const DeliveryOptionsValue = {
//   OneWay: 'OneWay',
//   TwoWay: 'TwoWay',
//   NoDelivery: 'NoDelivery',
// }

// const deliveryType = [
//   {
//     label: '1 way trip',
//     value: 'OneWay',
//   },
//   {
//     label: '2 way trip',
//     value: 'TwoWay',
//   }
// ]

// TEAMO================================================================

const categoryStatus = {
  PUBLISHED: 'Published',
  SUSPENDED: 'Suspended'
}

const categoryStatusEnum = [
  {
    label: 'Published',
    value: categoryStatus.PUBLISHED
  },
  {
    label: 'Suspended',
    value: categoryStatus.SUSPENDED
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
  // discountType,
  buttonTypeComponent,
  userEditTab,
  userAdminTab,
  userEditTabArray,
  userRoleEditTabArray,
  sortDirection,
  productStatus,
  productStatusEnum,
  // orderStatusQuery,
  bannerStatus,
  pageEditTab,
  userStatus,
  userStatusEnum,
  // orderStatusEnum,
  // orderStatusValues,
  // paymentMethod,
  // stepRequestViaCard,
  // orderTransactionStatusEnum,
  // orderStatus,
  // stepRequest,
  // stepCancel,
  // stepDecline,
  // stepExpired,
  // collectionMethod,
  // promoDiscount: promoDiscount,
  // promoDiscountEnum: promoDiscountEnum,
  // promoStatus,
  // promoStatusEnum,
  // FAQType,
  // FAQTypeEnum,
  // FAQStatus,
  // FAQStatusEnum,
  actionTypePermission,
  // DeliveryOptions,
  // DeliveryOptionsValue,
  // deliveryType
  categoryStatus,
  categoryStatusEnum
}
