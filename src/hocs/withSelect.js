import React, {useCallback, useEffect, useState} from 'react'
// lib
import {useDispatch, useSelector} from 'react-redux'
// hook
import {useDebounce} from '../hooks/useDebounce'
// action
import selectActions from '../actions/selectActions'

export const withSelect =
  ({
     pathName,
     loadData,
     defaultPath,
   }) => Component => {
    return props => {

      const {
        path,
        onBlur
      } = props
      const [searchTerm, setSearchTerm] = useState('')

      const debouncedSearchTerm = useDebounce(searchTerm, 100)

      const state = useSelector(state => ({
        auth: state.auth,
        data: state.data ? state.data.get(pathName) : null,
        isLoading: state.fetching ? state.fetching.isLoadingSelect : false
      }))

      const dispatch = useDispatch()

      const loadDataPagerCallback = useCallback(
        (queryClause) => dispatch(selectActions.loadDataPager(queryClause, pathName)),
        [dispatch]
      )

      // useEffect(
      //   () => {
      //     loadData(null, initProps)
      //   },
      //   []
      // )

      useEffect(
        () => {
          loadData(debouncedSearchTerm, initProps)
        },
        [debouncedSearchTerm]
      )

      const handleBlurOption = () => {
        if (onBlur) {
          onBlur(fieldPath, true)
        }
      }

      const fieldPath = path ? path : defaultPath

      const initProps = {
        ...props,
        data: state.data,
        userId: state.auth && state.auth.user ? state.auth.user.id : null,
        isLoading: state.isLoading,
        path: fieldPath,
        loadDataPagerCallback
      }

      return (
        <Component
          {...initProps}
          handleSearch={(value) => setSearchTerm(value)}
          handleBlurOption={handleBlurOption}
        />
      )
    }
  }