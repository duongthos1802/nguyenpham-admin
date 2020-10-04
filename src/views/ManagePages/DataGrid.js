import React, { memo } from 'react'
// lib
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
// constant
import { enumType } from '../../constants'
import { resource } from '../../routes'
// component
import { ButtonAction } from '../../components/Button'
import { CustomTable } from '../../components'
// extensions
import { redirectPath } from '../../actions/commonAction'
import { numberHelper } from '../../extensions'
import { urlUtils } from '../../utils'

const DataGrid = (props) => {

  const {
    data,
    total,
    pageSize,
    pageIndex,
    handleChangePageSize,
    handleChangePageIndex,
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
        id="Grid.Page"
        defaultMessage="Page"
      />,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <FormattedMessage
        id="Grid.Url"
        defaultMessage="Url"
      />,
      dataIndex: 'urlFrontEnd',
      key: 'url',
      render: (text) => {
        const urlFE = `${process.env.REACT_APP_FRONT_END_URL}${text}`
        return (
          <a
            href={urlFE}
            target={'_blank'}
          >
            {urlFE}
          </a>
        )
      }
    },
    {
      title: <FormattedMessage
        id="Grid.Action"
        defaultMessage="Action"
      />,
      className: 'text-center',
      key: 'action',
      render: () => (
        <div className='d-flex align-items-center justify-content-center'>
          <ButtonAction
            resource={resource.MENU_MANAGEMENT_PAGES}
            action={enumType.action.View}
            customClass='bg-transparent border-0 text-primary px-0'
            buttonName={
              <FormattedMessage
                id="Button.View"
                defaultMessage="View"
              />
            }
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
        urlUtils.getUrlEditPage(record._id, enumType.pageEditTab.Information))}
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