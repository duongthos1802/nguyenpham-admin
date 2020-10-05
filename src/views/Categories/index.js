import React from 'react'
// lib
import { FormattedMessage } from 'react-intl'
// HoCs
import { withSearch } from '../../hocs/withSearch'
// constant
import { DEFAULT_PAGE_SIZE, queryPath, enumType } from '../../constants'
import { resource, routes } from '../../routes'
// extensions
import extensions, { queryStringHelper } from '../../extensions'
// services
import { categoryService } from '../../services'
// components
import { ColSearch, CustomCard, SearchBox } from '../../components'
import { CustomCreateButton } from '../../components/Button'
import DataGrid from './DataGrid'
import { EnumSelect } from '../../components/Select'
import utils from '../../utils'

const Search = ({ search, handleSearchClick }) => (
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
              placeholder="Search category"
              value={search.keyword}
              onChange={(value) => handleSearchClick('keyword', value)}
            />
          )
        }
      </FormattedMessage>
    </ColSearch>
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
              options={enumType.categoryStatusEnum}
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
    countConnection,
    dataGrid
  } = utils.getCountAndDataGridItems(
    data,
    'searchCategories'
  )

  return (
    <CustomCard
      title={
        <strong>
          <FormattedMessage
            id="Title.Categories"
            defaultMessage="Categories"
          />
        </strong>
      }
      buttonGroup={
        <CustomCreateButton
          resource={resource.MENU_MANAGEMENT_CATEGORIES}
          action={enumType.action.Write}
          linkUrl={routes.ROUTE_CATEGORIES_CREATE}
          labelName='Create Category'
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
  pathName: queryPath.CATEGORY_QUERY,
  fieldName: (
    <FormattedMessage
      id="Page.Category"
      defaultMessage="category"
    />
  ),
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = categoryService.initQuerySearchCategories(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  },
  deleteData: (values, { updateDataCallback }) => {
    const queryClause = categoryService.initQueryDeleteCategory(values)
    updateDataCallback(queryClause)
  }
})

export default customSearch(Index)