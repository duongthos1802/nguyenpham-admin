import React, { useEffect, useRef } from 'react'
// lib
import { withFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { Form, Input, Button, Checkbox } from 'antd'
// constant
import { validate } from '../../../constants'
import { errorCode } from '../../../constants/error'
// extensions
import { formikHelper, yupHelper } from '../../../extensions'

const FormItem = Form.Item

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    username: yupHelper.stringRequired,
    password: yupHelper.stringRequired.min(6,
      ({ min }) => validate.validateError.minimumLengthString(
        <FormattedMessage
          id="TextBox.Password"
          defaultMessage="Password"
        />,
        min
      ))
  }),
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  handleSubmit: (data, { props }) => {
    props.handleSubmit(data)
  },
  displayName: 'Form'
})

const LoginForm = (props) => {

  const {
    formError,
    touched,
    errors,
    values,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    setFieldError
  } = props

  const usernameRef = useRef(null)
  const passRef = useRef(null)

  useEffect(
    () => {
      switch (formError.field) {
        case errorCode.BAD_USER_INPUT:
        case errorCode.CANNOT_ACCESS:
          setFieldError('username', formError.message)
          usernameRef.current.focus()
          break
        case errorCode.UNAUTHENTICATED:
          setFieldError('password',
            <FormattedMessage
              id="Error.Submit.WrongPassword"
              defaultMessage='The password is wrong'
            />)
          break
        default:
          break
      }
    },
    [formError]
  )

  return (
    <Form
      onSubmit={handleSubmit}
      className="login-form">
      <FormItem
        label={
          <FormattedMessage
            id="TextBox.Username"
            defaultMessage="Email"
          />
        }
        className="item-login mb-0"
      >
        <FormattedMessage
          id="Placeholder.Username"
          defaultMessage="Enter Username">
          {
            placeholder =>
              <Input
                ref={usernameRef}
                // prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                className={
                  classNames({
                    'has-error': formikHelper.checkFieldError(errors, touched,
                      'username')
                  })}
                placeholder={placeholder}
                value={values.username}
                onChange={(input) => setFieldValue('username',
                  input.target.value)}
                onBlur={() => setFieldTouched('username', true)}
              />
          }
        </FormattedMessage>
        <div className='custom-error'>
          {
            formikHelper.checkFieldError(errors, touched, 'username')
              ? errors.username
              : null
          }
        </div>
      </FormItem>
      <FormItem
        label={
          <FormattedMessage
            id="TextBox.Password"
            defaultMessage="Password"/>
        }
        className="item-login mb-0"
      >
        <FormattedMessage
          id="Placeholder.Password"
          defaultMessage="Enter Password">
          {
            placeholder =>
              <Input.Password
                itemRef={passRef}
                visibilityToggle={true}
                className={classNames({
                  'has-error': formikHelper.checkFieldError(errors, touched,
                    'password')
                })}
                placeholder={placeholder}
                value={values.password}
                onChange={(input) => setFieldValue('password',
                  input.target.value)}
                onBlur={() => setFieldTouched('password', true)}
              />
          }
        </FormattedMessage>
        <div className='custom-error'>
          {
            formikHelper.checkFieldError(errors, touched, 'password')
              ? errors.password
              : null
          }
        </div>
      </FormItem>
      <FormItem>
        {/* <Checkbox>
          <FormattedMessage
            id="Label.StayLoggedIn"
            defaultMessage="Remember me"
          />
        </Checkbox> */}
        {/* <a className="login-form-forgot pull-right text-primary cursor-pointer">
          <FormattedMessage
            id="Label.ForgotPassword"
            defaultMessage="Forgot Password"
          />
        </a> */}
      </FormItem>
      <div className="form-actions">
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button ant-btn w__150"
        >
          <FormattedMessage
            id="Button.Login"
            defaultMessage="Login"/>
        </Button>
      </div>

      {/* <div className="form-group">
        <p>Use another service to Log In</p>
        <div className="mt-2">
          <a className="btn btn-icon mr-2"><i className="icmn-facebook"/></a>
          <a className="btn btn-icon mr-2"><i className="icmn-google"/></a>
        </div>
      </div> */}
    </Form>
  )
}

export default formikMap(LoginForm)