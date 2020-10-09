import {FormattedNumber} from 'react-intl'
import React from 'react'

export default {
  formatNumber(number, nullable) {
    if (number > 0) {
      return <FormattedNumber value={number}/>
    }
    if (!nullable) {
      return 0
    }
    return null
  },
  formatNumberToIndex(number, nullable) {
    if (number > 0) {
      return number
    }
    if (!nullable) {
      return 0
    }
    return null
  },
}