import React, { useEffect } from 'react'
// lib
import { withFormik } from 'formik/dist/index'
import * as Yup from 'yup'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { Form, Input } from 'antd/lib/index'
import { Checkbox } from 'antd'
// constant
import { FORM_ITEM_LAYOUT, enumType } from '../../../constants'
import { validateError } from '../../../constants/validate'
import { resource } from '../../../routes'
// extensions
import { formikHelper, yupHelper } from '../../../extensions'
// utils
import utils from '../../../utils'
// components
import {
  CustomForm,
  ErrorMessage,
  FooterForm,
  UploadImage
} from '../../../components'

const FormItem = Form.Item
const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    name: yupHelper.stringRequired,
    // url: yupHelper.stringRequired.url(validateError.url)
    // category: utils.validateStringRequired,
    // bannerType: utils.validateStringRequired,
    // published: utils.validateStringRequired,
    // fileUpload: utils.validateStringRequired,
  }),
  mapPropsToValues: props => ({
    id: props.data ? props.data._id : null,
    name: props.data ? props.data.name : '',
    description: utils.handleShowLineBreakTextarea(
      formikHelper.getDefaultValueField(props.data, 'description', null)
    ),
    url: props.data ? props.data.url : '',
    codeEmbed: props.data ? props.data.codeEmbed : null,
    published: props.data ? props.data.published : false,
    fileUpload: formikHelper.getImageValueField(props.data, 'image',
      enumType.imagePath.Banner),
    // fileUploadImageMobile: formikHelper.getImageValueField(props.data, 'imageMobile',
    //   enumType.imagePath.Banner)
  }),
  handleSubmit: (data, { props }) => {
    props.handleSubmit(data)
  },
  displayName: 'BannerForm'
})

const FormAction = (props) => {

  const {
    errors,
    touched,
    values,
    mode,
    resetForm,
    data,
    auth,
    isMobile,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    handleCancel
  } = props
  // effect
  useEffect(
    () => {
      resetForm()
    },
    [data]
  )

  return (
    <CustomForm
      title={
        utils.initTitleForm(
          <FormattedMessage
            id="Page.Banner"
            defaultMessage="Banner"
          />,
          mode
        )
      }>
      <Form
        onSubmit={handleSubmit}
        className={`row`}
      >
        <div className={`col-lg-8 col-12`}>
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
            <FormattedMessage
              id="Label.Name"
              defaultMessage="Name"
            >
              {
                placeholder => (
                  <Input
                    className={
                      classNames({
                        'has-error': formikHelper.checkFieldError(errors,
                          touched, 'name')
                      })
                    }
                    value={values.name}
                    onChange={(input) => {
                      setFieldValue('name', input.target.value)
                    }}
                    onBlur={() => setFieldTouched('name', true)}
                    placeholder={placeholder}
                  />
                )
              }
            </FormattedMessage>
            <ErrorMessage
              fieldName='name'
              touched={touched}
              errors={errors}
              isValidate={true}
            />
          </FormItem>
          <FormItem
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
            <ErrorMessage
              fieldName='url'
              touched={touched}
              errors={errors}
              isValidate={true}
            />
          </FormItem>
          <FormItem
            label={
              <FormattedMessage
                id="Label.CodeEmbed"
                defaultMessage="Code Embed"
              />
            }
            className='mb-4'
          >
            <FormattedMessage
              id="Label.CodeEmbed"
              defaultMessage="Code Embed"
            >
              {
                placeholder => (
                  <Input
                    placeholder={placeholder}
                    value={values.codeEmbed}
                    onChange={(input) => {
                      setFieldValue('codeEmbed', input.target.value)
                    }}
                    onBlur={() => setFieldTouched('codeEmbed', true)}
                  />
                )
              }
            </FormattedMessage>
            <ErrorMessage
              fieldName='codeEmbed'
              touched={touched}
              errors={errors}
              isValidate={false}
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
            <FormattedMessage
              id="Label.Description"
              defaultMessage="Description"
            >
              {
                placeholder => (
                  <Input.TextArea
                    placeholder={placeholder}
                    rows={5}
                    className='height-auto'
                    value={values.description}
                    onChange={(input) => {
                      setFieldValue('description', input.target.value)
                    }}
                    onBlur={() => setFieldTouched('text', true)}
                  />
                )
              }
            </FormattedMessage>
            <div className='custom-error' />
          </FormItem>
          <FormItem
            {...FORM_ITEM_LAYOUT}
            label={
              <FormattedMessage
                id="Label.Published"
                defaultMessage="Published"
              />
            }
            className='mb-4'
          >
            <Checkbox
              checked={values.published}
              onChange={(e) => setFieldValue('published',
                e.target.checked)}
            />
          </FormItem>
        </div>
        <div className={`col-lg-4 col-12`}>
          <FormItem
            label={
              <FormattedMessage
                id="Label.Banner"
                defaultMessage="Banner"
              />
            }
            className='mb-4'
          >
            <UploadImage
              type={enumType.uploadType.Banner}
              name={'fileUpload'}
              data={values.fileUpload}
              showUploadList={true}
              multiple={false}
              handleUploadFile={(file) => setFieldValue('fileUpload', file)}
              handleChangeFile={(fileList) => setFieldValue('fileUpload',
                fileList)}
            />
            <div className='custom-error'>
              {
                utils.checkFieldError(errors, touched, 'fileUpload')
                  ? errors.fileUpload
                  : null
              }
            </div>
          </FormItem>
          {/* <FormItem
            label={
              <FormattedMessage
                id="Label.BannerMobile"
                defaultMessage="Banner Mobile"
              />
            }
            className='mb-4'
          >
            <UploadImage
              type={enumType.uploadType.Banner}
              name={'fileUploadImageMobile'}
              data={values.fileUploadImageMobile}
              showUploadList={true}
              multiple={false}
              handleUploadFile={(file) => setFieldValue('fileUploadImageMobile', file)}
              handleChangeFile={(fileList) => setFieldValue('fileUploadImageMobile',
                fileList)}
            />
            <div className='custom-error'>
              {
                utils.checkFieldError(errors, touched, 'fileUploadImageMobile')
                  ? errors.fileUpload
                  : null
              }
            </div>
          </FormItem> */}
        </div>
      </Form>
      <div className='form-actions btn-group-button-footer'>
        <FooterForm
          auth={auth}
          isMobile={isMobile}
          resource={resource.MENU_MANAGEMENT_BANNER}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      </div>
    </CustomForm>
  )
}

export default formikMap(FormAction)
