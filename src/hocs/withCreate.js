import React, {useCallback, useEffect} from 'react'
// lib
import {useDispatch, useSelector} from 'react-redux'
// action
import dataActions from '../actions/dataActions'
import {resetFormFieldError} from '../actions/formActions'
// hook
import {useDebouncedCallback} from '../hooks/useDebounce'
// component
import {CustomSpin} from '../components'

export const withCreate =
  ({
     pathName,
     pathRedirect,
     enableGoBack,
     createData
   }) => Component => {
    return props => {

      const {
        history,
        auth
      } = props

      // selector
      const state = useSelector(state => ({
        isLoading: state.fetching ? state.fetching.isLoading : false,
        data: state.data ? state.data.get(pathName) : null,
        formError: state.form
      }))
      // dispatch
      const dispatch = useDispatch()

      const resetFormError = useCallback(
        () => dispatch(resetFormFieldError()),
        [dispatch]
      )

      /**
       * load data pager callback
       * @type {function(*=)}
       */
      const loadDataPagerCallback = useCallback(
        (queryClause) => dispatch(dataActions.loadDataPager(queryClause, pathName)),
        [dispatch]
      )

      /**
       * load data callback
       * @type {function(*=)}
       */
      const loadDataCallback = useCallback(
        (queryClause) => dispatch(dataActions.loadData(queryClause, pathName)),
        [dispatch]
      )

      /**
       * create data callback
       * @type {function(*=)}
       */
      const createDataCallback = useCallback(
        (queryClause) => dispatch(dataActions.createData({
          clause: queryClause,
          pathQuery: pathName,
          pathRedirect: pathRedirect,
          enableGoBack: enableGoBack
        })),
        [dispatch]
      )

      const updateDataCallback = useCallback(
        (queryClause) => dispatch(dataActions.updateData({
          clause: queryClause,
          pathQuery: pathName,
          pathRedirect,
          enableGoBack
        })),
        [dispatch]
      )

      useEffect(
        () => {
          resetFormError()
        },
        []
      )

      /**
       * handle cancel form
       * @returns {void|CallHistoryMethodAction<[]>}
       */
      const handleCancelForm = () => history.goBack()

      /**
       * submit form
       */
      const [handleSubmitForm] = useDebouncedCallback(
        // function
        (value) => createData(value, initProps),
        // delay in ms
        1000
      )

      const initProps = {
        ...props,
        formError: state.formError,
        userId: auth && auth.user ? auth.user.id : null,
        user: auth && auth.user ? auth.user : null,
        data: state.data,
        loadDataPagerCallback,
        loadDataCallback,
        createDataCallback,
        updateDataCallback
      }

      return (
        <CustomSpin
          spinning={state.isLoading}
        >
          <Component
            {...initProps}
            handleCancelForm={handleCancelForm}
            handleSubmitForm={handleSubmitForm}
          />
        </CustomSpin>
      )
    }
  }