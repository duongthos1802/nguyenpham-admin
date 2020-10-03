import React from 'react'
// HoCs
import { withUpdate } from '../../hocs/withUpdate'
// constant
import { enumType, queryPath } from '../../constants'
// services
import { managePagesServices } from '../../services'
// component
import Form from './Form'
import TabEdit from './TabEdit'
import { urlUtils } from '../../utils'
import { redirectPath } from '../../actions/commonAction'

const Edit = (props) => {
  const {
    data,
    match,
    handleSubmitForm
  } = props
  const { id } = match.params
  const page = data && data.page && data.page._id === id
    ? data.page
    : null
  return (
    <TabEdit
      pageId={id}
      page={page}
      activeKey={enumType.pageEditTab.Information}
    >
      <Form
        data={page}
        mode={enumType.mode.edit}
        handleSubmit={handleSubmitForm}
        handleCancel={() => redirectPath(urlUtils.getUrlManagePageList())}
      />
    </TabEdit>
  )
}

const customUpdate = withUpdate({
  pathName: queryPath.MANAGE_PAGES_QUERY,
  loadData: (values, { loadDataCallback }) => {
    const queryClause = `_id: "${values}"`
    loadDataCallback(queryClause)
  },
  updateData: (values, { updateDataCallback }) => {
    const queryClause = managePagesServices.initQueryCreateOrUpdatePage(values)
    updateDataCallback(queryClause)
  },
  pathRedirect: urlUtils.getUrlManagePageList()
})

export default customUpdate(Edit)
