import React from 'react'
// lib
import { FormattedMessage } from 'react-intl'
// HoCs
import { withSearch } from '../../hocs/withSearch'
// constant
import { DEFAULT_PAGE_SIZE, enumType, queryPath } from '../../constants'
import { resource, routes } from '../../routes'
// extensions
import extensions, { queryStringHelper } from '../../extensions'
// services
import { customerServices } from '../../services'
// components
import { ColSearch, CustomCard, SearchBox } from '../../components'
import { CustomCreateButton, ButtonExportExcel } from '../../components/Button'
import DataGrid from './DataGrid'

const Search = ({ data, search, handleSearchClick }) => (
  <div className='row'>
    <ColSearch
      customCol='col-xl-7 ml-auto search-header'
    >
      <div className='d-flex'>
        <div className='mr-4'>
          <ButtonExportExcel data={data} />
        </div>

        <CustomCreateButton
          resource={resource.MENU_MANAGEMENT_CUSTOMERS}
          action={enumType.action.Write}
          linkUrl={routes.ROUTE_CUSTOMERS_CREATE}
          labelName='Add Customer'
        />

        <SearchBox
          value={search.keyword}
          onChange={(value) => handleSearchClick('keyword', value)}
        />
      </div>
    </ColSearch>
  </div>
)

const Index = (props) => {
  const {
    data,
    search,
    handleSearchClick,
    handleChangePageSize,
    handleChangePageIndex,
    handleChangeItemUpdate,
    handleChangeTable
  } = props

  const {
    pageIndex,
    pageSize
  } = queryStringHelper.getSizeAndIndexPage(search, DEFAULT_PAGE_SIZE)

  const {
    total,
    dataGrid
  } = extensions.getDataAndCount({
    data: data,
    dataField: 'customers',
    connectionField: 'customersCount',
    pageSize: pageSize,
    pageIndex: pageIndex
  })

  return (
    <CustomCard
      title={
        <strong>
          <FormattedMessage
            id="Title.Customers"
            defaultMessage="Customers"
          />
        </strong>
      }
    >
      <Search
        search={search}
        data={dataGrid}
        handleSearchClick={handleSearchClick}
      />
      <DataGrid
        search={search}
        data={dataGrid}
        total={total}
        handleChangeItemUpdate={handleChangeItemUpdate}
        handleChangeTable={handleChangeTable}
        handleChangePageIndex={handleChangePageIndex}
        handleChangePageSize={handleChangePageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </CustomCard>
  )
}

const customSearch = withSearch({
  pathName: queryPath.CUSTOMER_QUERY,
  fieldName: (
    <FormattedMessage
      id="Page.Customer"
      defaultMessage="Customer"
    />
  ),
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = customerServices.initQuerySearchCustomer(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  },
  deleteData: (values, { updateDataCallback }) => {
    const queryClause = customerServices.initQueryDeleteCustomer(values)
    updateDataCallback(queryClause)

  }
})

export default customSearch(Index)