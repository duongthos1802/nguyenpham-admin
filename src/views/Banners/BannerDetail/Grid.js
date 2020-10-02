import React, { memo } from 'react'
// lib
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Tag, Divider, Button } from 'antd'
import classNames from 'classnames'
// constant
import { enumType } from '../../../constants'
import { routes, resource } from '../../../routes'
// utils
import utils from '../../../utils'
import { getBannerUrl } from '../../../utils/image'
// component
import { ButtonAction, ButtonDelete } from '../../../components/Button'
import { CustomTable } from '../../../components'
// extensions
import { redirectPath } from '../../../actions/commonAction'
import { htmlHelper } from '../../../extensions'

const DataGrid = (props) => {

  const {
    search,
    data,
    auth,
    total,
    pageSize,
    pageIndex,
    idBannerGroup,
    handleChangePageSize,
    handleChangePageIndex,
    handleChangeItemUpdate,
    handleChangeTable
  } = props

  let header = [
    {
      title: <FormattedMessage id="Grid.Image" defaultMessage="Image"/>,
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => {
        return <img
          style={{ width: '80px', margin: 'auto' }}
          src={getBannerUrl(
            record.images.length ? record.images[0] : record.image)}
          alt={'banners'}/>
      }
    },
    {
      title: <FormattedMessage id="Grid.Name" defaultMessage="Name"/>,
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'name')
    },
    {
      title: <FormattedMessage
        id="Grid.Description"
        defaultMessage="Description"/>,
      dataIndex: 'description',
      key: 'description',
      render: (text) => htmlHelper.parseHtmlContent(text)
    },
    {
      title: <FormattedMessage id="Grid.Published" defaultMessage="Published"/>,
      dataIndex: 'published',
      key: 'published',
      render: (text, record) => {
        return <Tag color={classNames({
          'green': record.published,
          'red': !record.published
        })}>
          {record.published ? `Published` : `Unpublished`}
        </Tag>
      }
    }
  ]

  const enableEdit = utils.checkPermission(
    enumType.action.Write,
    resource.MENU_MANAGEMENT_BANNER,
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
              resource={resource.MENU_MANAGEMENT_BANNER}
              customClass='bg-transparent border-0 text-primary px-0'
              buttonName={<FormattedMessage
                id="Button.View"
                defaultMessage="View"
              />}
            />
            <Divider
              type={'vertical'}
            />

            <Button
              onClick={
                (e) => {
                  e.stopPropagation()
                  redirectPath(`${routes.ADMIN_BANNER_GROUP}`)
                }}
              className="border-0 ant-btn-link px-0">
              View Banner Group
            </Button>

            <Divider
              type={'vertical'}
            />

            <ButtonDelete
              type={enumType.buttonTypeComponent.Link}
              isHiddenIcon={true}
              resource={resource.MENU_MANAGEMENT_BANNER}
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
        `${routes.ADMIN_BANNER_GROUP}/${idBannerGroup}/banner/${record._id}`)}
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