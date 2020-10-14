import React, { memo } from 'react'
// lib
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
// constant
import {
  enumType,
  DEFAULT_FORMAT_SHORT_DATE
} from '../../constants'
import { routes, resource } from '../../routes'
// utils
import utils from '../../utils'
// component
import { ButtonAction, ButtonDelete } from '../../components/Button'
import FAQStatus from '../../components/Tag/FAQStatus'
import { CustomTable } from '../../components'
// extensions
import { redirectPath } from '../../actions/commonAction'
import { datetimeHelper } from '../../extensions'

const DataGrid = (props) => {

  const {
    data,
    auth,
    total,
    pageSize,
    pageIndex,
    handleChangePageSize,
    handleChangePageIndex,
    handleChangeItemUpdate,
    handleChangeTable
  } = props

  let header = [
    {
      title: <FormattedMessage id="Grid.Title" defaultMessage="Question"/>,
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: <FormattedMessage id="Grid.Type" defaultMessage="Type"/>,
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: <FormattedMessage id="Grid.Status" defaultMessage="Status"/>,
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <FAQStatus
          status={text}
        />
      )
    },
    {
      title: <FormattedMessage id="Grid.Priority" defaultMessage="Priority"/>,
      dataIndex: 'priority',
      key: 'priority'
    },
    {
      title: <FormattedMessage id="Grid.CreatedAt"
                               defaultMessage="Created At"/>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => {
        return datetimeHelper.formatTimeStampToUtcTime(
          record.createdAt, DEFAULT_FORMAT_SHORT_DATE)
      }
    }
  ]

  const enableEdit = utils.checkPermission(
    enumType.action.Write,
    resource.MENU_MANAGEMENT_FAQ,
    auth
  )

  if (enableEdit) {
    header.push(
      {
        title: <FormattedMessage id="Grid.Action" defaultMessage="Action"/>,
        className: 'text-center',
        key: 'Delete',
        // width: 150,
        render: (text, record) => (
          <div className='d-flex align-items-center justify-content-center'>
            <ButtonAction
              action={enumType.action.View}
              resource={resource.MENU_MANAGEMENT_FAQ}
              customClass='bg-transparent border-0 text-primary px-0'
              buttonName={<FormattedMessage
                id="Button.View"
                defaultMessage="View"
              />}
            />
            <Divider
              type={'vertical'}
            />
            <ButtonDelete
              type={enumType.buttonTypeComponent.Link}
              isHiddenIcon={true}
              resource={resource.MENU_MANAGEMENT_FAQ}
              action={enumType.action.Write}
              record={record}
              handleChangeItemUpdate={handleChangeItemUpdate}
              customClass='px-0'
            />
          </div>
        )
      }
    )
  }

  const dataGrid = data && data.length > 0
    ? data
    : []

  return (
    <CustomTable
      rowKey={record => record._id}
      columns={header}
      dataGrid={dataGrid}
      total={total}
      pageSize={pageSize}
      pageIndex={pageIndex}
      showPagination={true}
      handleChangePageIndex={handleChangePageIndex}
      handleChangePageSize={handleChangePageSize}
      onChangeTable={handleChangeTable}
      onRowClick={(record) => redirectPath(
        `${routes.ROUTE_FAQ_EDIT}/${record._id}`)}
    />
  )
}

DataGrid.propTypes = {
  search: PropTypes.any,
  data: PropTypes.any,
  auth: PropTypes.any,
  total: PropTypes.any,
  pageSize: PropTypes.any,
  pageIndex: PropTypes.any,
  handleChangePageSize: PropTypes.func,
  handleChangePageIndex: PropTypes.func,
  handleChangeItemUpdate: PropTypes.func,
  handleChangeTable: PropTypes.func
}

export default memo(DataGrid)