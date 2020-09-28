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
import { errorCode } from '../../constants/error'
// extensions
import { formikHelper, yupHelper, stringHelper, htmlHelper } from '../../extensions'
// utils
import utils from '../../utils'
// components
import {
  CustomForm,
  ErrorMessage,
  FooterForm,
  UploadImage,
  Editor
} from '../../components'
import { EnumSelect, CategorySelect } from '../../components/Select'

const FormItem = AntForm.Item

const customFormik = withFormik({
  validationSchema: Yup.object().shape({
    name: yupHelper.stringRequired,
    slug: yupHelper.stringRequired,
    status: yupHelper.stringRequired
  }),
  mapPropsToValues: ({ data }) => ({
    _id: formikHelper.getDefaultValueField(data, '_id', null),
    name: formikHelper.getDefaultValueField(data, 'name', null),
    slug: formikHelper.getDefaultValueField(data, 'slug', null),
    description: stringHelper.handleShowLineBreakTextarea(
      formikHelper.getDefaultValueField(data, 'description', null)
    ),
    category: utils.formatObjectSelect(
      data ? data.category : null,
      '_id',
      'name'
    ),
    logo: formikHelper.getImageValueField(data, 'logo', enumType.imagePath.Banner),
    image: formikHelper.getImageValueField(data, 'image',
      enumType.imagePath.Banner),
    packing: htmlHelper.decodeContent(
      formikHelper.getDefaultValueField(data, 'packing', null)
    ),
    tutorial: htmlHelper.decodeContent(
      formikHelper.getDefaultValueField(data, 'tutorial', null)
    ),
    attribute: htmlHelper.decodeContent(
      formikHelper.getDefaultValueField(data, 'attribute', null)
    ),
    status: formikHelper.getDefaultValueField(data, 'status',
      enumType.categoryStatus.PUBLISHED),
  }),
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values)
  },
  displayName: 'ProductForm'
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

  console.log({ data, values })

  const nameRef = useRef(null)
  const slugRef = useRef(null)

  useEffect(
    () => {
      resetForm()
    },
    [data]
  )

  useEffect(
    () => {
      if (formError) {
        switch (formError.field) {
          case errorCode.NAME_EXIST: {
            setFieldError('name', formError.message)
            if (nameRef && nameRef.current) {
              nameRef.current.focus()
            }
            break
          }
          case errorCode.SLUG_EXIST: {
            setFieldError('slug', formError.message)
            if (slugRef && slugRef.current) {
              slugRef.current.focus()
            }
            break
          }
          default:
            break
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
                id="Page.Product"
                defaultMessage="Product"
              />,
              mode
            )
          }
        </span>
      }
    >
      <AntForm
        // onKeyDown={formikHelper.preventEnterSubmitForm}
        onSubmit={handleSubmit}
      >
        <Row
          gutter={30}
        >
          <Col
            lg={16}
          >
            <FormItem
              required={true}
              label={
                <FormattedMessage
                  id="Label.Name"
                  defaultMessage="Name"
                />
              }
              className='mb-0'
            >
              <Input
                ref={nameRef}
                value={values.name}
                onChange={(value) => {
                  const name = value.target.value
                  const slug = stringHelper.generateSlug(name)
                  setFieldValue('name', name)
                  setFieldValue('slug', slug)
                }}
                onBlur={() => setFieldTouched('name', true)}
                className={
                  classNames({
                    'has-error': formikHelper.checkFieldError(errors, touched,
                      'name')
                  })
                }
              />
              <ErrorMessage
                fieldName='name'
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>

            <FormItem
              required={true}
              label={
                <FormattedMessage
                  id="Label.slug"
                  defaultMessage="Slug"
                />
              }
              className='mb-0'
            >
              <Input
                ref={slugRef}
                disabled
                value={values.slug}
                className={
                  classNames({
                    'has-error': formikHelper.checkFieldError(errors, touched,
                      'slug')
                  })
                }
              />
              <ErrorMessage
                fieldName='slug'
                touched={touched}
                errors={errors}
                isValidate={true}
              />
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
                    value={values.category}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    path={'category'}
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
              label={
                <FormattedMessage
                  id="Label.attribute"
                  defaultMessage="attribute"
                />
              }
              className='mb-0'
            >
              <Editor
                data={values.attribute}
                handleChange={(value) => setFieldValue('attribute', value)}
                handleBlur={() => setFieldTouched('attribute', true)}
                editorConfig='content'
              // element='html-block-editor'
              />
              <ErrorMessage
                fieldName='attribute'
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>

            <FormItem
              label={
                <FormattedMessage
                  id="Label.tutorial"
                  defaultMessage="tutorial"
                />
              }
              className='mb-0'
            >
              <Editor
                data={values.tutorial}
                handleChange={(value) => setFieldValue('tutorial', value)}
                handleBlur={() => setFieldTouched('tutorial', true)}
                editorConfig='content'
              // element='html-block-editor'
              />
              <ErrorMessage
                fieldName='tutorial'
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>

            <FormItem
              required={true}
              label={
                <FormattedMessage
                  id="Label.packing"
                  defaultMessage="packing"
                />
              }
              className='mb-0'
            >
              <Editor
                data={values.packing}
                handleChange={(value) => setFieldValue('packing', value)}
                handleBlur={() => setFieldTouched('packing', true)}
                editorConfig='content'
              // element='html-block-editor'
              />
              <ErrorMessage
                fieldName='packing'
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>


          </Col>
          <Col
            lg={8}
          >
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
                name={'icon'}
                data={values.image}
                multiple={false}
                handleUploadFile={(file) => setFieldValue('image', file)}
                handleChangeFile={(fileList) => setFieldValue('image',
                  fileList)}
                showUploadList={true}
                type={enumType.uploadType.Banner}
                showSingleImage={false}
              />
            </FormItem>

            <FormItem
              label={
                <FormattedMessage
                  id="Label.Logo"
                  defaultMessage="Logo Hãng"
                />
              }
              className='mb-0'
            >
              <UploadImage
                name={'icon'}
                data={values.logo}
                multiple={false}
                handleUploadFile={(file) => setFieldValue('logo', file)}
                handleChangeFile={(fileList) => setFieldValue('logo',
                  fileList)}
                showUploadList={true}
                type={enumType.uploadType.Banner}
                showSingleImage={false}
              />
            </FormItem>

            <FormItem
              required={true}
              label={
                <FormattedMessage id="Label.Status " defaultMessage="Status" />
              }
              className="mb-0"
            >
              <EnumSelect
                options={enumType.productStatusEnum}
                value={values.status}
                fieldName="status"
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                isClearable={false}
                labelField="description"
              />
              <div className="custom-error" />
            </FormItem>
          </Col>

        </Row>
        <FooterForm
          handleSubmit={handleSubmit}
          resource={resource.MENU_MANAGEMENT_PRODUCT}
          handleCancel={handleCancel}
          buttonSave={
            mode === enumType.mode.create
              ? 'Add Product'
              : 'Save Product'
          }
        />
      </AntForm>
    </CustomForm >
  )
}

export default customFormik(Form)