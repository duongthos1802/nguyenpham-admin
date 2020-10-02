import React from 'react'
import { routes, resource } from '../../../routes'
//components
import {
  ColSearch,
  CustomCard,
  SearchBox
} from '../../../components'
import { FormattedMessage } from 'react-intl'
import Grid from './Grid'
import { CustomCreateButton } from '../../../components/Button'
//extensions
import extensions, { queryStringHelper } from '../../../extensions'
//constants
import {
  enumType,
  queryPath,
  DEFAULT_PAGE_SIZE
} from '../../../constants'
//HoCs
import { withSearch } from '../../../hocs/withSearch'
//services
import { bannersServices } from '../../../services'

const Search = ({ search, handleSearchClick, _idBannerGroup }) => (
  <div className='row d-flex justify-content-end'>
    <ColSearch customCol={'col-xl-4'}>
      <div className="d-flex">
        <CustomCreateButton
          resource={resource.MENU_MANAGEMENT_BANNER}
          linkUrl={`${routes.ADMIN_BANNER_GROUP}/${_idBannerGroup}/banner/create`}
          action={enumType.action.Write}
          labelName="Create banner"
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
    handleChangeTable,
    match
  } = props

  const {
    pageSize,
    pageIndex
  } = queryStringHelper.getSizeAndIndexPage(search, DEFAULT_PAGE_SIZE)

  const { _id } = match.params

  const {
    total,
    dataGrid
  } = extensions.getDataAndCount({
    data: data,
    dataField: 'banners',
    connectionField: 'bannersCount',
    pageIndex: pageIndex,
    pageSize: pageSize
  })
  return (
    <CustomCard
      isMobile={isMobile}
      title={
        <strong>
          <FormattedMessage
            id="Title.Category"
            defaultMessage={`BANNERS`}
          />
        </strong>
      }
    >
      <Search
        search={search}
        handleSearchClick={handleSearchClick}
        _idBannerGroup={_id}
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
        idBannerGroup={_id}
      />
    </CustomCard>
  )
}

const customSearch = withSearch({
  pathName: queryPath.BANNERS_QUERY,
  fieldName: <FormattedMessage
    id="Page.Banners"
    defaultMessage="Banners"
  />,
  loadData: (values, { loadDataPagerCallback, match }) => {
    const { _id } = match.params
    const queryClause = bannersServices.initQuerySearchBanners(values,
      DEFAULT_PAGE_SIZE, _id)
    loadDataPagerCallback(queryClause)
  },
  deleteData: (values, { updateDataCallback }) => {
    const queryClause = bannersServices.initQueryUpdateBanner(values)
    updateDataCallback(queryClause)
  }
})

export default customSearch(Index)