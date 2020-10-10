import React, { useCallback, useEffect } from 'react'
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
import { CategorySelect, EnumSelect } from '../../components/Select'
import utils from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import categoryActions from '../../actions/categoryActions'

const Search = ({ search, handleSearchClick, parentId }) => (
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
              placeholder="Search recipe"
              value={search.keyword}
              onChange={(value) => handleSearchClick('keyword', value)}
            />
          )
        }
      </FormattedMessage>
    </ColSearch>
    <ColSearch
      label='Category'
      customCol='col-lg-3'
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
      customCol='col-lg-3'
    >
      <FormattedMessage
        id="Placeholder.RecipeStatus"
        defaultMessage="Recipe Status"
      >
        {
          placeholder => (
            <EnumSelect
              isClearable={true}
              placeholder={placeholder}
              value={search.status}
              labelField='description'
              onChange={(value) => handleSearchClick('status', value)}
              options={enumType.recipeStatusEnum}
            />
          )
        }
      </FormattedMessage>
    </ColSearch>
    <ColSearch
      label='Level'
      customCol='col-lg-3'
    >
      <FormattedMessage
        id="Placeholder.Level"
        defaultMessage="Level"
      >
        {
          placeholder => (
            <EnumSelect
              isClearable={true}
              placeholder={placeholder}
              value={search.level}
              labelField='description'
              onChange={(value) => handleSearchClick('level', value)}
              options={enumType.recipeLevelEnum}
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
    const clause = `option: ${enumType.optionsCategory.RECIPE}`
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
    'searchRecipes',
    pageSize,
    pageIndex
  )

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
      buttonGroup={
        <CustomCreateButton
          resource={resource.MENU_MANAGEMENT_RECIPES}
          action={enumType.action.Write}
          linkUrl={routes.ROUTE_RECIPES_CREATE}
          labelName='Create Recipe'
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