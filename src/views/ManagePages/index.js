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
import { managePagesServices } from '../../services'
// components
import { ColSearch, CustomCard, SearchBox } from '../../components'
import { CustomCreateButton } from '../../components/Button'
import DataGrid from './DataGrid'

const Search = ({ search, handleSearchClick }) => (
  <div className='row'>
    <ColSearch
      customCol='col-xl-5 ml-auto'
    >
      <div className='d-flex'>
        <CustomCreateButton
          resource={resource.MENU_MANAGEMENT_PAGES}
          action={enumType.action.Write}
          linkUrl={routes.ROUTE_MANAGE_PAGES_CREATE}
          labelName='Add Page'
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
    dataField: 'pages',
    connectionField: 'pagesCount',
    pageIndex: pageIndex,
    pageSize: pageSize
  })

  return (
    <CustomCard
      title={
        <strong>
          <FormattedMessage
            id="Title.ManagePages"
            defaultMessage="Manage Pages"
          />
        </strong>
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
  pathName: queryPath.MANAGE_PAGES_QUERY,
  fieldName: (
    <FormattedMessage
      id="Page.ManagePages"
      defaultMessage="Manage Pages"
    />
  ),
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = managePagesServices.initQuerySearchPages(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  },
  deleteData: (values, { deleteDataCallback }) => {
    const queryClause = `_id: "${values._id}"`
    deleteDataCallback(queryClause)
  }
})

export default customSearch(Index)