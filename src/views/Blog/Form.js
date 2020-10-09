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
import { EnumSelect, CategorySelect } from '../../components/Select'

const FormItem = AntForm.Item

const customFormik = withFormik({
  validationSchema: Yup.object().shape({
    name: yupHelper.stringRequired,
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
    }),
    index: yupHelper.numberRequired
  }),
  mapPropsToValues: ({ data, user }) => {
    console.log('uer', user)
    const blogPictures = formikHelper.getListImageValueField({
      data: data,
      fieldName: 'pictures',
      imageType: enumType.imagePath.Blog,
      fileNameField: 'filename',
    })

    const fileUpload = blogPictures && blogPictures.length > 0 ? blogPictures : []

    return {
      _id: formikHelper.getDefaultValueField(data, '_id', null),
      name: formikHelper.getDefaultValueField(data, 'name', null),
      slug: formikHelper.getDefaultValueField(data, 'slug', null),
      index: formikHelper.getDefaultValueField(data, 'index', null),
      description: utils.handleShowLineBreakTextarea(
        formikHelper.getDefaultValueField(data, 'description', null)
      ),
      content: htmlHelper.decodeContent(
        formikHelper.getDefaultValueField(data, 'content', null)
      ),
      category: utils.formatObjectSelect(
        data ? data.category : null,
        '_id',
        'name'
      ),
      createdBy: user?.username ?? null,
      metaTitle: formikHelper.getDefaultValueField(data, 'metaTitle', null),
      metaDescription: stringHelper.handleShowLineBreakTextarea(
        formikHelper.getDefaultValueField(data, 'metaDescription', null)
      ),
      metaKeyword: formikHelper.getDefaultValueField(data, 'metaKeyword', null),
      fileUpload: fileUpload,
      status: formikHelper.getDefaultValueField(data, 'status',
        enumType.blogStatusEnum.PUBLISHED),
    }

  },
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values)
  },
  displayName: 'BlogForm'
})

const Form = (props) => {
  const {
    formError,
    mode,
    data,
    parentId,
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
  return (
    <CustomForm
      title={
        <span>
          {
            utils.initTitleForm(
              <FormattedMessage
                id="Page.BLog"
                defaultMessage="Blog"
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
              required={true}
              label={
                <FormattedMessage
                  id="Label.Index"
                  defaultMessage="index"
                />
              }
              className='mb-0'
            >
              <FormattedMessage
                id="Label.Index"
                defaultMessage="index"
              >
                {
                  placeholder => (
                    <InputNumber
                      placeholder={placeholder}
                      value={values.index}
                      customClass={classNames({
                        'has-error': formikHelper.checkFieldError(errors, touched,
                          'index')
                      })}
                      onChange={(value) => setFieldValue('index', value)}
                      handleBlur={() => setFieldTouched('index', true)}
                      min={100}
                      max={10000}
                    />
                  )
                }
              </FormattedMessage>
              <ErrorMessage
                errors={errors}
                touched={touched}
                isValidate={true}
                fieldName='index'
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
              label={
                <FormattedMessage
                  id="Label.Description"
                  defaultMessage="Description"
                />
              }
              className='mb-0'
            >

              <Input.TextArea
                placeholder="Description"
                rows={5}
                className='height-auto'
                value={values.description}
                onChange={(input) => {
                  setFieldValue('description', input.target.value)
                }}
                onBlur={() => setFieldTouched('text', true)}
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
            <FormItem
              label={
                <FormattedMessage
                  id="Label.MetaTitle"
                  defaultMessage="Meta Title"
                />
              }
              className='mb-0'
            >
              <Input
                value={values.metaTitle}
                onChange={(value) => setFieldValue('metaTitle',
                  value.target.value)}
                onBlur={() => setFieldTouched('metaTitle', true)}
                className={
                  classNames({
                    'has-error': formikHelper.checkFieldError(errors, touched,
                      'metaTitle')
                  })
                }
              />
              <ErrorMessage
                fieldName='metaTitle'
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>


            <FormItem
              label={
                <FormattedMessage
                  id="Label.MetaDescription"
                  defaultMessage="Meta Description"
                />
              }
              className='mb-0'
            >
              <FormattedMessage
                id="Label.metaDescription"
                defaultMessage="Meta Description"
              >
                {
                  placeholder => (
                    <Input.TextArea
                      placeholder={placeholder}
                      rows={5}
                      className='height-auto'
                      value={values.metaDescription}
                      onChange={(input) => {
                        setFieldValue('metaDescription', input.target.value)
                      }}
                      onBlur={() => setFieldTouched('metaDescription', true)}
                    />
                  )
                }
              </FormattedMessage>
              <ErrorMessage
                fieldName='metaDescription'
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>
            <FormItem
              label={
                <FormattedMessage
                  id="Label.MetaKeyword"
                  defaultMessage="Meta Keyword"
                />
              }
              className='mb-0'
            >
              <Input
                value={values.metaKeyword}
                onChange={(value) => setFieldValue('metaKeyword',
                  value.target.value)}
                onBlur={() => setFieldTouched('metaKeyword', true)}
                className={
                  classNames({
                    'has-error': formikHelper.checkFieldError(errors, touched,
                      'metaKeyword')
                  })
                }
              />
              <ErrorMessage
                fieldName='metaKeyword'
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
                type={enumType.uploadType.Blog}
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
                options={enumType.blogStatusEnum}
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

            <FormItem
              label={
                <FormattedMessage
                  id="Label.Author"
                  defaultMessage="Author"
                />
              }
              className='mb-0'
            >
              <Input
                value={values.createdBy}
                disabled
                placeholder="Author"
                onChange={(value) => setFieldValue('createdBy',
                  value.target.value)}
                onBlur={() => setFieldTouched('createdBy', true)}
                className={
                  classNames({
                    'has-error': formikHelper.checkFieldError(errors, touched,
                      'createdBy')
                  })
                }
              />
              <ErrorMessage
                fieldName='createdBy'
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>

          </Col>
        </Row>

        <FooterForm
          handleSubmit={handleSubmit}
          resource={resource.MENU_BLOGS}
          handleCancel={handleCancel}
          buttonSave={
            mode === enumType.mode.create
              ? 'Add Blog'
              : 'Save Changes'
          }
        />
      </AntForm>
    </CustomForm>
  )
}

export default customFormik(Form)