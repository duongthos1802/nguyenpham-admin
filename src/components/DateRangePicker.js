import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import moment from 'moment'
import { DEFAULT_FORMAT_DATE, DEFAULT_FORMAT_DATE_TIME } from '../constants'

const { RangePicker } = DatePicker

const DateRangePicker = (props) => {

  const handleChange = (dateRange) => {

    let startDate = null
    const startDateSelect = dateRange[0] ? dateRange[0] : null

    if (startDateSelect) {
      startDate = moment(startDateSelect).format(defaultDateFormat)
    } else {
      if (!enableClear) {
        startDate = moment(new Date()).format(defaultDateFormat)
      }
    }

    let endDate = null

    const endDateSelected = dateRange[1] ? dateRange[1] : null

    if (endDateSelected) {
      endDate = moment(endDateSelected).format(defaultDateFormat)
    } else {
      if (!enableClear) {
        endDate = moment(new Date()).format(defaultDateFormat)
      }
    }

    if (onChange) {
      onChange(startDateField, startDate, endDateField, endDate)
    }
  }

  const handleClear = (dateRange) => {
    if (dateRange.length < 2) {
      if (onChange) {
        onChange(startDateField, null, endDateField, null)
      }
    }
  }

  const {
    customClass,
    startDate,
    endDate,
    dateFormat,
    onChange,
    startDateField,
    endDateField,
    enableClear,
    disabled
  } = props

  const defaultDateFormat = dateFormat ? dateFormat : DEFAULT_FORMAT_DATE

  const ranges = {
    Today: [moment().startOf('days'), moment().endOf('days')],
    'This week': [moment().startOf('week'), moment().endOf('week')],
    'This month': [moment().startOf('month'), moment().endOf('month')],
    'This quarter': [moment().startOf('quarter'), moment().endOf('quarter')],
    'This year': [moment().startOf('year'), moment().endOf('year')]
  }

  const startDateSelected = startDate
    ? moment(startDate, dateFormat)
    : enableClear ? null : moment(new Date()).startOf('days')

  const endDateSelected = endDate
    ? moment(endDate, dateFormat)
    : enableClear ? null : moment(new Date()).endOf('days')

  const rangeDateSelected = startDateSelected && endDateSelected
    ? [startDateSelected, endDateSelected]
    : null

  const showTime = dateFormat === DEFAULT_FORMAT_DATE_TIME
  return (
    <RangePicker
      disabled={disabled}
      format={dateFormat}
      showTime={showTime}
      allowClear={enableClear}
      className={customClass ? customClass : ''}
      ranges={ranges}
      value={rangeDateSelected}
      defaultValue={rangeDateSelected}
      getCalendarContainer={trigger => {
        return trigger.parentNode
      }}
      onOk={handleChange}
      onChange={dates => {
        if (showTime) {
          handleClear(dates)
        } else {
          handleChange(dates)
        }
      }}
    />
  )
}

DateRangePicker.propTypes = {
  customClass: PropTypes.string,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  dateFormat: PropTypes.string,
  onChange: PropTypes.func,
  startDateField: PropTypes.string,
  endDateField: PropTypes.string,
  enableClear: PropTypes.bool,
  disabled: PropTypes.bool
}

export default DateRangePicker