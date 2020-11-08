import React, { useEffect, useRef } from 'react'
// lib
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Form as AntForm, Input, Row, Col } from 'antd'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
// constant
import { enumType } from '../../constants'
import { resource } from '../../routes'
import { validateError } from '../../constants/validate'
// extensions
import { formikHelper, htmlHelper, yupHelper, stringHelper } from '../../extensions'
// utils
import utils from '../../utils'
// components
import { CustomForm, Editor, ErrorMessage, FooterForm, UploadImage } from '../../components'
import { errorCode } from '../../constants/error'
import { HtmlBlockSelect } from '../../components/Select'

const FormItem = AntForm.Item

const customFormik = withFormik({
  validationSchema: Yup.object().shape({
    code: yupHelper.stringRequired,
  }),
  mapPropsToValues: ({ data }) => {
    return {
      id: formikHelper.getDefaultValueField(data, '_id', null),
      code: formikHelper.getDefaultValueField(data, 'code', null),
      title: formikHelper.getDefaultValueField(data, 'title', null),
      description: stringHelper.handleShowLineBreakTextarea(
        formikHelper.getDefaultValueField(data, 'description', null)
      ),
      content: htmlHelper.decodeContent(
        formikHelper.getDefaultValueField(data, 'content', null)
      ),
      htmlBlockGroup: utils.formatObjectSelect(
        data ? data.htmlBlockGroup : null,
        '_id',
        'name'
      ),
      fileUpload: formikHelper.getImageValueField(data, 'images',
        enumType.imagePath.Html_Block),
      image: formikHelper.getImageValueField(data, 'images',
        enumType.imagePath.Html_Block),
    }

  },
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
        <Row
          gutter={30}
        >
          <Col lg={16}>
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
              label={
                <FormattedMessage
                  id="Label.Title"
                  defaultMessage="Title"
                />
              }
              className='mb-0'
            >
              <Input
                ref={codeRef}
                value={values.title}
                onChange={(value) => setFieldValue('title', value.target.value)}
                onBlur={() => setFieldTouched('title', true)}
                className={
                  classNames({
                    'has-error': formikHelper.checkFieldError(errors, touched,
                      'title')
                  })
                }
              />
            </FormItem>

            <FormItem
              label={
                <FormattedMessage
                  id="Label.Description"
                  defaultMessage="Description"
                />
              }
              className='mb-0'
            >
              <Input.TextArea
                rows={5}
                className='height-auto'
                value={values.description}
                onChange={(input) => {
                  setFieldValue('description', input.target.value)
                }}
                onBlur={() => setFieldTouched('description', true)}
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
              // element='html-block-editor'
              />
              <ErrorMessage
                fieldName='content'
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>
          </Col>
          <Col lg={8}>
            <FormItem
              label={
                <FormattedMessage
                  id="Label.Html.Block.Group"
                  defaultMessage="Html Block Group"
                />
              }
              className="mb-0"
            >
              <div className="d-flex">
                <div className="mr-2 w-100">
                  <FormattedMessage
                    id="Label.Html.Block.Group"
                    defaultMessage="Html Block Group"
                  >
                    {
                      (placeholder) => (
                        <HtmlBlockSelect
                          placeholder={placeholder}
                          value={values.htmlBlockGroup}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          path={'htmlBlockGroup'}
                        />
                      )
                    }
                  </FormattedMessage>
                </div>
              </div>
            </FormItem>

            <FormItem
              label={
                <FormattedMessage
                  id="Label.Image"
                  defaultMessage="Image"
                />
              }
              className='mb-0'
            >
              <UploadImage
                type={enumType.uploadType.Html_Block}
                name={'fileUpload'}
                data={values.fileUpload}
                showUploadList={true}
                multiple={false}
                handleUploadFile={(file) => setFieldValue('fileUpload', file)}
                handleChangeFile={(fileList) => setFieldValue('fileUpload',
                  fileList)}
              />
            </FormItem>
          </Col>
        </Row>

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