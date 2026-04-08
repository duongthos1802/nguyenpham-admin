import React, { useCallback, useEffect } from 'react'
import { withUpdate } from '../../hocs/withUpdate'
import { enumType, queryPath } from '../../constants'
import { categoryService, productService } from '../../services'
import Form from './Form'
import { routes } from '../../routes'
import { useDispatch, useSelector } from 'react-redux'
import dataActions from '../../actions/dataActions'

const Edit = (props) => {
  const {
    formError,
    data,
    handleSubmitForm,
    handleCancelForm
  } = props

  const productDetail = data && data.product
    ? data.product
    : null

  const dispatch = useDispatch()

  const loadData = useCallback(
    (queryClause) => dispatch(dataActions.loadDataPager(queryClause, queryPath.CATEGORY_QUERY)),
    [dispatch]
  )
  const state = useSelector(state => {
    return {
      data: state.data ? state.data.get(queryPath.CATEGORY_QUERY) : null
    }
  })
  useEffect(
    () => {
      const queryClause = categoryService.initQuerySearchCategoryByOption(enumType.optionsCategory.PRODUCT)
      loadData(queryClause)
    }, [dispatch])

    const parentId = state.data?.searchCategories?.items[0]?._id ?? null


  return (
    <Form
      formError={formError}
      data={productDetail}
      mode={enumType.mode.edit}
      handleCancel={handleCancelForm}
      handleSubmit={handleSubmitForm}
      // parentId={parentId}
    />
  )
}

const customUpdate = withUpdate({
  pathName: queryPath.PRODUCT_QUERY,
  loadData: (values, { loadDataCallback }) => {
    const query = `_id: "${values}"`
    loadDataCallback(query)
  },
  updateData: (values, { updateDataCallback }) => {
    const query = productService.initQueryCreateOrUpdateProduct({
      values: values,
      productId: values._id
    })
    updateDataCallback(query)
  },
  pathRedirect: routes.ADMIN_PRODUCT
})

export default customUpdate(Edit)