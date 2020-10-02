import React, { memo } from 'react'
// lib
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider, Button } from 'antd'
// actions
import { redirectPath } from '../../actions/commonAction'
// constant
import { enumType } from '../../constants'
import { routes, resource } from '../../routes'
// utils
import utils from '../../utils'
// component
import { ButtonAction } from '../../components/Button'
import { CustomTable } from '../../components'
// extensions
import { htmlHelper } from '../../extensions'

const DataGrid = (props) => {

  const {
    data,
    auth,
    total,
    pageSize,
    pageIndex,
    handleChangePageSize,
    handleChangePageIndex,
    handleChangeTable
  } = props

  let header = [

    {
      title: <FormattedMessage id="Grid.Name" defaultMessage="Name"/>,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <FormattedMessage
        id="Grid.Description"
        defaultMessage="Description"/>,
      dataIndex: 'description',
      key: 'description',
      render: (text) => htmlHelper.parseHtmlContent(text)
    }

  ]

  const enableEdit = utils.checkPermission(
    enumType.action.Write,
    resource.MENU_MANAGEMENT_BANNER_GROUP,
    auth
  )

  if (enableEdit) {
    header.push(
      {
        title: <FormattedMessage id="Grid.Action" defaultMessage="Action"/>,
        className: 'text-center',
        key: 'Delete',
        render: (text, record) => (
          <div className='d-flex align-items-center justify-content-center'>
            <ButtonAction
              action={enumType.action.View}
              resource={resource.MENU_MANAGEMENT_BANNER_GROUP}
              customClass='bg-transparent border-0 text-primary px-0'
              buttonName={<FormattedMessage
                id="Button.View"
                defaultMessage="View"
              />}
            />
            <Divider
              type={'vertical'}
            />

            <Button onClick={
              (e) => {
                e.stopPropagation()
                redirectPath(
                  `${routes.ADMIN_BANNER_GROUP}/${record._id}/banner`)
              }
            }
                    className="border-0 ant-btn-link">
              View Banner
            </Button>
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
        `${routes.ROUTE_BANNER_GROUP_EDIT}/${record._id}`)}
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