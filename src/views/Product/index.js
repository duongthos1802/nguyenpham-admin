import React from 'react'
// lib
import { FormattedMessage } from 'react-intl'
// HoCs
import { withSearch } from '../../hocs/withSearch'
// constant
import { DEFAULT_PAGE_SIZE, queryPath, enumType, DEFAULT_ISO_FORMAT_DATE } from '../../constants'
import { resource, routes } from '../../routes'
// extensions
import extensions, { queryStringHelper } from '../../extensions'
// services
import { productService } from '../../services'
// components
import { ColSearch, CustomCard, SearchBox, DateRangePicker } from '../../components'
import { CustomCreateButton } from '../../components/Button'
import DataGrid from './DataGrid'
import { CategorySelect, EnumSelect } from '../../components/Select'

const Search = ({ search, handleSearchClick, handleChangeDateRange }) => (
  <div className='row'>
    <ColSearch
      label='Keyword'
      customCol='col-lg-3'
    >
      <FormattedMessage
        id="Placeholder.Keyword"
        defaultMessage="Keyword"
      >
        {
          placeholder => (
            <SearchBox
              placeholder={placeholder}
              value={search.keyword}
              onChange={(keyword) => handleSearchClick('keyword', keyword)}
            />
          )
        }
      </FormattedMessage>
    </ColSearch>
    <ColSearch
      label='Category'
      customCol='col-lg-3'
    >
      <CategorySelect
        isProduct={true}
        value={search.category}
        isClearable={true}
        path='category'
        onChange={(path, value) => handleSearchClick(path,
          value && value.value ? value.value : null)}
      />
    </ColSearch>
    {/* <ColSearch
      label='Date Listed'
      customCol='col-lg-4'
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
    </ColSearch> */}
    <ColSearch
      label='Status'
    >
      <FormattedMessage
        id="Placeholder.ProductStatus"
        defaultMessage="Product Status"
      >
        {
          placeholder => (
            <EnumSelect
              isClearable={true}
              placeholder={placeholder}
              value={search.status}
              labelField='description'
              onChange={(value) => handleSearchClick('status', value)}
              options={enumType.productStatusEnum}
            />
          )
        }
      </FormattedMessage>
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
    dataField: 'products',
    connectionField: 'productsCount',
    pageIndex: pageIndex,
    pageSize: pageSize
  })

  return (
    <CustomCard
      title={
        <strong>
          <FormattedMessage
            id="Title.Product"
            defaultMessage="Product"
          />
        </strong>
      }
      buttonGroup={
        <CustomCreateButton
          resource={resource.MENU_MANAGEMENT_PRODUCT}
          action={enumType.action.Write}
          linkUrl={routes.ROUTE_PRODUCT_CREATE}
          labelName='Create Product'
        />
      }
    >
      <Search
        search={search}
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
  pathName: queryPath.PRODUCT_QUERY,
  fieldName: (
    <FormattedMessage
      id="Page.Product"
      defaultMessage="product"
    />
  ),
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = productService.initQuerySearchProduct(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  },
  deleteData: (values, { deleteDataCallback }) => {
    const queryClause = `_id: "${values._id}"`
    //  deleteDataCallback(queryClause)
  }
})

export default customSearch(Index)