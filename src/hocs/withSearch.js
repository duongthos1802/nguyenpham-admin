import React, { useCallback, useEffect, useState } from 'react'
// lib
import { useDispatch, useSelector } from 'react-redux'
// action
import dataActions from '../actions/dataActions'
import authActions from '../actions/authActions'
// hook
import { useDebouncedCallback } from '../hooks/useDebounce'
// extensions
import { immutableHelper, queryStringHelper } from '../extensions'
// constant
import { enumType } from '../constants'
// utils
import utils from '../utils'
// component
import { ConfirmModal, CustomSpin } from '../components'
import { usePrevious } from '../hooks/usePrevious'
import { errorCode } from '../constants/error'
import { Modal } from 'antd'
import { FormattedMessage } from 'react-intl'

export const withSearch =
  ({
     loadData,
     fieldName,
     pathName,
     pathRedirect,
     enableGoBack,
     deleteData,
     hideData,
     restoreData,
     removeData,
     publishData,
     resetData,
     lockData
   }) => Component => {

    return props => {
      const {
        location,
        history
      } = props

      // state
      const [firstLoad, setFirstLoad] = useState(true)
      const [formData, setFormData] = useState(
        immutableHelper.initNewImmutableObject(location.search))
      const [openConfirm, setOpenConfirm] = useState(false)
      const [openLogout, setOpenLogout] = useState(false)
      const [itemUpdate, setItemUpdate] = useState(null)
      const [confirmType, setConfirmType] = useState(null)
      const [fieldUpdate, setFieldUpdate] = useState(null)
      const [selectedRowKeys, setSelectedRowKeys] = useState([])
      const [selectedRows, setSelectedRows] = useState([])

      const state = useSelector(state => ({
        auth: state.auth,
        data: state.data ? state.data.get(pathName) : null,
        isLoading: state.fetching ? state.fetching.isLoading : false,
        formError: state.form
      }))

      // dispatch
      const dispatch = useDispatch()
      /**
       * load list data
       * @type {function(*=)}
       */
      const loadDataPagerCallback = useCallback(
        (queryClause) => dispatch(
          dataActions.loadDataPager(queryClause, pathName)),
        [dispatch]
      )

      /**
       * load single data
       * @type {function(*=)}
       */
      const loadDataCallback = useCallback(
        (queryClause) => dispatch(dataActions.loadData(queryClause, pathName)),
        [dispatch]
      )

      /**
       * update data
       * @type {function(*=)}
       */
      const updateDataCallback = useCallback(
        (queryClause) => dispatch(dataActions.updateData({
          clause: queryClause,
          pathQuery: pathName,
          pathRedirect,
          enableGoBack: false
        })),
        [dispatch]
      )

      /**
       * create data
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

      /**
       * delete data
       * @type {function(*=)}
       */
      const deleteDataCallback = useCallback(
        (queryClause) => dispatch(
          dataActions.deleteData(queryClause, pathName)),
        [dispatch]
      )

      /**
       * update many data
       * @type {function(*=)}
       */
      const updateManyDataCallback = useCallback(
        (queryClause) => dispatch(
          dataActions.updateManyData(queryClause, pathName)),
        [dispatch]
      )

      const logoutCallback = useCallback(
        () => dispatch(authActions.logout()),
        [dispatch]
      )

      // callback
      const [debouncedCallback] = useDebouncedCallback(
        () => loadData(formData.toJS(), initProps),
        500
      )

      const debounceLoadData = () => {
        debouncedCallback()
      }

      /**
       * load data when render page
       */
      useEffect(
        () => {
          debounceLoadData()
          if (firstLoad) {
            setFirstLoad(false)
          }
        },
        []
      )

      const previousParams = usePrevious(formData)

      /**
       * reload data when change search params
       */
      useEffect(
        () => {
          if (!firstLoad && JSON.stringify(previousParams) !==
            JSON.stringify(formData)) {
            history.push(renderRoute())
            debounceLoadData()
          }
        },
        [formData]
      )

      /**
       * reload data when exist action create, update, delete
       */
      useEffect(
        () => {
          if (state.data) {
            const {
              isCreateSuccess,
              isUpdateSuccess,
              isDeleteSuccess
            } = state.data
            if (isCreateSuccess || isUpdateSuccess || isDeleteSuccess) {
              debounceLoadData()
            }
          }
        },
        [state.data]
      )

      useEffect(
        () => {
          if (state.formError && state.formError.field ===
            errorCode.UNAUTHENTICATED) {
            setOpenLogout(true)
          }
        },
        [state.formError]
      )

      /**
       * render route
       * @returns {*|string}
       */
      const renderRoute = () => {
        return queryStringHelper.generateQueryString(formData,
          location.pathname)
      }

      const handleResetSearch = () => {
        setFormData(immutableHelper.initNewImmutableObject())
      }

      /**
       * change page index
       * @param page
       * @param pageSize
       */
      const handleChangePageIndex = (page, pageSize) => {
        setFormData(immutableHelper.updatePageIndex(formData, pageSize, page))
      }

      /**
       * change page size
       * @param current
       * @param size
       */
      const handleChangePageSize = (current, size) => {
        setFormData(immutableHelper.updatePageSize(formData, size))
      }

      /**
       * change search params
       * @param path
       * @param value
       */
      const handleSearchClick = (path, value) => {
        setFormData(
          immutableHelper.updateImmutableObject(formData, path, value))
      }

      const handleSearchMultiField = (fieldUpdate) => {
        setFormData(
          immutableHelper.updateMultiSearchField(formData, fieldUpdate))
      }

      /**
       * change table sort
       * @param pagination
       * @param filters
       * @param sorter
       */
      const handleChangeTable = (pagination, filters, sorter) => {
        setFormData(
          immutableHelper.updateImmutableTableChange(formData, pagination,
            filters, sorter))
      }

      /**
       * change date range
       * @param startDateField
       * @param startDate
       * @param endDateField
       * @param endDate
       */
      const handleChangeDateRange = (
        startDateField, startDate, endDateField, endDate) => {
        setFormData(
          immutableHelper.updateDateRange(formData, startDateField, startDate,
            endDateField, endDate))
      }

      /**
       * change item update
       * @param item
       * @param confirmType
       * @param fieldUpdate
       */
      const handleChangeItemUpdate = (item, confirmType, fieldUpdate) => {
        setOpenConfirm(true)
        setItemUpdate(item)
        setConfirmType(confirmType)
        setFieldUpdate(fieldUpdate)
      }

      const handleOpenModalUpdateList = (confirmType, fieldUpdate) => {
        setConfirmType(confirmType)
        setFieldUpdate(fieldUpdate)
      }

      /**
       * reset state
       */
      const handleResetState = () => {
        setOpenConfirm(false)
        setSelectedRowKeys([])
        setSelectedRows([])
        setItemUpdate(null)
        setConfirmType(null)
        setFieldUpdate(null)
      }

      /**
       * accept confirm, close modal
       */
      const handleAcceptConfirm = () => {
        handleResetState()
        switch (confirmType) {
          case enumType.confirmType.Delete:
            deleteData(itemUpdate, initProps)
            break
          case enumType.confirmType.Hide:
            hideData(itemUpdate, initProps)
            break
          case enumType.confirmType.Restore:
            restoreData(itemUpdate, initProps, fieldUpdate)
            break
          case enumType.confirmType.Remove:
            removeData(itemUpdate, initProps)
            break
          case enumType.confirmType.Publish:
            publishData(itemUpdate, initProps)
            break
          case enumType.confirmType.Reset:
            resetData(itemUpdate, initProps)
            break
          case enumType.confirmType.Lock:
            lockData(itemUpdate, initProps)
            break
          default:
            break
        }
      }

      const initProps = {
        ...props,
        auth: state.auth,
        userId: state.auth && state.auth.user ? state.auth.user.id : null,
        loadDataPagerCallback,
        loadDataCallback,
        createDataCallback,
        updateDataCallback,
        deleteDataCallback,
        updateManyDataCallback
      }

      const {
        content,
        title
      } = utils.getConfirmModalInfo(confirmType, fieldName)

      const rowSelection = {
        selectedRowKeys,
        selectedRows,
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRowKeys(selectedRowKeys)
          setSelectedRows(selectedRows)
        }
      }


      console.log('auth................', state)
      return (
        <CustomSpin
          spinning={state.isLoading}
        >
          <Component
            {...initProps}
            search={formData.toJS()}
            data={state.data}
            handleSearchClick={handleSearchClick}
            handleChangePageIndex={handleChangePageIndex}
            handleChangePageSize={handleChangePageSize}
            handleChangeTable={handleChangeTable}
            handleChangeItemUpdate={handleChangeItemUpdate}
            handleChangeDateRange={handleChangeDateRange}
            handleResetSearch={handleResetSearch}
            handleSearchMultiField={handleSearchMultiField}
            handleOpenModalUpdateList={handleOpenModalUpdateList}
            handleOpenConfirm={() => setOpenConfirm(true)}
            rowSelection={rowSelection}
          />
          {
            openConfirm
              ? <ConfirmModal
                confirmType={enumType.notification.Warning}
                title={title}
                open={openConfirm}
                handleCloseConfirm={() => handleResetState()}
                handleAcceptConfirm={() => handleAcceptConfirm()}
              >
                {content}
              </ConfirmModal>
              : null
          }
          {
            openLogout
              ? <Modal
                centered={true}
                visible={openLogout}
                title={
                  <FormattedMessage
                    id="Title.Modal.SessionTimeout"
                    defaultMessage="Session Timeout"
                  />
                }
                footer={null}
                onOk={() => logoutCallback()}
                onCancel={() => logoutCallback()}
              >
                <div className="my-3">
                  <FormattedMessage
                    id="Content.Modal.SessionTimeout"
                    defaultMessage="Your session has expired. Please login again."
                  />
                </div>
              </Modal>
              : null
          }
        </CustomSpin>
      )
    }
  }