import { enumType, stepProcess, stepWait } from '../constants'
import { isOrder } from './order'

export const stepOrderCancel = (value) => {
  switch (value) {
    case enumType.orderStatusValues.Canceled:
      return enumType.stepCancel
    case enumType.orderStatusValues.Declined:
      return enumType.stepDecline
    case enumType.orderStatusValues.Expired:
      return enumType.stepExpired
    default:
      return enumType.stepCancel
  }
}

export const checkStepCancel = (lastOrderStatus) => {
  if (!lastOrderStatus) return false
  return lastOrderStatus.value === enumType.orderStatusValues.Declined ||
    lastOrderStatus.value === enumType.orderStatusValues.Canceled ||
    lastOrderStatus.value === enumType.orderStatusValues.Expired
}

export const getStepByPaymentMethod = (order) => {
  if (!isOrder(order)) return []
  return order.paymentMethod === enumType.paymentMethod.CreditCash
    ? enumType.stepRequestViaCard
    : enumType.stepRequest
}

export const initStep = (lastOrderStatus, order) => {
  return checkStepCancel(lastOrderStatus) ?
    stepOrderCancel(lastOrderStatus.value)
    : getStepByPaymentMethod(order)
}

export const isDisputed = (lastOrderStatus) => {
  if (!lastOrderStatus) return false
  return lastOrderStatus.value === enumType.orderStatus.DisputeOrderByLendee ||
    lastOrderStatus.value === enumType.orderStatus.DisputeOrderByLendor
}

export const ownerId = (order, user) => {
  if (!order) return false
  if (!user) return false
  return order.buyer._id === user._id
}

export const innitCurrent = (currentStep, steps) => {
  if (!currentStep || !steps) return 0
  if (currentStep > 0) {
    return currentStep
  } else if (steps.length === 2) {
    return (currentStep + 1)
  }
  return 0
  // currentStep && currentStep > 0 ? currentStep : steps.length === 2 ? (currentStep + 1) : 0
}

/**
 * get status order step
 * @param {*} isBuyer
 * @param {*} currentStep
 * @param paymentMethod
 */
export const statusStepOrder = (isBuyer, currentStep, paymentMethod) => {
  let status = ''
  if (paymentMethod === enumType.paymentMethod.CreditCash) {
    status = isBuyer
      ? currentStep === 1 || currentStep === 4
        ? stepWait
        : stepProcess
      : currentStep === 2 || currentStep === 3
        ? stepWait
        : stepProcess
  } else {
    status = isBuyer
      ? currentStep === 1 || currentStep === 2 || currentStep === 5
        ? stepWait
        : stepProcess
      : currentStep === 3 || currentStep === 4
        ? stepWait
        : stepProcess
  }
  return status
}