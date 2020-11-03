import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'

// lib
import PerfectScrollbar from 'react-perfect-scrollbar'
import className from 'classnames'

import { FormattedMessage } from 'react-intl'

// hoc
import { withSelect } from '../../hocs/withSelect'

// constant
import { queryPath } from '../../constants'

// services
import { selectServices } from '../../services'

// utils
import utils from '../../utils'

// component
import { Icon, Select, Spin } from 'antd'

const Option = Select.Option

const convertOption = (showCategoryParent, options) => {
  if (showCategoryParent || !options.length) return options
  const categories = options.filter(item => item.parentId)
  return categories
}

const CustomSelect = (props) => {

  const {
    data,
    isMulti,
    isClearable,
    placeholder,
    isDisabled,
    handleBlurOption,
    path,
    value,
    isLoading,
    onChange,
    hideSelected,
    exception,
    isProduct,
    currentId,
    parentId,
    showCategoryParent = true,
  } = props
  const [listOptions, setListOptions] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [removeAll, setRemoveAll] = useState(false)

  useEffect(
    () => {
      handleResetData(data && data.categories && data.categories.length > 0
        ? data.categories
        : [], currentId, parentId)
    },
    [data, value, currentId, parentId]
  )

  let categories = []

  // de quy tim tat ca category
  const initCategory = (data, parentId) => {
    data.map((item) => {
      if (item.parentId === parentId) {
        categories.push(item)
        initCategory(data, item.value)
      }
    })
    return categories
  }

  const handleChangeSelection = (value) => {
    let optionSelected
    if (!isMulti) {
      optionSelected = utils.getValueOption(listOptions, value)
      onChange(path, optionSelected)
    } else {
      const isDeselected = value.some((v) => {
        return v.key === `remove all`
      })
      const isSelectAll = value.some((v) => {
        return v.key === `select all`
      })
      if (isDeselected) {
        setRemoveAll(false)
        setSelectAll(true)
        optionSelected = utils.getValueOption(listOptions, null)
      } else if (isSelectAll) {
        setSelectAll(false)
        setRemoveAll(true)
        optionSelected = utils.getValueOption(listOptions, listOptions)
      } else
        optionSelected = utils.getValueOption(listOptions, value)
      onChange(path, optionSelected)
    }
  }

  const handleResetData = (listCategories, currentId, parentId) => {
    let options = []
    if (listCategories && listCategories.length > 0) {
      options = listCategories.map((category) => {
        return {
          value: isProduct ? category._id : category.index,
          label: category.name,
          key: isProduct ? category._id : category.index,
          parentId: category.parentId?._id,
          option: category.option
        }
      })
    }
    if (currentId) {
      const index = options.findIndex(item => item.value === currentId)
      if (index > -1) {
        options.splice(index, 1)
      }
    }
    // let mapOption = []
    if (parentId) {
      options = initCategory(options, parentId)
      // options.map(item => {
      //   if(item.parentId === parentId){
      //     mapOption.push(item)
      //     options.map(child => {
      //       if(child.parentId === item._id)
      //       mapOption.push(item)
      //     })
      //   }
      //   return mapOption
      // })
    }
    // let listOptions = utils.initValueToOption(value, mapOption.length > 0 ? mapOption : options)
    let listOptions = utils.initValueToOption(value, options)

    if (isMulti && listOptions) {
      if (value) {
        setSelectAll(listOptions.length !== value.length)
        setRemoveAll(!!value.length)
      } else
        setSelectAll(true)
    }
    setListOptions(listOptions)
  }

  const valueSelected = utils.getValueOption(listOptions, value)

  let options = convertOption(showCategoryParent, listOptions)

  if (hideSelected && exception && exception.length > 0) {
    options = options.filter(item => !exception.includes(item.value))
  }

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
          id="Placeholder.SelectCategory"
          defaultMessage="Select Category"
        />}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      style={{ width: '100%' }}
      className='custom-select-antd'
      dropdownRender={(menu) => (
        <div className='custom-selection'>
          <PerfectScrollbar>
            {menu}
          </PerfectScrollbar>
        </div>
      )}
      suffixIcon={<Icon type='caret-down' />}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      onChange={handleChangeSelection}
      onBlur={handleBlurOption}
    >
      {
        isMulti ?
          [
            <Option
              key={`select all`} value={`select all`}
              className={className({
                'd-none': !selectAll
              })}>Select All</Option>,
            <Option
              key={`remove all`} value={`remove all`}
              className={className({
                'd-none': !removeAll
              })}>Remove All</Option>
          ]
          : null
      }
      {
        options && options.length > 0
          ? options.map(item =>
            <Option key={item.key}>
              {item.label}
            </Option>)
          : null
      }
    </Select>
  )
}

CustomSelect.defaultProps = {
  isMulti: false,
  isClearable: false,
  isDisabled: false,
  hideSelected: false
}

CustomSelect.propTypes = {
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleBlurOption: PropTypes.func,
  path: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  hideSelected: PropTypes.bool,
  exception: PropTypes.array,
  onBlur: PropTypes.func,
  isProduct: PropTypes.bool
}

const customSelect = withSelect({
  pathName: queryPath.CATEGORY_SELECT_PATH,
  defaultPath: 'category',
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = selectServices.initQuerySelectCategoryProduct()
    loadDataPagerCallback(queryClause)
  }
})

export default customSelect(CustomSelect)
