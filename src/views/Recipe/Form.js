import React, { useEffect, useRef } from 'react'
// lib
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Form as AntForm, Input, Row, Col } from 'antd'
import Checkbox from 'antd/lib/checkbox'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
// constants
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
    status: yupHelper.stringRequired,
    level: yupHelper.stringRequired,
  }),
  mapPropsToValues: ({ data }) => {
    const recipePictures = formikHelper.getListImageValueField({
      data: data,
      fieldName: 'pictures',
      imageType: enumType.imagePath.Recipe,
      fileNameField: 'filename',
    })

    const fileUpload = recipePictures && recipePictures.length > 0 ? recipePictures : []
    return {
      _id: formikHelper.getDefaultValueField(data, '_id', null),
      name: formikHelper.getDefaultValueField(data, 'name', null),
      slug: formikHelper.getDefaultValueField(data, 'slug', null),
      videoUrl: formikHelper.getDefaultValueField(data, 'videoUrl', null),
      category: utils.formatObjectSelect(
        data ? data.category : null,
        '_id',
        'name'
      ),
      description: stringHelper.handleShowLineBreakTextarea(
        formikHelper.getDefaultValueField(data, 'description', null)
      ),
      ingredient: htmlHelper.decodeContent(
        formikHelper.getDefaultValueField(data, 'ingredient', null)
      ),
      method: htmlHelper.decodeContent(
        formikHelper.getDefaultValueField(data, 'method', null)
      ),
      fileUpload: fileUpload,
      level: formikHelper.getDefaultValueField(data, 'level',
        enumType.recipeLevel.Medium),
      status: formikHelper.getDefaultValueField(data, 'status',
        enumType.recipeStatus.Published),
      isPriority: formikHelper.getDefaultValueField(data, 'isPriority', false)
    }
  },
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values)
  },
  displayName: 'RecipeForm'
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

  const onChangeIsPriority = ({target: {checked}}) => {
    const {setValues, values} = props
    setValues({
      ...values,
      isPriority: checked,
    })
  }
  return (
    <CustomForm
      title={
        <span>
          {
            utils.initTitleForm(
              <FormattedMessage
                id="Page.Recipe"
                defaultMessage="Recipe"
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
                  id="Label.videoUrl"
                  defaultMessage="video Url"
                />
              }
              className='mb-0'
            >
              <FormattedMessage
                id="Label.videoUrl"
                defaultMessage="video Url"
              >
                {
                  placeholder => (
                    <Input
                      placeholder={placeholder}
                      value={values.videoUrl}
                      onChange={(input) => {
                        setFieldValue('videoUrl', input.target.value)
                      }}
                      onBlur={() => setFieldTouched('videoUrl', true)}
                      className={
                        classNames({
                          'has-error': formikHelper.checkFieldError(errors,
                            touched, 'videoUrl')
                        })
                      }
                    />
                  )
                }
              </FormattedMessage>
              <ErrorMessage
                fieldName='videoUrl'
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
                    isClearable={true}
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
              required={true}
              label={
                <FormattedMessage
                  id="Label.method"
                  defaultMessage="Method"
                />
              }
              className='mb-0'
            >
              <Editor
                data={values.method}
                handleChange={(value) => setFieldValue('method', value)}
                handleBlur={() => setFieldTouched('method', true)}
                editorConfig='content'
                imageType={enumType.uploadType.Recipe}
              // element='html-block-editor'
              />
              <ErrorMessage
                fieldName='method'
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>

            <FormItem
              required={true}
              label={
                <FormattedMessage
                  id="Label.Ingredient"
                  defaultMessage="Ingredient"
                />
              }
              className='mb-0'
            >
              <Editor
                data={values.ingredient}
                handleChange={(value) => setFieldValue('ingredient', value)}
                handleBlur={() => setFieldTouched('ingredient', true)}
                editorConfig='content'
                imageType={enumType.uploadType.Recipe}
              // element='html-block-editor'
              />
              <ErrorMessage
                fieldName='ingredient'
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
                data={values.fileUpload}
                multiple={true}
                handleUploadFile={(file) => setFieldValue('fileUpload', file)}
                handleChangeFile={(fileList) => setFieldValue('fileUpload',
                  fileList)}
                showUploadList={true}
                type={enumType.uploadType.Recipe}
                showSingleImage={false}
              />
            </FormItem>

            <FormItem
              required={true}
              label={
                <FormattedMessage
                  id="Label.Level"
                  defaultMessage="Level"
                />
              }
              className='mb-0'
            >
              <EnumSelect
                options={enumType.recipeLevelEnum}
                value={values.level}
                onChange={(value) => setFieldValue('level', value)}
                isClearable={false}
                onBlur={() => setFieldTouched('level', true)}
                labelField="description"
              />
              <ErrorMessage
                errors={errors}
                touched={touched}
                fieldName='level'
                isValidate={true}
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
                options={enumType.recipeStatusEnum}
                value={values.status}
                onChange={(value) => setFieldValue('status', value)}
                isClearable={false}
                onBlur={() => setFieldTouched('status', true)}
                labelField="description"
              />
              <ErrorMessage
                errors={errors}
                touched={touched}
                fieldName='status'
                isValidate={true}
              />
            </FormItem>
            <FormItem
              label={
                <FormattedMessage
                  id="Label.Priority"
                  defaultMessage="Priority"
                />
              }
              className='mb-0'
            >
              <Checkbox
                onChange={onChangeIsPriority}
                checked={values.isPriority}
              />
            </FormItem>
          </Col>
        </Row>
        <FooterForm
          handleSubmit={handleSubmit}
          resource={resource.MENU_MANAGEMENT_RECIPES}
          handleCancel={handleCancel}
          buttonSave={
            mode === enumType.mode.create
              ? 'Create Recipe'
              : 'Save Recipe'
          }
        />
      </AntForm>
    </CustomForm >
  )
}

export default customFormik(Form)