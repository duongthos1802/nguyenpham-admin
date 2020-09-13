import React from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'
import {FormattedMessage} from 'react-intl'
import {DEFAULT_FORMAT_DATE} from '../constants'

const range = (start, end) => {
  const result = []
  for (let index = start; index < end; index++) {
    result.push(index)
  }
  return result
}

const DateTimePicker = (props) => {

  const handleChange = (value) => {

    const dateSelected = value
      ? moment(value).format(defaultDateFormat)
      : allowClear
        ? null
        : moment(new Date()).format(defaultDateFormat)

    if (onChange) {
      onChange(fieldName, dateSelected)
    }
  }

  const disabledDate = (current) => {

    // return false is enable
    // return true is disable

    if (!maxDate && !minDate) {
      return false
    }

    // can not select days before min day
    if (minDate && !maxDate) {
      return current < moment(minDate).startOf('days')
    }

    // can not select days after max day
    if (maxDate && !minDate) {
      return current > moment(maxDate).endOf('days')
    }

    return !(current >= moment(minDate).startOf('days') && current <= moment(maxDate).endOf('days'))
  }

  const disabledDateTime = () => {
    let enableHour = []
    let enableMinute = []
    let enableSecond = []

    if (minDate) {

      const momentMinDate = moment(minDate)

      enableHour.push(momentMinDate.hour())
      enableMinute.push(momentMinDate.minute())
      enableSecond.push(momentMinDate.second())
    }

    if (maxDate) {

      const momentMaxDate = moment(maxDate)

      enableHour.push(momentMaxDate.hour())
      enableMinute.push(momentMaxDate.minute())
      enableSecond.push(momentMaxDate.second())
    }

    const hourRange = range(0, 24)
    const enableHourRange = hourRange.splice(enableHour)

    const minuteRange = range(0, 60)
    const enableMinuteRange = minuteRange.splice(enableMinute)

    const secondRange = range(0, 60)
    const enableSecondRange = secondRange.splice(enableSecond)

    return {
      disabledHours: () => hourRange.filter(hour => !enableHourRange.includes(hour)),
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    }

  }

  const {
    customClass,
    value,
    disabled,
    dateFormat,
    onChange,
    fieldName,
    timePicker,
    minDate,
    maxDate,
    allowClear
  } = props

  const defaultDateFormat = dateFormat ? dateFormat : DEFAULT_FORMAT_DATE

  const locale = {
    'lang': {
      'today': <FormattedMessage
        id="Label.Today"
        defaultMessage="Today"
      />,
      'now': <FormattedMessage
        id="Label.Now"
        defaultMessage="Now"
      />,
      'ok': <FormattedMessage
        id="Label.Apply"
        defaultMessage="Apply"
      />,
      'clear': <FormattedMessage
        id="Label.Clear"
        defaultMessage="Clear"
      />,
      'timeSelect': <FormattedMessage
        id="Label.SelectTime"
        defaultMessage="Select Time"
      />,
      'dateSelect': <FormattedMessage
        id="Label.SelectDate"
        defaultMessage="Select Date"
      />,
      'yearFormat': 'YYYY',
      'dateFormat': DEFAULT_FORMAT_DATE,
      'dayFormat': 'D',
      'dateTimeFormat': defaultDateFormat,
      'monthFormat': 'MMMM'
    },
    'timePickerLocale': {
      // 'placeholder': <FormattedMessage
      //   id="Label.SelectTime"
      //   defaultMessage="Select Time"
      // />
    },
    'dateFormat': DEFAULT_FORMAT_DATE,
    'dateTimeFormat': defaultDateFormat,
    'weekFormat': 'YYYY-wo',
    'monthFormat': 'YYYY-MM'
  }

  const valueSelected = value
    ? moment(value, dateFormat)
    : allowClear
      ? null
      : moment(new Date())

  return (
    <DatePicker
      className={customClass ? customClass : ''}
      disabledDate={disabledDate}
      disabledTime={disabledDateTime}
      locale={locale}
      disabled={disabled}
      value={valueSelected}
      format={defaultDateFormat}
      allowClear={!!allowClear}
      showTime={timePicker ? timePicker : false}
      onChange={handleChange}
    />
  )
}

export default DateTimePicker