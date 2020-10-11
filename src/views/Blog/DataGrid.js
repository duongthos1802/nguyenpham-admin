import React, { memo } from 'react'
// lib
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider, Tag } from 'antd'
// constant
import { enumType } from '../../constants'
import { routes, resource } from '../../routes'
// utils
import utils, { imageUtils } from '../../utils'
// component
import { ButtonAction, ButtonDelete } from '../../components/Button'
import { CustomTable } from '../../components'
// extensions
import { redirectPath } from '../../actions/commonAction'
import { numberHelper } from '../../extensions'
import { ProductImage } from '../../components/Image'
import BlogStatus from '../../components/Tag/BlogStatus'

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
      fixed: 'left',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'index'),
      render: (text, record) => numberHelper.formatNumber(record.number, false)
    },
    {
      title: <FormattedMessage id="Grid.Image" defaultMessage="Image" />,
      dataIndex: 'imageBlog',
      width: 80,
      fixed: 'left',
      render: (text, record) => {
        return (
          <ProductImage
            src={imageUtils.getBannerUrl(record.pictures[0], enumType.imagePath.Blog)}
            alt='blog-image'
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
      title: <FormattedMessage id="Grid.Category" defaultMessage="Category" />,
      dataIndex: 'category',
      key: 'category',
      sorter: true,
      fixed: 'right',
      render: (text) => {
        return text
          ? text.name
          : <Tag
            color={'grey'}
          >
            <span className='text-uppercase'>
              null
            </span>
          </Tag>
      },
      sortOrder: utils.getSortDirection(search, 'category')
    },
    {
      title: <FormattedMessage
        id="Grid.Author"
        defaultMessage="Author"
      />,
      fixed: 'right',
      render: (text, record) => {
        return (
          <span>{record.createdBy}</span>
        )
      }
    },
    {
      title: <FormattedMessage
        id="Grid.Status"
        defaultMessage="Status"
      />,
      dataIndex: 'status',
      key: 'status',
      fixed: 'right',
      render: (text) => <BlogStatus status={text}/>
    },
    {
      title: <FormattedMessage
        id="Grid.Action"
        defaultMessage="Action"
      />,
      className: 'text-center',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <div className='d-flex align-items-center justify-content-center'>
          <ButtonAction
            resource={resource.MENU_BLOGS}
            action={enumType.action.View}
            buttonName={
              <FormattedMessage
                id="Button.View"
                defaultMessage="View"
              />
            }
            customClass='bg-transparent border-0 text-primary px-0'
          />
          {record.status !== enumType.blogStatus.Deleted
            ? (
              <div>
                <Divider
                  type='vertical'
                />
                <ButtonDelete
                  type={enumType.buttonTypeComponent.Link}
                  isHiddenIcon={true}
                  resource={resource.MENU_BLOGS}
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
        `${routes.ROUTE_BLOGS_EDIT}/${record._id}`)}
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