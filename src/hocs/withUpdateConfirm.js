import React, {useCallback, useEffect, useState} from 'react'
// lib
import {useDispatch, useSelector} from 'react-redux'
// action
import dataActions from '../actions/dataActions'
// hook
import {useDebouncedCallback} from '../hooks/useDebounce'
// extensions
import {queryStringHelper} from '../extensions'
// component
import {ConfirmModal, CustomSpin} from '../components'

export const withUpdateConfirm =
  ({
     pathName,
     pathRedirect,
     enableGoBack,
     loadData,
     updateData,
     titleConfirm,
     contentConfirm
   }) => Component => {
    return props => {

      const {
        history,
        auth,
        isMobile
      } = props

      // state
      const [openConfirm, setOpenConfirm] = useState(false)
      const [dataSubmit, setDataSubmit] = useState(null)

      // selector
      const state = useSelector(state => ({
        data: state.data ? state.data.get(pathName) : null,
        isLoading: state.fetching ? state.fetching.isLoading : false,
        formError: state.form
      }))

      // dispatch
      const dispatch = useDispatch()

      const loadDataPagerCallback = useCallback(
        (queryClause) => dispatch(dataActions.loadDataPager(queryClause, pathName)),
        [dispatch]
      )

      const loadDataCallback = useCallback(
        (queryClause) => dispatch(dataActions.loadData(queryClause, pathName)),
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

      const [loadDetailCallback] = useDebouncedCallback(
        () => loadData(objectId, initProps),
        500
      )

      /**
       * load data detail when render page
       */
      useEffect(
        () => {
          loadDetailCallback()
        },
        []
      )

      /**
       * handle cancel form
       * @returns {void|CallHistoryMethodAction<[]>}
       */
      const handleCancelForm = () => history.goBack()

      /**
       * handle submit form
       */
      const [handleSubmitForm] = useDebouncedCallback(
        // function
        (value) => updateData(value, initProps),
        // delay in ms
        1000
      )

      /**
       * handle submit form
       * @param data
       */
      const handleSubmit = (data) => {
        setDataSubmit(data)
        setOpenConfirm(true)
      }

      /**
       * accept confirm
       */
      const handleAcceptConfirm = () => {
        handleSubmitForm(dataSubmit)
        handleCloseConfirm()
      }

      /**
       * close confirm
       */
      const handleCloseConfirm = () => {
        setOpenConfirm(false)
        setDataSubmit(null)
      }

      const objectId = queryStringHelper.getIdParams(props)

      const initProps = {
        ...props,
        userId: auth && auth.user ? auth.user.id : null,
        formError: state.formError,
        objectId,
        data: state.data,
        loadDataPagerCallback,
        loadDataCallback,
        updateDataCallback
      }

      return (
        <CustomSpin
          spinning={state.isLoading}
        >
          <Component
            {...initProps}
            data={state.data}
            handleCancelForm={handleCancelForm}
            handleSubmitForm={handleSubmit}
          />
          <ConfirmModal
            title={titleConfirm}
            open={openConfirm}
            isMobile={isMobile}
            handleAcceptConfirm={() => handleAcceptConfirm()}
            handleCloseConfirm={() => handleCloseConfirm()}
          >
            {contentConfirm}
          </ConfirmModal>
        </CustomSpin>
      )
    }
  }