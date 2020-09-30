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
import { recipeService } from '../../services'
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
          resource={resource.MENU_MANAGEMENT_RECIPES}
          action={enumType.action.Write}
          linkUrl={routes.ROUTE_RECIPES_CREATE}
          labelName='Create Recipe'
        />
        <SearchBox
          placeholder="Search recipe"
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
    dataField: 'recipes',
    connectionField: 'recipesCount',
    pageIndex: pageIndex,
    pageSize: pageSize
  })

  return (
    <CustomCard
      title={
        <strong>
          <FormattedMessage
            id="Title.Recipes"
            defaultMessage="Recipes"
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
  pathName: queryPath.RECIPE_QUERY,
  fieldName: (
    <FormattedMessage
      id="Page.Recipe"
      defaultMessage="recipe"
    />
  ),
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = recipeService.initQuerySearchRecipes(values,
      DEFAULT_PAGE_SIZE)
    loadDataPagerCallback(queryClause)
  },
  deleteData: (values, { updateDataCallback }) => {
    const queryClause = recipeService.initQueryDeleteRecipe(values)
    updateDataCallback(queryClause)
  }
})

export default customSearch(Index)