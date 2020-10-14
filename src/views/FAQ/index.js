import React from 'react'
import { routes, resource } from '../../routes'
//components
import {
  ColSearch,
  CustomCard,
  SearchBox
} from '../../components'
import { FormattedMessage } from 'react-intl'
import Grid from './Grid'
import { CustomCreateButton } from '../../components/Button'
//extensions
import extensions, { queryStringHelper } from '../../extensions'
//constants
import {
  enumType,
  queryPath,
  DEFAULT_PAGE_SIZE
} from '../../constants'
//HoCs
import { withSearch } from '../../hocs/withSearch'
//services
import { faqServices } from '../../services'

const Search = ({ search, handleSearchClick }) => (
  <div className='row d-flex justify-content-end'>
    <ColSearch customCol={'col-xl-4'}>
      <div className="d-flex">
        <CustomCreateButton
          resource={resource.MENU_MANAGEMENT_FAQ}
          linkUrl={routes.ROUTE_FAQ_CREATE}
          action={enumType.action.Write}
          labelName="Create FAQ"
        />

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
      </div>
    </ColSearch>
  </div>
)

const Index = (props) => {
  const {
    auth,
    isMobile,
    data,
    search,
    handleChangePageSize,
    handleChangePageIndex,
    handleSearchClick,
    handleChangeItemUpdate,
    handleChangeTable
  } = props

  const {
    pageSize,
    pageIndex
  } = queryStringHelper.getSizeAndIndexPage(search, DEFAULT_PAGE_SIZE)

  const {
    total,
    dataGrid
  } = extensions.getDataAndCount({
    data: data,
    dataField: 'faqs',
    connectionField: 'faqsCount',
    pageSize: pageSize,
    pageIndex: pageIndex
  })

  return (
    <CustomCard
      isMobile={isMobile}
      title={
        <strong>
          <FormattedMessage
            id="Title.FAQ"
            defaultMessage={`FAQ`}
          />
        </strong>
      }
    >
      <Search
        search={search}
        handleSearchClick={handleSearchClick}
      />
      <Grid
        search={search}
        isMobile={isMobile}
        data={dataGrid}
        total={total}
        pageIndex={pageIndex}
        pageSize={pageSize}
        auth={auth}
        handleChangeItemUpdate={handleChangeItemUpdate}
        handleChangePageIndex={handleChangePageIndex}
        handleChangePageSize={handleChangePageSize}
        handleChangeTable={handleChangeTable}
      />
    </CustomCard>
  )
}

const customSearch = withSearch({
  pathName: queryPath.FAQ_QUERY,
  fieldName: <FormattedMessage
    id="Page.FAQs"
    defaultMessage="FAQs"
  />,
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = faqServices.initQuerySearchFAQs(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  },
  deleteData: (values, { updateDataCallback }) => {
    const queryClause = faqServices.initQueryDeleteFAQ(values)
    updateDataCallback(queryClause)
  }
})

export default customSearch(Index)