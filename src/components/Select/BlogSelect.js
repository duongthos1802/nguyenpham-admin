import React, { useEffect, useState } from 'react'
// lib
import { FormattedMessage } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
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
import PropTypes from 'prop-types'

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
      handleResetData(data ? data.blogs : null)
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

  const handleResetData = (blogs) => {


    console.log("blogs=====", blogs);
    
    let options = []
    if (blogs && blogs.length > 0) {
      options = blogs.map((blog) => ({
        value: blog._id,
        key: blog._id,
        label: blog.name
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
          id="Placeholder.SelectBlog"
          defaultMessage="Select Blog"
        />}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
      suffixIcon={<Icon type='caret-down' />}
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
  pathName: queryPath.BLOG_SELECT_PATH,
  defaultPath: 'blog',
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = selectServices.initQuerySelectBlog(values,
      300)

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