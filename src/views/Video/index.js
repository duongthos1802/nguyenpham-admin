import React, { useCallback, useEffect } from 'react'
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
import { videoServices } from '../../services'
// components
import { ColSearch, CustomCard, SearchBox } from '../../components'
import { CustomCreateButton } from '../../components/Button'
import DataGrid from './DataGrid'
import { CategorySelect, EnumSelect } from '../../components/Select'
import utils from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
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
              placeholder="Search video"
              value={search.keyword}
              onChange={(value) => handleSearchClick('keyword', value)}
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
    <ColSearch
      label='Status'
      customCol='col-lg-4'
    >
      <FormattedMessage
        id="Placeholder.Video"
        defaultMessage="Video Status"
      >
        {
          placeholder => (
            <EnumSelect
              isClearable={true}
              placeholder={placeholder}
              value={search.status}
              labelField='description'
              onChange={(value) => handleSearchClick('status', value)}
              options={enumType.videoStatusEnum}
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
    const clause = `option: ${enumType.optionsCategory.VIDEO}`
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
    'searchVideos',
    pageSize,
    pageIndex
  )

  return (
    <CustomCard
      title={
        <strong>
          <FormattedMessage
            id="Title.Videos"
            defaultMessage="Videos"
          />
        </strong>
      }
      buttonGroup={
        <CustomCreateButton
          linkUrl={routes.ROUTE_VIDEOS_CREATE}
          labelName='Create Video'
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
  pathName: queryPath.VIDEO_QUERY,
  fieldName: (
    <FormattedMessage
      id="Page.Video"
      defaultMessage="video"
    />
  ),
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = videoServices.initQuerySearchVideos(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  },
  deleteData: (values, { updateDataCallback }) => {
    const queryClause = videoServices.initQueryDeleteVideo(values)
    updateDataCallback(queryClause)
  }
})

export default customSearch(Index)