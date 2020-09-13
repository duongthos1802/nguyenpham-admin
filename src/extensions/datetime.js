// lib
import moment from 'moment'
import {
  DEFAULT_FORMAT_DATE,
  DEFAULT_FORMAT_DATE_EN,
  DEFAULT_FORMAT_DATE_TIME,
  DEFAULT_FORMAT_UTC_DATE_TIME,
  DEFAULT_ISO_FORMAT_DATE,
  formatDateTimeStamp,
  DEFAULT_FORMAT_DATE_SGN
} from '../constants'

const INFINITY_DATE = new Date(9999, 11, 31, 23, 59, 59, 0)

export default {

  initNewDate(currentDate, nullable) {
    if (currentDate) {
      return moment(currentDate)
    }
    if (!nullable) {
      return moment(new Date())
    }
    return null
  },

  initNewVnDate(currentDate, defaultDate, nullable) {
    if (currentDate) {
      return moment(currentDate, DEFAULT_FORMAT_DATE)
    }
    if (defaultDate) {
      return defaultDate
    }
    if (!nullable) {
      return moment(new Date())
    }
    return null
  },

  initNewVnDateTime(currentDate, nullable) {
    if (currentDate) {
      return moment(currentDate, DEFAULT_FORMAT_DATE_TIME).format()
    }
    if (!nullable) {
      return moment(new Date()).format()
    }
    return null
  },

  initNewISODate(currentDate, nullable) {
    if (currentDate) {
      return moment(currentDate, DEFAULT_ISO_FORMAT_DATE)
    }
    if (!nullable) {
      return moment(new Date())
    }
    return null
  },

  formatStartOfDay(currentDate, nullable) {
    if (currentDate) {
      return moment(currentDate).startOf('days').format()
    }
    if (!nullable) {
      return moment(new Date()).startOf('days').format()
    }
    return null
  },

  formatEndOfDay(currentDate, nullable) {
    if (currentDate) {
      return moment(currentDate).endOf('days').format()
    }
    if (!nullable) {
      return moment(new Date()).endOf('days').format()
    }
    return null
  },

  /**
   * DD.MM.YYYY
   * @param currentDate
   * @param nullable
   * @returns {string|null}
   */
  formatVnDate(currentDate, nullable) {
    if (currentDate) {
      return moment(currentDate).format(DEFAULT_FORMAT_DATE)
    }

    if (!nullable) {
      return moment(new Date()).format(DEFAULT_FORMAT_DATE)
    }
    return null
  },

  formatVnDateTime(currentDate, nullable) {
    if (currentDate) {
      return moment(currentDate).format(DEFAULT_FORMAT_DATE_TIME)
    }

    if (!nullable) {
      return moment(new Date()).format(DEFAULT_FORMAT_DATE_TIME)
    }
    return null
  },

  /**
   * MM.DD.YYYY
   * @param currentDate
   * @param nullable
   * @returns {string|null}
   */
  formatEnDate(currentDate, nullable) {
    if (currentDate) {
      return moment(currentDate).format(DEFAULT_FORMAT_DATE_EN)
    }

    if (!nullable) {
      return moment(new Date()).format(DEFAULT_FORMAT_DATE_EN)
    }
    return null
  },

  checkIsPreviousDate(currentDate, dateCheck) {
    return !!(currentDate && dateCheck &&
      moment(currentDate).isBefore(moment(dateCheck)))
  },

  checkIsFutureDate(currentDate, dateCheck) {
    return !!(currentDate && dateCheck &&
      moment(currentDate).isAfter(moment(dateCheck)))
  },

  subtractDuration(currentDate, subtract, type) {
    return currentDate
      ? moment(currentDate).subtract(subtract, type)
      : null
  },

  calculateDateDiff(currentDate, dateDiff, type) {
    if (currentDate && dateDiff) {
      return moment(currentDate).diff(moment(dateDiff), type)
    }
    return null
  },

  getUserTimezone(currentDate, allowNull) {
    const timeZone = new Date().getTimezoneOffset()
    if (!currentDate) {
      return !allowNull
        ? moment(new Date()).subtract(timeZone, 'minutes').format()
        : null
    }
    return moment(currentDate).subtract(timeZone, 'minutes').format()
  },

  getUserVnTime(
    {
      currentDate,
      nullable,
      startOfDay,
      endOfDay
    }) {
    const timeZone = new Date().getTimezoneOffset()
    if (currentDate) {
      return moment(currentDate, DEFAULT_FORMAT_DATE_TIME).
        add(timeZone, 'minutes').
        format()
    }
    if (!nullable) {
      if (startOfDay) {
        return moment(new Date()).
          startOf('days').
          add(timeZone, 'minutes').
          format()
      }
      if (endOfDay) {
        return moment(new Date()).
          endOf('days').
          add(timeZone, 'minutes').
          format()
      }
      return moment(new Date()).add(timeZone, 'minutes').format()
    }
    return null
  },

  getDateRangeVnDateTime(
    {
      startDate,
      endDate,
      allowNull
    }) {
    const start = this.getUserVnTime({
      currentDate: startDate,
      nullable: allowNull,
      startOfDay: true
    })
    const end = this.getUserVnTime({
      currentDate: endDate,
      nullable: allowNull,
      endOfDay: true
    })
    return {
      startDate: start,
      endDate: end
    }
  },
  formatTimeStampToUtcTime(dateTime, format) {
    return dateTime ? moment.utc(dateTime).
      local().
      format(format ? format : 'LL') : null
  },

  formatUTCDateTime(datetime) {
    return datetime
      ? moment.utc(datetime).local().format(DEFAULT_FORMAT_UTC_DATE_TIME)
      : null
  },

  formatDateTimeToStringLogin (dateTime, format=DEFAULT_FORMAT_DATE_SGN) {
    return moment.utc(dateTime).format(format)
  }
}