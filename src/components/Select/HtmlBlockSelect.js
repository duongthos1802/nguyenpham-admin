import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'

// lib
import PerfectScrollbar from 'react-perfect-scrollbar'

import { FormattedMessage } from 'react-intl'

// hoc
import { withSelect } from '../../hocs/withSelect'

// constant
import { DEFAULT_PAGE_SIZE, queryPath } from '../../constants'

// services
import { selectServices } from '../../services'

// utils
import utils from '../../utils'

// component
import { Icon, Select, Spin } from 'antd'

const Option = Select.Option

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
    exception
  } = props

  const [listOptions, setListOptions] = useState([])

  useEffect(
    () => {
      console.log(data)
      handleResetData(data && data.htmlBlockGroups && data.htmlBlockGroups.length > 0
        ? data.htmlBlockGroups
        : [])
    },
    [data, value]
  )

  const handleChangeSelection = (value) => {
    const optionSelected = utils.getValueOption(listOptions, value)
    onChange(path, optionSelected)
  }

  const handleResetData = (listHtmlBlocks) => {
    let options = []
    if (listHtmlBlocks && listHtmlBlocks.length > 0) {
      options = listHtmlBlocks.map((htmlBlock) => ({
        value: htmlBlock._id,
        label: htmlBlock.name,
        key: htmlBlock._id
      }))
    }

    let listOptions = utils.initValueToOption(value, options)

    setListOptions(listOptions)
  }

  const valueSelected = utils.getValueOption(listOptions, value)

  let options = listOptions
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
          id="Placeholder.SelectHtmlBlock"
          defaultMessage="Select HtmlBlock"
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
      filterOption={(input, option) => option.props.children.toLowerCase().
        indexOf(input.toLowerCase()) >= 0}
      onChange={handleChangeSelection}
      onBlur={handleBlurOption}
    >
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
  onBlur: PropTypes.func
}

const customSelect = withSelect({
  pathName: queryPath.GROUP_HTML_BLOCK_QUERY,
  defaultPath: 'groupHtmlBlocks',
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = selectServices.initQuerySelectGroupBanner(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  }
})

export default customSelect(CustomSelect)
