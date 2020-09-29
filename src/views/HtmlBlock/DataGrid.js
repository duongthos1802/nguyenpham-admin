import React, { memo } from 'react'
// lib
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
// constant
import { enumType } from '../../constants'
import { routes, resource } from '../../routes'
// utils
import utils from '../../utils'
// component
import { ButtonAction, ButtonDelete } from '../../components/Button'
import { CustomTable } from '../../components'
// extensions
import { redirectPath } from '../../actions/commonAction'
import { numberHelper } from '../../extensions'

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
        id="Grid.Index"
        defaultMessage="Index"
      />,
      dataIndex: 'index',
      key: 'index',
      render: (text) => numberHelper.formatNumber(text, false)
    },
    {
      title: <FormattedMessage
        id="Grid.Code"
        defaultMessage="Code"
      />,
      dataIndex: 'code',
      key: 'code',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'code')
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
            resource={resource.MENU_HTML_BLOCK_MANAGEMENT}
            action={enumType.action.View}
            buttonName={
              <FormattedMessage
                id="Button.View"
                defaultMessage="View"
              />
            }
            customClass='bg-transparent border-0 text-primary px-0'
          />
          <Divider
            type='vertical'
          />
          <ButtonDelete
            type={enumType.buttonTypeComponent.Link}
            isHiddenIcon={true}
            resource={resource.MENU_HTML_BLOCK_MANAGEMENT}
            action={enumType.action.Write}
            record={record}
            handleChangeItemUpdate={handleChangeItemUpdate}
            customClass='px-0'
          />
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
        `${routes.ROUTE_HTML_BLOCK_EDIT}/${record._id}`)}
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