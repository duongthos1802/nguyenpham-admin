// lib
import React, { useCallback, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
// HoCs
import { withSearch } from '../../hocs/withSearch'
// constant
import { DEFAULT_PAGE_SIZE, queryPath, enumType } from '../../constants'
import { resource, routes } from '../../routes'
// extensions
import { queryStringHelper } from '../../extensions'
// services
import { productService } from '../../services'
// components
import { ColSearch, CustomCard, SearchBox } from '../../components'
import { CustomCreateButton } from '../../components/Button'
import DataGrid from './DataGrid'
import { CategorySelect, EnumSelect } from '../../components/Select'
import utils from '../../utils'
// actions
import categoryActions from '../../actions/categoryActions'

const Search = ({ search, handleSearchClick, parentId }) => (
  <div className='row'>
    <ColSearch
      label='Keyword'
      customCol='col-lg-4'
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
      customCol='col-lg-4'
    >
      <CategorySelect
        isProduct={true}
        value={search.category}
        isClearable={true}
        path='category'
        onChange={(path, value) => handleSearchClick(path,
          value && value.value ? value.value : null)}
        parentId={parentId}
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
      customCol='col-lg-4'
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

  const dispatch = useDispatch()

  const loadData = useCallback(
    (queryClause) => dispatch(categoryActions.serachCategoryByOption(queryClause, queryPath.CATEGORY_QUERY)),
    [dispatch]
  )

  const state = useSelector(state => {
    return {
      parentId: state?.category?.category ?? null
    }
  })

  useEffect(() => {
    const clause = `option: ${enumType.optionsCategory.PRODUCT}`
    loadData(clause)
  }, [dispatch])

  const {
    pageIndex,
    pageSize
  } = queryStringHelper.getSizeAndIndexPage(search, DEFAULT_PAGE_SIZE)

  const {
    countConnection,
    dataGrid
  } = utils.getCountAndDataGridItems(
    data,
    'searchProducts',
    pageSize,
    pageIndex
  )

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
        parentId={state.parentId}
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
  deleteData: (values, { updateDataCallback }) => {
    const queryClause = productService.initQueryDeleteRecipe(values)
    updateDataCallback(queryClause)
  }
})

export default customSearch(Index)