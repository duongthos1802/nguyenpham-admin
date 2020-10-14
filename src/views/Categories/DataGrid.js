import React, { memo } from 'react'
// lib
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
// constant
import { enumType } from '../../constants'
import { routes, resource } from '../../routes'
// component
import { ButtonDelete, ButtonAction } from '../../components/Button'
import { CustomTable } from '../../components'
import { ProductImage } from '../../components/Image'
import CategoryStatus from '../../components/Tag/CategoryStatus'
// extensions
import { numberHelper } from '../../extensions'
// utils
import utils, { imageUtils } from '../../utils'
//actions
import { redirectPath } from '../../actions/commonAction'

const DataGrid = (props) => {

  const {
    search,
    data,
    total,
    pageSize,
    pageIndex,
    handleChangePageSize,
    handleChangePageIndex,
    handleChangeTable,
    handleChangeItemUpdate
  } = props

  let header = [
    {
      title: <FormattedMessage
        id="Grid.Index"
        defaultMessage="Index"
      />,
      width: 100,
      dataIndex: 'index',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'index'),
      render: (text, record) => <spa>{record.number}</spa>
    },
    {
      title: <FormattedMessage id="Grid.Image" defaultMessage="Image" />,
      dataIndex: 'imageCategory',
      width: 80,
      render: (text, record) => {
        return (
          <ProductImage
            src={imageUtils.getBannerUrl(record.banner)}
            alt='category-image'
          />
        )
      }
    },
    {
      title: <FormattedMessage
        id="Grid.name"
        defaultMessage="Name"
      />,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <FormattedMessage
        id="Grid.Slug"
        defaultMessage="Slug"
      />,
      dataIndex: 'slug',
      key: 'slug'
    },
    {
      title: <FormattedMessage
        id="Grid.Status"
        defaultMessage="Status"
      />,
      dataIndex: 'status',
      key: 'status',
      render: (text) => <CategoryStatus status={text}/>
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
            resource={resource.MENU_MANAGEMENT_CATEGORIES}
            action={enumType.action.View}
            customClass='bg-transparent border-0 text-primary px-0'
            buttonName={
              <FormattedMessage
                id='Button.View'
                defaultMessage="View"
              />
            }
          />
          <Divider
            type='vertical'
          />
          <ButtonDelete
            type={enumType.buttonTypeComponent.Link}
            isHiddenIcon={true}
            resource={resource.MENU_MANAGEMENT_CATEGORIES}
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
        `${routes.ROUTE_CATEGORIES_EDIT}/${record._id}`)}
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