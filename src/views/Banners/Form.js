import React, { useEffect, useRef } from 'react'
import { withFormik } from 'formik/dist/index'
import * as Yup from 'yup'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { Form, Input } from 'antd/lib/index'
import { FORM_ITEM_LAYOUT } from '../../constants'
import {
  CustomForm,
  ErrorMessage,
  FooterForm
} from '../../components'
import utils from '../../utils'
import { resource } from '../../routes'
import { formikHelper, yupHelper } from '../../extensions'
import { errorCode } from '../../constants/error'

const FormItem = Form.Item
const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    name: yupHelper.stringRequired
  }),
  mapPropsToValues: props => (
    {
      _id: props.data ? props.data._id : null,
      name: props.data ? props.data.name : '',
      description: utils.handleShowLineBreakTextarea(
        formikHelper.getDefaultValueField(props.data, 'description', null)
      )
    }),
  handleSubmit: (data, { props }) => {
    props.handleSubmit(data)
  },
  displayName: 'BannerGroupForm'
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
    formError,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    handleCancel,
    setFieldError
  } = props

  const nameRef = useRef(null)

  // effect
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
        utils.initTitleForm(
          <FormattedMessage
            id="Page.Banner"
            defaultMessage="Banner Group"
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
                id="Label.Name"
                defaultMessage="Name"
              />
            }
            className='mb-4'
          >
            <FormattedMessage
              id="Label.Name"
              defaultMessage="Name"
            >
              {
                placeholder => (
                  <Input
                    ref={nameRef}
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
                id="Label.Description"
                defaultMessage="Description"
              />
            }
            className='mb-4'
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
          </FormItem>
        </div>
      </Form>
      <div className='form-actions btn-group-button-footer'>
        <FooterForm
          auth={auth}
          isMobile={isMobile}
          resource={resource.MENU_MANAGEMENT_BANNER_GROUP}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      </div>
    </CustomForm>
  )
}

export default formikMap(FormAction)
