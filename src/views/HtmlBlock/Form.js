import React, { useEffect, useRef } from 'react'
// lib
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Form as AntForm, Input } from 'antd'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
// constant
import { enumType } from '../../constants'
import { resource } from '../../routes'
import { validateError } from '../../constants/validate'
// extensions
import { formikHelper, htmlHelper, yupHelper } from '../../extensions'
// utils
import utils from '../../utils'
// components
import { CustomForm, Editor, ErrorMessage, FooterForm } from '../../components'
import { errorCode } from '../../constants/error'

const FormItem = AntForm.Item

const customFormik = withFormik({
  validationSchema: Yup.object().shape({
    code: yupHelper.stringRequired,
    content: yupHelper.stringRequired.test({
      name: 'emptyContent',
      test: (value) => {
        try {
          if (value) {
            const contentRemoveSpace = utils.standardizedContent(value)
            return yupHelper.stringRequired.isValidSync(contentRemoveSpace)
          }
          return false
        } catch (e) {
          return true
        }
      },
      message: validateError.required
    })
  }),
  mapPropsToValues: ({ data }) => ({
    id: formikHelper.getDefaultValueField(data, '_id', null),
    code: formikHelper.getDefaultValueField(data, 'code', null),
    content: htmlHelper.decodeContent(
      formikHelper.getDefaultValueField(data, 'content', null)
    )
  }),
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values)
  },
  displayName: 'HtmlBlockForm'
})

const Form = (props) => {
  const {
    formError,
    mode,
    data,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    handleSubmit,
    resetForm,
    handleCancel
  } = props

  const codeRef = useRef(null)

  useEffect(
    () => {
      resetForm()
    },
    [data]
  )

  useEffect(
    () => {
      if (formError && formError.field === errorCode.CODE_EXIST) {
        setFieldError('code', formError.message)
        if (codeRef && codeRef.current) {
          codeRef.current.focus()
        }
      }
    },
    [formError]
  )

  return (
    <CustomForm
      title={
        <span>
         {
           utils.initTitleForm(
             <FormattedMessage
               id="Page.HtmlBlock"
               defaultMessage="Html Block"
             />,
             mode
           )
         }
       </span>
      }
    >
      <AntForm
        onKeyDown={formikHelper.preventEnterSubmitForm}
        onSubmit={handleSubmit}
      >
        <FormItem
          required={true}
          label={
            <FormattedMessage
              id="Label.Code"
              defaultMessage="Code"
            />
          }
          className='mb-0'
        >
          <Input
            ref={codeRef}
            value={values.code}
            onChange={(value) => setFieldValue('code', value.target.value)}
            onBlur={() => setFieldTouched('code', true)}
            className={
              classNames({
                'has-error': formikHelper.checkFieldError(errors, touched,
                  'code')
              })
            }
          />
          <ErrorMessage
            fieldName='code'
            touched={touched}
            errors={errors}
            isValidate={true}
          />
        </FormItem>
        <FormItem
          required={true}
          label={
            <FormattedMessage
              id="Label.Content"
              defaultMessage="Content"
            />
          }
          className='mb-0'
        >
          <Editor
            data={values.content}
            handleChange={(value) => setFieldValue('content', value)}
            handleBlur={() => setFieldTouched('content', true)}
            editorConfig='content'
            element='html-block-editor'
          />
          <ErrorMessage
            fieldName='content'
            touched={touched}
            errors={errors}
            isValidate={true}
          />
        </FormItem>
        <FooterForm
          handleSubmit={handleSubmit}
          resource={resource.MENU_HTML_BLOCK_MANAGEMENT}
          handleCancel={handleCancel}
          buttonSave={
            mode === enumType.mode.create
              ? 'Add Html Block'
              : 'Save Changes'
          }
        />
      </AntForm>
    </CustomForm>
  )
}

export default customFormik(Form)