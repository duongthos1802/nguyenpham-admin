import React from 'react'
// lib
import { FormattedMessage } from 'react-intl'
// HoCs
import { withSearch } from '../../hocs/withSearch'
// constant
import { DEFAULT_PAGE_SIZE, enumType, queryPath, DEFAULT_ISO_FORMAT_DATE } from '../../constants'
import { resource, routes } from '../../routes'
// extensions
import extensions, { queryStringHelper } from '../../extensions'
// services
import { customerServices } from '../../services'
// components
import { ColSearch, CustomCard, SearchBox, DateRangePicker } from '../../components'
import { CustomCreateButton, ButtonExportExcel } from '../../components/Button'
import DataGrid from './DataGrid'
import { EnumSelect } from '../../components/Select'
import utils from '../../utils'

const Search = ({ data, search, handleSearchClick, handleChangeDateRange }) => (
  <div className='row'>
    <ColSearch
      // label='Date Listed'
      customCol='col-lg-3'
    >
      <DateRangePicker
        dateFormat={DEFAULT_ISO_FORMAT_DATE}
        startDate={search.startDate}
        endDate={search.endDate}
        startDateField='startDate'
        endDateField='endDate'
        enableClear={true}
        onChange={handleChangeDateRange}
      />
    </ColSearch>
    <ColSearch
      // label='Status'
      customCol='col-lg-2'
    >
      <FormattedMessage
        id="Placeholder.Status"
        defaultMessage="Status"
      >
        {
          placeholder => (
            <EnumSelect
              isClearable={true}
              placeholder={placeholder}
              value={search.status}
              labelField='description'
              onChange={(value) => handleSearchClick('status', value)}
              options={enumType.customerStatusEnum}
            />
          )
        }
      </FormattedMessage>
    </ColSearch>
    <ColSearch
      customCol='col-xl-6 ml-auto search-header'
    >
      <div className='d-flex justify-content-end'>
        <div className='mr-4'>
          <ButtonExportExcel data={data} />
        </div>

        <CustomCreateButton
          resource={resource.MENU_MANAGEMENT_CUSTOMERS}
          action={enumType.action.Write}
          linkUrl={routes.ROUTE_CUSTOMERS_CREATE}
          labelName='Add Customer'
        />

        {/* <SearchBox
          value={search.keyword}
          onChange={(value) => handleSearchClick('keyword', value)}
        /> */}
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
    handleChangeTable,
    handleChangeDateRange
  } = props

  const {
    pageIndex,
    pageSize
  } = queryStringHelper.getSizeAndIndexPage(search, DEFAULT_PAGE_SIZE)

  const {
    countConnection,
    dataGrid
  } = utils.getCountAndDataGridItems(
    data,
    'searchCustomer')

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
        handleChangeDateRange={handleChangeDateRange}
      />
      <DataGrid
        search={search}
        data={dataGrid}
        total={countConnection}
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