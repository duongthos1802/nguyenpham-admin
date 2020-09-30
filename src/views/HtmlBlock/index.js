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
import { htmlBlockServices } from '../../services'
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
          resource={resource.MENU_HTML_BLOCK_MANAGEMENT}
          action={enumType.action.Write}
          linkUrl={routes.ROUTE_HTML_BLOCK_CREATE}
          labelName='Add Html Block'
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
    dataField: 'htmlBlocks',
    connectionField: 'htmlBlocksCount',
    pageSize: pageSize,
    pageIndex: pageIndex
  })

  return (
    <CustomCard
      title={
        <strong>
          <FormattedMessage
            id="Title.HtmlBlock"
            defaultMessage="Html Block"
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
  pathName: queryPath.HTML_BLOCK_QUERY,
  fieldName: (
    <FormattedMessage
      id="Page.HtmlBlock"
      defaultMessage="html block"
    />
  ),
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = htmlBlockServices.initQuerySearchHtmlBlock(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  },
  deleteData: (values, { deleteDataCallback }) => {
    const queryClause = `_id: "${values._id}"`
    deleteDataCallback(queryClause)
  }
})

export default customSearch(Index)