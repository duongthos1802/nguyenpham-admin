import React from 'react'
import Form from './Form'
import { enumType, queryPath } from '../../constants'
import { withUpdate } from '../../hocs/withUpdate'
import { faqServices } from '../../services'

const Edit = props => {

  const {
    data,
    auth,
    isMobile,
    formError,
    handleSubmitForm,
    handleCancelForm
  } = props
  
  const faqDetail = data && data.faq
    ? data.faq
    : null
    
  return (
    <Form
      mode={enumType.mode.edit}
      formError={formError}
      data={faqDetail}
      auth={auth}
      isMobile={isMobile}
      handleSubmit={handleSubmitForm}
      handleCancel={handleCancelForm}
    />
  )
}

const customUpdate = withUpdate({
  pathName: queryPath.FAQ_QUERY,
  loadData: (value, { loadDataCallback }) => {
    const queryClause = `_id: "${value}"`
    loadDataCallback(queryClause)
  },
  updateData: (values, { updateDataCallback, objectId }) => {
    const queryClause = faqServices.initQueryCreateOrUpdateFAQ(values, objectId)
    updateDataCallback(queryClause)
  }
})

export default customUpdate(Edit)
