import React from 'react'
import { Table as AntTable } from 'antd'
import PropTypes from 'prop-types'

const Table = (props) => {
  const {
    columns,
    rowSelection,
    dataGrid,
    total,
    showPagination,
    pageIndex,
    pageSize,
    handleChangePageIndex,
    handleChangePageSize,
    footer,
    onRowClick,
    onChangeTable,
    rowKey
  } = props

  const initPaginationProps = () => {
    if (showPagination) {
      return {
        hideOnSinglePage: true,
        size: 'default',
        current: Number(pageIndex),
        pageSize: Number(pageSize),
        showSizeChanger: true,
        total: total,
        onChange: handleChangePageIndex,
        onShowSizeChange: handleChangePageSize
      }
    }
    return false
  }

  return (
    <AntTable
      rowKey={(record) => rowKey ? rowKey(record) : Math.random()}
      rowClassName={`custom-table-row`}
      scroll={{ x: 'max-content' }}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataGrid}
      bordered={false}
      pagination={initPaginationProps()}
      footer={footer}
      onRow={(record, rowIndex) => ({
        onClick: () => onRowClick ? onRowClick(record, rowIndex) : null
      })}
      onChange={(pagination, filters, sorter, extra) => {
        if (onChangeTable) {
          onChangeTable(pagination, filters, sorter, extra)
        }
      }}
    />
  )
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rowSelection: PropTypes.array,
  dataGrid: PropTypes.array,
  total: PropTypes.number,
  showPagination: PropTypes.bool,
  pageIndex: PropTypes.any,
  pageSize: PropTypes.any,
  handleChangePageIndex: PropTypes.func,
  handleChangePageSize: PropTypes.func,
  footer: PropTypes.func,
  onRowClick: PropTypes.func,
  onChangeTable: PropTypes.func,
  rowKey: PropTypes.any
}

export default Table