import React, { useEffect, useRef } from 'react'
// lib
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Form as AntForm, Input, Row, Col, InputNumber } from 'antd'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
// constant
import { enumType } from '../../constants'
import { resource } from '../../routes'
import { validateError } from '../../constants/validate'
// extensions
import { formikHelper, htmlHelper, stringHelper, yupHelper } from '../../extensions'
// utils
import utils from '../../utils'
// components
import { CustomForm, Editor, ErrorMessage, FooterForm, UploadImage } from '../../components'
import { errorCode } from '../../constants/error'
import { CategorySelect, EnumSelect } from '../../components/Select'

const FormItem = AntForm.Item

const customFormik = withFormik({
  validationSchema: Yup.object().shape({
    title: yupHelper.stringRequired,
    url: yupHelper.stringRequired.url(validateError.url),
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
  mapPropsToValues: ({ data }) => {
    const videoPictures = formikHelper.getListImageValueField({
      data: data,
      fieldName: 'pictures',
      imageType: enumType.imagePath.Video,
      fileNameField: 'filename',
    })

    const fileUpload = videoPictures && videoPictures.length > 0 ? videoPictures : []

    return {
      _id: formikHelper.getDefaultValueField(data, '_id', null),
      title: formikHelper.getDefaultValueField(data, 'title', null),
      url: formikHelper.getDefaultValueField(data, 'url', null),
      content: htmlHelper.decodeContent(
        formikHelper.getDefaultValueField(data, 'content', null)
      ),
      category: utils.formatObjectSelect(
        data ? data.category : null,
        '_id',
        'name'
      ),
      fileUpload: fileUpload,
      status: formikHelper.getDefaultValueField(data, 'status',
        enumType.videoStatus.Published),
    }

  },
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values)
  },
  displayName: 'VideoForm'
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
    handleCancel,
    parentId
  } = props

  useEffect(
    () => {
      resetForm()
    },
    [data]
  )

  return (
    <CustomForm
      title={
        <span>
          {
            utils.initTitleForm(
              <FormattedMessage
                id="Page.Video"
                defaultMessage="Video"
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
              label={
                <FormattedMessage
                  id="Label.Title"
                  defaultMessage="Title"
                />
              }
              className='mb-0'
            >
              <Input
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
              required={true}
              label={
                <FormattedMessage
                  id="Label.Url"
                  defaultMessage="Url"
                />
              }
              className='mb-0'
            >
              <FormattedMessage
                id="Label.Url"
                defaultMessage="Url"
              >
                {
                  placeholder => (
                    <Input
                      placeholder={placeholder}
                      value={values.url}
                      onChange={(input) => {
                        setFieldValue('url', input.target.value)
                      }}
                      onBlur={() => setFieldTouched('url', true)}
                      className={
                        classNames({
                          'has-error': formikHelper.checkFieldError(errors,
                            touched, 'url')
                        })
                      }
                    />
                  )
                }
              </FormattedMessage>
            </FormItem>

            <FormItem
              label={
                <FormattedMessage
                  id="Label.Category"
                  defaultMessage="Category"
                />
              }
              className="mb-0"
            >
              <FormattedMessage id="Label.Category" defaultMessage="Category">
                {() => (
                  <CategorySelect
                    isProduct={true}
                    isClearable={true}
                    value={values.category}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    path={'category'}
                    parentId={parentId}
                  />
                )}
              </FormattedMessage>
              <ErrorMessage
                fieldName="category"
                errors={errors}
                touched={touched}
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
                  id="Label.Image"
                  defaultMessage="Image"
                />
              }
              className='mb-0'
            >
              <UploadImage
                type={enumType.uploadType.Video}
                name={'fileUpload'}
                data={values.fileUpload}
                showUploadList={true}
                multiple={true}
                handleUploadFile={(file) => setFieldValue('fileUpload', file)}
                handleChangeFile={(fileList) => setFieldValue('fileUpload',
                  fileList)}
              />
            </FormItem>
            <FormItem
              required={true}
              label={
                <FormattedMessage
                  id="Label.Status"
                  defaultMessage="Status"
                />
              }
              className='mb-0'
            >
              <EnumSelect
                options={enumType.videoStatusEnum}
                value={values.status}
                onChange={(value) => setFieldValue('status', value)}
                isClearable={false}
                onBlur={() => setFieldTouched('status', true)}
              />
              <ErrorMessage
                errors={errors}
                touched={touched}
                fieldName='status'
                isValidate={true}
              />
            </FormItem>

          </Col>
        </Row>

        <FooterForm
          handleSubmit={handleSubmit}
          resource={resource.MENU_VIDEOS}
          handleCancel={handleCancel}
          buttonSave={
            mode === enumType.mode.create
              ? 'Add Video'
              : 'Save Changes'
          }
        />
      </AntForm>
    </CustomForm>
  )
}

export default customFormik(Form)