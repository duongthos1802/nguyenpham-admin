import React, { useEffect } from 'react'
// lib
import { withFormik } from 'formik/dist/index'
import * as Yup from 'yup'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { Form, Input } from 'antd/lib/index'
// constant
import { FORM_ITEM_LAYOUT, enumType } from '../../constants'
import { resource } from '../../routes'
// extensions
import { formikHelper, yupHelper } from '../../extensions'
// utils
import utils from '../../utils'
// component
import {
  CustomForm,
  ErrorMessage,
  FooterForm,
} from '../../components'
import { EnumSelect } from '../../components/Select'

const FormItem = Form.Item
const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    status: yupHelper.stringRequired,
    name: yupHelper.stringRequired,
    email: yupHelper.stringRequired,
    phone: yupHelper.stringRequired,
    address: yupHelper.stringRequired,
    description: yupHelper.stringRequired,
  }),
  mapPropsToValues: ({ data }) => ({
    id: data ? data._id : null,
    status: formikHelper.getDefaultValueField(data, 'status',
      enumType.customerStatus.Awaiting),
    name: formikHelper.getDefaultValueField(data, 'name', null),
    email: formikHelper.getDefaultValueField(data, 'email', null),
    phone: formikHelper.getDefaultValueField(data, 'phone', null),
    address: formikHelper.getDefaultValueField(data, 'address', null),
    description: utils.handleShowLineBreakTextarea(
      formikHelper.getDefaultValueField(data, 'description', null)
    )
  }),
  handleSubmit: (data, { props }) => {
    props.handleSubmit(data)
  },
  displayName: 'CustomerForms'
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
            id="Page.FAQ"
            defaultMessage="FAQ"
          />,
          mode
        )
      }>
      <Form
        {...FORM_ITEM_LAYOUT}
        onSubmit={handleSubmit}
        className={`row`}
      >
        <div className={`col-lg-8 col-12`}>

          <FormItem
            required={true}
            label={
              <FormattedMessage
                id="Label.name"
                defaultMessage="name"
              />
            }
            className='mb-0'
          >
            <FormattedMessage
              id="Label.name"
              defaultMessage="name"
            >
              {
                placeholder => (
                  <Input
                    placeholder={placeholder}
                    value={values.name}
                    onChange={(value) => setFieldValue('name',
                      value.target.value)}
                    onBlur={() => setFieldTouched('name', true)}
                    className={
                      classNames({
                        'has-error': formikHelper.checkFieldError(errors,
                          touched,
                          'name')
                      })
                    }
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
            required={true}
            label={
              <FormattedMessage
                id="Label.email"
                defaultMessage="email"
              />
            }
            className='mb-0'
          >
            <FormattedMessage
              id="Label.email"
              defaultMessage="email"
            >
              {
                placeholder => (
                  <Input
                    placeholder={placeholder}
                    value={values.email}
                    onChange={(value) => setFieldValue('email',
                      value.target.value)}
                    onBlur={() => setFieldTouched('email', true)}
                    className={
                      classNames({
                        'has-error': formikHelper.checkFieldError(errors,
                          touched,
                          'email')
                      })
                    }
                  />
                )
              }
            </FormattedMessage>
            <ErrorMessage
              fieldName='email'
              touched={touched}
              errors={errors}
              isValidate={true}
            />
          </FormItem>

          <FormItem
            required={true}
            label={
              <FormattedMessage
                id="Label.phone"
                defaultMessage="phone"
              />
            }
            className='mb-0'
          >
            <FormattedMessage
              id="Label.phone"
              defaultMessage="phone"
            >
              {
                placeholder => (
                  <Input
                    placeholder={placeholder}
                    value={values.phone}
                    onChange={(value) => setFieldValue('phone',
                      value.target.value)}
                    onBlur={() => setFieldTouched('phone', true)}
                    className={
                      classNames({
                        'has-error': formikHelper.checkFieldError(errors,
                          touched,
                          'phone')
                      })
                    }
                  />
                )
              }
            </FormattedMessage>
            <ErrorMessage
              fieldName='phone'
              touched={touched}
              errors={errors}
              isValidate={true}
            />
          </FormItem>

          <FormItem
            required={true}
            label={
              <FormattedMessage
                id="Label.Address"
                defaultMessage="Address"
              />
            }
            className='mb-0'
          >
            <FormattedMessage
              id="Label.Address"
              defaultMessage="Address"
            >
              {
                placeholder => (
                  <Input
                    placeholder={placeholder}
                    value={values.address}
                    onChange={(value) => setFieldValue('address',
                      value.target.value)}
                    onBlur={() => setFieldTouched('address', true)}
                    className={
                      classNames({
                        'has-error': formikHelper.checkFieldError(errors,
                          touched,
                          'address')
                      })
                    }
                  />
                )
              }
            </FormattedMessage>
            <ErrorMessage
              fieldName='address'
              touched={touched}
              errors={errors}
              isValidate={true}
            />
          </FormItem>

          <FormItem
            required={true}
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
                    key={`description`}
                    placeholder={placeholder}
                    rows={5}
                    className='height-auto'
                    value={values.description}
                    onChange={(input) => {
                      setFieldValue('description', input.target.value)
                    }}
                    onBlur={() => setFieldTouched('description', true)}
                  />
                )
              }
            </FormattedMessage>
            <div className='custom-error' />
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
            <FormattedMessage
              id="Label.Status"
              defaultMessage="Status"
            >
              {
                (placeholder) => (
                  <EnumSelect
                    options={enumType.customerStatusEnum}
                    value={values.status}
                    placeholder={placeholder}
                    isClearable={false}
                    onChange={(value) => setFieldValue('status', value)}
                    onBlur={() => setFieldTouched('status', true)}
                  />
                )
              }
            </FormattedMessage>

            <ErrorMessage
              errors={errors}
              touched={touched}
              isValidate={true}
              fieldName='status'
            />
          </FormItem>
        </div>
      </Form>
      <div className='form-actions btn-group-button-footer'>
        <FooterForm
          auth={auth}
          isMobile={isMobile}
          resource={resource.MENU_MANAGEMENT_CUSTOMERS}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      </div>
    </CustomForm>
  )
}

export default formikMap(FormAction)
