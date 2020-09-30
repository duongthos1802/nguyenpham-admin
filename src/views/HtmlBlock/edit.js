import React from 'react'
import { withUpdate } from '../../hocs/withUpdate'
import { enumType, queryPath } from '../../constants'
import { htmlBlockServices } from '../../services'
import Form from './Form'
import { routes } from '../../routes'

const Edit = (props) => {
  const {
    match,
    formError,
    data,
    handleSubmitForm,
    handleCancelForm
  } = props

  const { id } = match.params

  const blockDetail = data && data.htmlBlock && data.htmlBlock._id === id
    ? data.htmlBlock
    : null
  return blockDetail
    ? (
      <Form
        formError={formError}
        data={blockDetail}
        mode={enumType.mode.edit}
        handleCancel={handleCancelForm}
        handleSubmit={handleSubmitForm}
      />
    )
    : null
}

const customUpdate = withUpdate({
  pathName: queryPath.HTML_BLOCK_QUERY,
  loadData: (values, { loadDataCallback }) => {
    const query = `_id: "${values}"`
    loadDataCallback(query)
  },
  updateData: (values, { updateDataCallback }) => {
    const query = htmlBlockServices.initQueryCreateOrUpdateHtmlBlock(values)
    updateDataCallback(query)
  },
  pathRedirect: routes.ADMIN_HTML_BLOCK
})

export default customUpdate(Edit)