import React from 'react'
// lib
import { FormattedMessage } from 'react-intl'
// HoCs
import { withSearch } from '../../hocs/withSearch'
// constant
import { DEFAULT_PAGE_SIZE, queryPath, enumType } from '../../constants'
import { resource, routes } from '../../routes'
// extensions
import { queryStringHelper } from '../../extensions'
// services
import { blogServices } from '../../services'
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
      customCol='col-lg-3'
    >
      <FormattedMessage
        id="Placeholder.Keyword"
        defaultMessage="Keyword"
      >
        {
          placeholder => (
            <SearchBox
              placeholder="Search blog"
              value={search.keyword}
              onChange={(value) => handleSearchClick('keyword', value)}
            />
          )
        }
      </FormattedMessage>
    </ColSearch>
    <ColSearch
      label='Status'
      customCol='col-lg-3'
    >
      <FormattedMessage
        id="Placeholder.Blog"
        defaultMessage="Blog Status"
      >
        {
          placeholder => (
            <EnumSelect
              isClearable={true}
              placeholder={placeholder}
              value={search.status}
              labelField='description'
              onChange={(value) => handleSearchClick('status', value)}
              options={enumType.blogStatusEnum}
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
    'searchBlogs',
    pageSize,
    pageIndex
  )

  return (
    <CustomCard
      title={
        <strong>
          <FormattedMessage
            id="Title.Blogs"
            defaultMessage="Blogs"
          />
        </strong>
      }
      buttonGroup={
        <CustomCreateButton
          linkUrl={routes.ROUTE_BLOGS_CREATE}
          labelName='Create Blog'
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
  pathName: queryPath.BLOG_QUERY,
  fieldName: (
    <FormattedMessage
      id="Page.Blog"
      defaultMessage="blog"
    />
  ),
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = blogServices.initQuerySearchBlogs(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  },
  deleteData: (values, { updateDataCallback }) => {
    const queryClause = blogServices.initQueryDeleteBlog(values)
    updateDataCallback(queryClause)
  }
})

export default customSearch(Index)