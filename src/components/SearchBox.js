import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { useDebounce } from '../hooks/useDebounce'

const { Search } = Input

const SearchBox = (props) => {
  const {
    value,
    enterButton = true,
    onChange,
    placeholder
  } = props
  // state
  const [searchTerm, setSearchTerm] = useState(value)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(
    () => {
      setSearchTerm(value)
    },
    [value]
  )

  useEffect(
    () => {
      if (!enterButton) {
        onChange(debouncedSearchTerm)
      }
    },
    [debouncedSearchTerm]
  )

  const handleButtonSearch = () => {
    onChange(searchTerm)
  }

  // render
  return (
    <Search
      className={props.className}
      placeholder={placeholder}
      type={props.type}
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      onSearch={handleButtonSearch}
    />
  )
}

SearchBox.propTypes = {
  value: PropTypes.string,
  enterButton: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.any
}

export default SearchBox