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
import { bannersServices, selectServices } from '../../services'

const Search = ({ search, handleSearchClick }) => (
  <div className='row d-flex justify-content-end'>
    <ColSearch customCol={'col-xl-4'}>
      <div className="d-flex">
        <CustomCreateButton
          resource={resource.MENU_MANAGEMENT_BANNER_GROUP}
          linkUrl={routes.ROUTE_BANNER_GROUP_CREATE}
          action={enumType.action.Write}
          labelName="Create banner group"
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
    dataField: 'bannerGroups',
    connectionField: 'bannerGroupsCount',
    pageSize: pageSize,
    pageIndex: pageIndex
  })

  return (
    <CustomCard
      isMobile={isMobile}
      title={
        <strong>
          <span className='text-uppercase'>
            <FormattedMessage
              id="Title.BannerGroups"
              defaultMessage="Banner Groups"
            />
          </span>
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
  pathName: queryPath.GROUP_BANNERS_QUERY,
  fieldName: <FormattedMessage
    id="Page.BannerGroup"
    defaultMessage="Banner group"
  />,
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = selectServices.initQuerySelectGroupBanner(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  },
  deleteData: (values, { updateDataCallback }) => {
    const queryClause = bannersServices.initQueryUpdateBanner(values)
    updateDataCallback(queryClause)
  }
})

export default customSearch(Index)