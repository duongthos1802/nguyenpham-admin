import {DEFAULT_DECIMAL} from "../constants";

export default {
  roundHundred(number) {
    return number ? Math.round(number) : 0
  },

  roundTwoDecimalPlace(num) {
    return num ? Math.round(num * 100) / 100 : 0
  },

  roundDecimalPlace(num, decimal) {
    const pow = Math.pow(10, decimal ? decimal : 0)
    return num ? Math.round(num * pow) / pow : 0
  },

  getInclFromExcl(price, tax) {
    return price * (1 + Number(tax ? tax : 0) / 100)
  },

  getExclFromIncl(price, tax) {
    return price / (1 + Number(tax ? tax : 0) / 100)
  },

  formatNumber(val, location) {
    return new Intl.NumberFormat(location ? location : 'vi-VN', {maximumSignificantDigits: 3}).format(val)
  },

  decimalPlace(number, decimal) {
    return Number.parseFloat(number || 0).toFixed(decimal || DEFAULT_DECIMAL)
  },

  showDecimalPlace(number, decimal, prefix) {
    return `${prefix || '$'}${this.decimalPlace(number, decimal)}`
  },

  rounding: (value, exp) => {
    function decimalAdjust(type, value, exp) {
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value)
      }
      value = +value
      exp = +exp

      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN
      }

      value = value.toString().split('e')
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))

      value = value.toString().split('e')
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
    }

    if (!Math.round10) {
      Math.round10 = function (value, exp) {
        return decimalAdjust('round', value, exp)
      }
    }
    return Math.round10(value, exp)
  },
}