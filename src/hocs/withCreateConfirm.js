import React, { useCallback, useEffect, useState } from 'react'
// lib
import { useDispatch, useSelector } from 'react-redux'
// action
import dataActions from '../actions/dataActions'
// hook
import { useDebouncedCallback } from '../hooks/useDebounce'
// component
import { ConfirmModal, CustomSpin } from '../components'

export const withCreateConfirm =
  ({
     pathName,
     pathRedirect,
     enableGoBack,
     createData,
     titleConfirm,
     contentConfirm
   }) => Component => {
    return props => {

      const {
        history,
        auth,
        isMobile
      } = props

      const [openConfirm, setOpenConfirm] = useState(false)
      const [dataSubmit, setDataSubmit] = useState(null)
      const [content, setContent] = useState(null)
      const [isCancel, setIsCancel] = useState(false)

      // selector
      const state = useSelector(state => ({
        data: state.data ? state.data.get(pathName) : null,
        isLoading: state.fetching ? state.fetching.isLoading : false,
        formError: state.form
      }))
      // dispatch
      const dispatch = useDispatch()

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

      const loadDataCallback = useCallback(
        (queryClause) => dispatch(dataActions.loadData(queryClause, pathName)),
        [dispatch]
      )

      useEffect(
        () => {
          setContent(contentConfirm(dataSubmit))
        },
        [dataSubmit]
      )

      /**
       * handle cancel form
       * @returns {void|CallHistoryMethodAction<[]>}
       */
      const handleCancelForm = () => history.goBack()

      /**
       * submit form debounce
       */
      const [handleSubmitForm] = useDebouncedCallback(
        // function
        (values) => createData(values, initProps),
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
        setIsCancel(false)
      }

      const handleCancelConfirm = () => {
        setIsCancel(true)
        handleCloseConfirm()
      }

      /**
       * close confirm
       */
      const handleCloseConfirm = () => {
        setOpenConfirm(false)
        setDataSubmit(null)
      }

      const initProps = {
        ...props,
        data: state.data,
        formError: state.formError,
        userId: auth && auth.user ? auth.user.id : null,
        createDataCallback,
        updateDataCallback,
        loadDataCallback
      }

      return (
        <CustomSpin
          spinning={state.isLoading}
        >
          <Component
            {...initProps}
            isCancel={isCancel}
            handleCancelForm={handleCancelForm}
            handleSubmitForm={handleSubmit}
          />
          <ConfirmModal
            title={titleConfirm}
            open={openConfirm}
            isMobile={isMobile}
            handleAcceptConfirm={() => handleAcceptConfirm()}
            handleCloseConfirm={() => handleCancelConfirm()}
            saveText={'Confirm'}
          >
            {content}
          </ConfirmModal>
        </CustomSpin>
      )
    }
  }