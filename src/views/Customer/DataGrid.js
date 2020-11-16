import React, { memo } from 'react'
// lib
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider, Tag } from 'antd'
// constant
import { enumType, DEFAULT_FORMAT_DATE_SGN } from '../../constants'
import { routes, resource } from '../../routes'

// component
import { ButtonAction, ButtonDelete } from '../../components/Button'
import { CustomTable } from '../../components'
// extensions
import { redirectPath } from '../../actions/commonAction'
import { datetimeHelper } from '../../extensions'
import CustomerStatus from '../../components/Tag/CustomerStatus'

const DataGrid = (props) => {

  const {
    search,
    data,
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
      title: <FormattedMessage
        id="Grid.name"
        defaultMessage="name"
      />,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <FormattedMessage
        id="Grid.email"
        defaultMessage="Email"
      />,
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: <FormattedMessage
        id="Grid.phone"
        defaultMessage="Phone"
      />,
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: <FormattedMessage
        id="Grid.address"
        defaultMessage="Address"
      />,
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: <FormattedMessage
        id="Grid.Status"
        defaultMessage="Status"
      />,
      dataIndex: 'status',
      key: 'status',
      render: (text) => <CustomerStatus status={text} />
    },
    {
      title: <FormattedMessage
        id="Grid.createdAt"
        defaultMessage="createdAt"
      />,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => datetimeHelper.formatTimeStampToUtcTime(
        text,
        DEFAULT_FORMAT_DATE_SGN
      ),
    },
    {
      title: <FormattedMessage
        id="Grid.Action"
        defaultMessage="Action"
      />,
      className: 'text-center',
      key: 'action',
      render: (text, record) => (
        <div className='d-flex align-items-center justify-content-center'>
          <ButtonAction
            resource={resource.MENU_MANAGEMENT_CUSTOMERS}
            action={enumType.action.View}
            buttonName={
              <FormattedMessage
                id="Button.View"
                defaultMessage="View"
              />
            }
            customClass='bg-transparent border-0 text-primary px-0'
          />
          {record.status !== enumType.customerStatus.Deleted
            ? (
              <div>
                <Divider
                  type='vertical'
                />
                <ButtonDelete
                  type={enumType.buttonTypeComponent.Link}
                  isHiddenIcon={true}
                  resource={resource.MENU_MANAGEMENT_CUSTOMERS}
                  action={enumType.action.Write}
                  record={record}
                  handleChangeItemUpdate={handleChangeItemUpdate}
                  customClass='px-0'
                />
              </div>
            )
            : null
          }
        </div>
      )
    }
  ]

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
        `${routes.ROUTE_CUSTOMERS_EDIT}/${record._id}`)}
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