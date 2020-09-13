import React, { useState, useEffect } from 'react'
// lib
import PerfectScrollbar from 'react-perfect-scrollbar'
import { FormattedMessage } from 'react-intl'
// hoc
import { withSelect } from '../../hocs/withSelect'
// constant
import { queryPath, DEFAULT_PAGE_SIZE } from '../../constants'
// services
import { selectServices } from '../../services'
// utils
import utils from '../../utils'
// component
import { Icon, Select, Spin } from 'antd'
import PropTypes from 'prop-types'
import { userHelper } from '../../extensions'

const Option = Select.Option

const CustomSelect = (props) => {

  const {
    path,
    data,
    value,
    isLoading,
    onChange,
    handleSearch,
    handleBlurOption,
    isMulti,
    isClearable,
    placeholder,
    isDisabled
  } = props

  const [listOptions, setListOptions] = useState([])

  useEffect(
    () => {
      handleResetData(data ? data.users : null)
    },
    [data]
  )

  useEffect(
    () => {
      const options = utils.initValueToOption(value, listOptions)
      setListOptions(options)
    },
    [value]
  )

  const handleChangeSelection = (value) => {
    const optionSelected = utils.getValueOption(listOptions, value)
    onChange(path, optionSelected)
  }

  const handleResetData = (listUsers) => {
    let options = []
    if (listUsers && listUsers.length > 0) {
      options = listUsers.map((user) => ({
        value: user._id,
        key: user._id,
        label: userHelper.getUserName(user),
        email: user.mail
      }))
    }

    const listOptions = utils.initValueToOption(value, options)

    setListOptions(listOptions)
  }

  const valueSelected = utils.getValueOption(listOptions, value)

  return (
    <Select
      disabled={!!isDisabled}
      mode={isMulti ? 'multiple' : 'default'}
      showSearch
      labelInValue
      value={valueSelected}
      allowClear={!!isClearable}
      placeholder={placeholder
        ? placeholder
        : <FormattedMessage
          id="Placeholder.SelectUser"
          defaultMessage="Select User"
        />}
      notFoundContent={isLoading ? <Spin size="small"/> : null}
      filterOption={false}
      onSearch={(value) => handleSearch(value)}
      onChange={handleChangeSelection}
      onBlur={handleBlurOption}
      style={{ width: '100%' }}
      className='custom-select-antd'
      dropdownRender={(menu) => (
        <div className='custom-selection'>
          <PerfectScrollbar>
            {menu}
          </PerfectScrollbar>
        </div>
      )}
      suffixIcon={<Icon type='caret-down'/>}
    >
      {
        listOptions && listOptions.length > 0
          ? listOptions.map(item => (
            <Option key={item.value}>
              {item.label}
            </Option>
          )
          )
          : null
      }
    </Select>
  )
}

const customSelect = withSelect({
  pathName: queryPath.USER_SELECT_PATH,
  defaultPath: 'user',
  loadData: (values, { loadDataPagerCallback }) => {

    // console.log('values', values)
    const queryClause = selectServices.initQuerySelectUserProduct(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  }
})

CustomSelect.propTypes = {
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleBlurOption: PropTypes.func,
  path: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
}

export default customSelect(CustomSelect)