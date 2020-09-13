import React, {useEffect} from 'react'
// lib
import classNames from 'classnames'
import {withFormik} from 'formik'
import * as Yup from 'yup'
import {Form, Icon, Input} from 'antd'
import {FormattedMessage} from 'react-intl'
// constant
import {validate} from '../../../constants'
// extensions
import {formikHelper, yupHelper} from '../../../extensions'

const customFormik = withFormik({
  validationSchema: Yup.object().shape({
    oldPass: yupHelper.stringRequired,
    newPass: yupHelper.stringRequired
      .min(7, ({min}) => validate.validateError.minimumLengthString(
        <FormattedMessage
          id="Label.Password"
          defaultMessage="Password"
        />,
        min
      )),
    rePass: yupHelper.stringRequired
      .oneOf([Yup.ref('newPass')], validate.validateError.confirmPassword)
  }),
  mapPropsToValues: () => ({
    oldPass: null,
    newPass: null,
    rePass: null
  }),
  handleSubmit: (values, {props}) => {
    props.handleSubmit(values)
  },
  displayName: 'ChangePasswordForm'
})

const FormItem = Form.Item

const ChangePasswordForm = (props) => {
  const {
    toggle,
    values,
    errors,
    touched,
    buttonSubmit,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm
  } = props

  useEffect(
    () => {
      resetForm()
    },
    [toggle]
  )

  return (
    <Form
      layout='vertical'
      onSubmit={handleSubmit}
    >
      <FormItem
        required={true}
        label={
          <FormattedMessage
            id="Label.OldPassword"
            defaultMessage="Old Password"
          />
        }
        className='mb-0'
      >
        <FormattedMessage
          id="Label.OldPassword"
          defaultMessage="Old Password"
        >
          {
            placeholder => (
              <Input.Password
                visibilityToggle={true}
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                className={
                  classNames({
                    'has-error': formikHelper.checkFieldError(errors, touched, 'oldPass')
                  })
                }
                placeholder={placeholder}
                value={values.oldPass}
                onChange={(input) => setFieldValue('oldPass', input.target.value)}
                onBlur={() => setFieldTouched('oldPass', true)}
              />
            )
          }
        </FormattedMessage>
        <div className='custom-error'>
          {
            formikHelper.checkFieldError(errors, touched, 'oldPass')
              ? errors.oldPass
              : null
          }
        </div>
      </FormItem>
      <FormItem
        required={true}
        label={
          <FormattedMessage
            id="Label.NewPassword"
            defaultMessage="New Password"
          />
        }
        className='mb-0'
      >
        <FormattedMessage
          id="Label.NewPassword"
          defaultMessage="New Password"
        >
          {
            placeholder => (
              <Input.Password
                visibilityToggle={true}
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                className={
                  classNames({
                    'has-error': formikHelper.checkFieldError(errors, touched, 'newPass')
                  })
                }
                placeholder={placeholder}
                value={values.newPass}
                onChange={(input) => setFieldValue('newPass', input.target.value)}
                onBlur={() => setFieldTouched('newPass', true)}
              />
            )
          }
        </FormattedMessage>
        <div className='custom-error'>
          {
            formikHelper.checkFieldError(errors, touched, 'newPass')
              ? errors.newPass
              : null
          }
        </div>
      </FormItem>
      <FormItem
        required={true}
        label={
          <FormattedMessage
            id="Label.ConfirmPassword"
            defaultMessage="Confirm Password"
          />
        }
        className='mb-0'
      >
        <FormattedMessage
          id="Label.ConfirmPassword"
          defaultMessage="Confirm Password"
        >
          {
            placeholder => (
              <Input.Password
                visibilityToggle={true}
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                className={
                  classNames({
                    'has-error': formikHelper.checkFieldError(errors, touched, 'rePass')
                  })
                }
                placeholder={placeholder}
                value={values.rePass}
                onChange={(input) => setFieldValue('rePass', input.target.value)}
                onBlur={() => setFieldTouched('rePass', true)}
              />
            )
          }
        </FormattedMessage>
        <div className='custom-error'>
          {
            formikHelper.checkFieldError(errors, touched, 'rePass')
              ? errors.rePass
              : null
          }
        </div>
      </FormItem>
      {buttonSubmit}
    </Form>
  )
}

export default customFormik(ChangePasswordForm)