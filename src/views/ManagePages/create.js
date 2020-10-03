import React from 'react'
import { withCreate } from '../../hocs/withCreate'
import { enumType, queryPath } from '../../constants'
import Form from './Form'
import { managePagesServices } from '../../services'
import utils from '../../utils'
import { FormattedMessage } from 'react-intl'
import { CustomForm } from '../../components'

const Create = (props) => {
  const {
    formError,
    handleSubmitForm,
    handleCancelForm
  } = props
  return (
    <CustomForm
      title={
        <span className='text-uppercase'>
         {utils.initTitleForm(
           <FormattedMessage
             id="Page.ManagePages"
             defaultMessage="Manage Pages"
           />,
           enumType.mode.create
         )}
       </span>
      }
    >
      <Form
        formError={formError}
        mode={enumType.mode.create}
        handleSubmit={handleSubmitForm}
        handleCancel={handleCancelForm}
      />
    </CustomForm>
  )
}

const customCreate = withCreate({
  pathName: queryPath.MANAGE_PAGES_QUERY,
  createData: (values, { createDataCallback }) => {
    const queryClause = managePagesServices.initQueryCreateOrUpdatePage(values)
    createDataCallback(queryClause)
  }
})

export default customCreate(Create)