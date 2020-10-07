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
import RecipeStatus from '../../components/Tag/RecipeStatus'
import RecipeLevel from '../../components/Tag/RecipeLevel'
// extensions
import { numberHelper } from '../../extensions'
// utils
import utils, { imageUtils } from '../../utils'
//actions
import { redirectPath } from '../../actions/commonAction'
import RecipePriority from '../../components/Tag/RecipePriority'

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
      align: 'center',
      dataIndex: 'index',
      key: 'index',
      render: (text) => numberHelper.formatNumber(text, false)
    },
    {
      title: <FormattedMessage id="Grid.Image" defaultMessage="Image" />,
      dataIndex: 'pictures',
      width: 100,
      align: 'center',
      render: (text, record) => {
        return (
          <ProductImage
            src={imageUtils.getBannerUrl(record.pictures[0], enumType.imagePath.Recipe)}
            alt='recipe-pictures'
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
      key: 'name',
      align: 'center'
    },
    {
      title: <FormattedMessage id="Grid.Category" defaultMessage="Category" />,
      dataIndex: 'category',
      key: 'category',
      sorter: true,
      render: (text) => text ? text.name : null,
      sortOrder: utils.getSortDirection(search, 'category')
    },
    {
      title: <FormattedMessage
        id="Grid.level"
        defaultMessage="Level"
      />,
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      render: (text) => <RecipeLevel status={text} />
    },
    {
      title: <FormattedMessage
        id="Grid.Status"
        defaultMessage="Status"
      />,
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (text) => <RecipeStatus status={text} />
    },
    {
      title: <FormattedMessage
        id="Grid.Priority"
        defaultMessage="Priority"
      />,
      dataIndex: 'isPriority',
      align: 'center',
      key: 'isPriority',
      render: (text) => <RecipePriority status={text} />
    },
    {
      title: <FormattedMessage
        id="Grid.Action"
        defaultMessage="Action"
      />,
      align: 'center',
      key: 'action',
      render: (text, record) => {
        return (
          <div className='d-flex align-items-center justify-content-center'>
            <ButtonAction
              customClass='bg-transparent border-0 text-primary px-0'
              buttonName={
                <FormattedMessage
                  id='Button.View'
                  defaultMessage="View"
                />
              }
              handleClickButton={() => redirectPath(
                `${routes.ROUTE_RECIPES_EDIT}/${record._id}`)}
            />
            {record.status !== enumType.recipeStatus.Deleted
              ? (
                <div>
                  <Divider
                    type='vertical'
                  />
                  <ButtonDelete
                    type={enumType.buttonTypeComponent.Link}
                    isHiddenIcon={true}
                    resource={resource.MENU_MANAGEMENT_RECIPES}
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
    // onRowClick={(record) => redirectPath(
    //   `${routes.ROUTE_RECIPES_EDIT}/${record._id}`)}
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