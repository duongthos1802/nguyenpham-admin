import React from 'react'
import { DEFAULT_FORMAT_SHORT_DATE, enumType, DEFAULT_QUANTITY } from '../constants'
import { datetimeHelper, stringHelper } from './index'

const DELIVERY = 4

const PERCENTS = 100

const WEEKLY = 6

const MONTHLY = 30

const PERCENTS_FEES = 50

const MIN_PRICE_LPP = 2

const MAX_LPP_COST = 50

const NUMBER_PROTEC_QUANTUM = 50

export const isOrder = (order) => {
  return !!(order)
}

export const countDayOrder = (fromDate, toDate) => {
  let countDay = 1
  if (fromDate && toDate) {
    countDay = datetimeHelper.calculateDateDiff(toDate, fromDate, 'days') || 1
  }
  return countDay
}

export const getCountDaysOrder = (countDayLoanDuration, fromDate, toDate) => {
  if (countDayLoanDuration) return countDayLoanDuration
  return countDayOrder(fromDate, toDate)
}

//================================

export const isProduct = (product) => {
  return !!product
}

export const getProductByOrder = (order) => {
  return isOrder(order) ? order.product || null : null
}

export const getFlatRate = (isDelivery, product) => {
  if (!isDelivery) return 0
  if (!isProduct(product)) return 0
  return product.flatRate || DELIVERY
}

/**
 * calculate total by price product
 * @param productPrice
 * @param countDay
 * @returns {number}
 */
export const calculatePriceOrderByProduct = (productPrice, countDay, quantity) => {
  return Number(productPrice || 0) * Number(countDay || 0) * Number(quantity || DEFAULT_QUANTITY)
}

export const calculateDiscount = (productDiscount, price, countDay) => {
  let discount = 0
  let discountPrice = 0
  let discountType = null
  if (productDiscount) {
    if (countDay > WEEKLY && countDay < MONTHLY && productDiscount.weekly > 0) {
      discount = productDiscount.weekly
      //txtDiscount = discount+'% weekly discount'
      discountPrice = price * discount / PERCENTS

      discountType = enumType.discountType.Weekly
    }

    if (countDay >= MONTHLY && productDiscount.monthly > 0) {
      discount = productDiscount.monthly
      //txtDiscount = discount+'% monthly discount'
      discountPrice = price * discount / PERCENTS

      discountType = enumType.discountType.Monthly
    }
    // if (countDay >= 30 && !product.discount.monthly && product.discount.weekly > 0) {
    //   discount = product.discount.weekly
    //   //txtDiscount = discount+'% weekly discount';
    //   discountPrice = price * discount / 100
    //
    //   discountType = enumType.discountType.Monthly
    // }
  }
  return {
    discount,
    discountPrice: discountPrice || 0,
    discountType
  }
}

export const calculatePromo = (price, promo) => {
  let discountPromo = 0
  if (promo && promo.percent) {
    discountPromo = (price * promo.percent / PERCENTS) || 0
  } else if (promo && !promo.percent) {
    discountPromo = promo.discount || 0
  }
  return discountPromo
}

export const getIsLPP = (order, product) => {
  if (!order || !product) return false
  if (!product.isProtected) return false
  return order ? order.isLPP || false : false
}

/**
 * calculate is loan protection
 * @param productPrice
 * @param deposit
 * @param isLPP
 * @returns {{depositByLPP: (*|number), totalPriceLPP: number}}
 */
export const calculateLoanProtection = ({ productPrice, deposit, isLPP, isOptedIn, quantity }) => {
  let totalPriceLPP = 0
  let depositByLPP = deposit
  if (isLPP) {
    if (isOptedIn) {
      depositByLPP = 0
      // cach tinh cu 10%
      // totalPriceLPP = price * (PERCENTS_FEES / PERCENTS)
      // cach tinh moi = 50% price
      totalPriceLPP = productPrice * (PERCENTS_FEES / PERCENTS) * Number(quantity)
      if (totalPriceLPP < MIN_PRICE_LPP) {
        totalPriceLPP = MIN_PRICE_LPP
      }
    }
  }
  return {
    depositByLPP: depositByLPP,
    totalPriceLPP: totalPriceLPP || 0
  }
}

/**
 * calculate total order
 * @param order
 * @returns {*}
 */
export const calculateTotalOrder = (order) => {
  const { price, discountPrice, discountPromo, depositByLPP, totalDelivery, totalPriceLPP, isDelivery } = order || 0
  let totalPrice = price - discountPrice - discountPromo + (isDelivery ? totalDelivery : 0) + depositByLPP + totalPriceLPP
  let totalWithOutFlatRate = price - discountPrice - discountPromo + depositByLPP + totalPriceLPP
  if (totalPrice < 0) {
    totalPrice = 0
  }
  if (totalWithOutFlatRate < 0) {
    totalWithOutFlatRate = 0
  }
  return {
    totalPrice,
    totalWithOutFlatRate
  }
}

export const getPaymentOrder = (order) => {
  if (!isOrder(order)) return enumType.paymentMethod.Cash
  if (order.isLPP) {
    return order.isOptedIn ? enumType.paymentMethod.CreditCash : enumType.paymentMethod.Cash
  }
  return order.paymentMethod || enumType.paymentMethod.Cash
}

export const calculateOrder = (order) => {
  // get from date, to date
  const fromDate = order && order.loanDuration ? order.loanDuration.fromDate || null : null
  const toDate = order && order.loanDuration ? order.loanDuration.toDate || null : null
  // get promo code
  const promo = order && order.promo ? order.promo || null : null
  // get delivery
  const isDelivery = order ? order.isDelivery : false
  // get quantity
  const quantity = Number(order ? order.quantity || DEFAULT_QUANTITY : DEFAULT_QUANTITY)
  //get flatRate
  const flatRate = order ? (order.flatRate || 0) : 0
  // get deliveryType
  const deliveryType = order && order.deliveryType ? order.deliveryType : null
  //get total delivery
  const totalDelivery = Number(flatRate) * quantity
  //get deposit
  const deposit = order ? order.product ? order.product.deposit : 0 : 0
  // get total deposit
  const totalDeposit = Number(deposit) * quantity
  // get day loan request
  const countDay = countDayOrder(fromDate, toDate)
  // get priceProduct
  const productPrice = order ? order.productPrice : 0
  // get product discount
  const productDiscount = order ? order.productDiscount : null
  // get isLPP
  const isLPP = order ? order.isLPP : false
  const isOptedIn = order ? order.isOptedIn : false
  //get price
  const price = calculatePriceOrderByProduct(productPrice, countDay, quantity)
  const calculateDiscountByPrice = calculateDiscount(productDiscount, price, countDay)
  const discount = calculateDiscountByPrice.discount
  const discountPrice = calculateDiscountByPrice.discountPrice
  const discountType = calculateDiscountByPrice.discountType
  const priceLPP = calculateLoanProtection({ productPrice, deposit: totalDeposit, isLPP, isOptedIn, quantity })
  const priceLPPCost = priceLPP.totalPriceLPP * MAX_LPP_COST
  const priceCalculatePromo = price - discountPrice + priceLPP.totalPriceLPP
  const discountPromo = calculatePromo(priceCalculatePromo, promo)
  const calculateTotal = calculateTotalOrder({
    price, discountPrice, discountPromo, totalDelivery,
    depositByLPP: priceLPP.depositByLPP,
    totalPriceLPP: priceLPP.totalPriceLPP,
    isDelivery
  })

  const { totalPrice, totalWithOutFlatRate } = calculateTotal
  const paymentMethod = getPaymentOrder(order, totalPrice)
  return {
    fromDate,
    toDate,
    productPrice,
    productDiscount,
    price,
    discount,
    discountPrice,
    discountPromo,
    totalPrice,
    countDay,
    flatRate,
    discountType,
    isLPP: isLPP,
    isOptedIn: isOptedIn,
    isDelivery: isDelivery,
    deposit: deposit,
    totalDeposit: priceLPP.depositByLPP,
    totalPriceLPP: priceLPP.totalPriceLPP,
    promo: promo,
    paymentMethod: paymentMethod,
    priceLPPCost: priceLPPCost,
    totalWithOutFlatRate: totalWithOutFlatRate,
    totalDelivery,
    deliveryType: deliveryType,
    quantity
  }
}

export const getOrderLoanDuration = (loanDuration, totalLoanDay) => {
  if (!loanDuration) {
    return null
  }

  const fromDate = datetimeHelper.formatTimeStampToUtcTime(
    loanDuration.fromDate, DEFAULT_FORMAT_SHORT_DATE
  )

  const toDate = datetimeHelper.formatTimeStampToUtcTime(
    loanDuration.toDate, DEFAULT_FORMAT_SHORT_DATE
  )

  const countDay = getCountDaysOrder(totalLoanDay, fromDate, toDate)

  return {
    fromDate: fromDate,
    toDate: toDate,
    countDay: countDay
  }
}

export const showOrderLoanDurationGrid = (loanDuration, totalLoanDay) => {
  const loan = getOrderLoanDuration(loanDuration, totalLoanDay)
  if (!loan) {
    return '-'
  }
  const {
    countDay,
    toDate,
    fromDate
  } = loan
  return (
    <span>
      {fromDate} - {toDate}
      <br />
      ({countDay} {stringHelper.pluralize(countDay, 'day')})
    </span>
  )
}

export const getLastestOrderStatus = (orderStatuses) => {
  return orderStatuses ? orderStatuses[orderStatuses.length - 1] : 0
}

export const mapStatusOrder = (orderStatus, paymentMethod) => {
  if (orderStatus && orderStatus.length > 0) {
    let currentStatus
    let lastOrderStatus = orderStatus[orderStatus.length - 1]
    if (lastOrderStatus.value === enumType.orderStatus.DisputeOrderByLendee
      || lastOrderStatus.value === enumType.orderStatus.DisputeOrderByLendor
    ) {
      lastOrderStatus = orderStatus[orderStatus.length - 2]
      currentStatus = orderStatus[orderStatus.length - 1]
    } else {
      currentStatus = orderStatus[orderStatus.length - 1]
    }
    const step = paymentMethod === enumType.paymentMethod.CreditCash
      ? enumType.stepRequestViaCard.findIndex(({ value }) => value === lastOrderStatus.value)
      : enumType.stepRequest.findIndex(({ value }) => value === lastOrderStatus.value)
    return {
      status: currentStatus.value,
      step: step + 1
    }
  }
  return {
    status: enumType.orderStatus.Placed,
    step: 0
  }
}

export default {
  isOrder,
  getCountDaysOrder,
  countDayOrder,
  calculateOrder,
  getOrderLoanDuration,
  mapStatusOrder
}