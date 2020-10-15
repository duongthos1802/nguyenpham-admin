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
import { formikHelper, yupHelper, htmlHelper } from '../../extensions'
// utils
import utils from '../../utils'
// component
import {
  CustomForm,
  ErrorMessage,
  FooterForm,
  Editor
} from '../../components'
import InputNumber from '../../components/Input/InputNumber'
import { EnumSelect } from '../../components/Select'

const FormItem = Form.Item
const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    title: yupHelper.stringRequired,
    answer: yupHelper.stringRequired,
    priority: yupHelper.stringRequired,
    status: yupHelper.stringRequired
  }),
  mapPropsToValues: props => ({
    id: props.data ? props.data._id : null,
    status: formikHelper.getDefaultValueField(props.data, 'status',
      enumType.FAQStatus.Normal),
    priority: props.data ? props.data.priority : null,
    title: utils.handleShowLineBreakTextarea(
      formikHelper.getDefaultValueField(props.data, 'title', null)
    ),
    answer: htmlHelper.decodeContent(
      formikHelper.getDefaultValueField(data, 'answer', null)
    ),
    description: utils.handleShowLineBreakTextarea(
      formikHelper.getDefaultValueField(props.data, 'description', null)
    )
  }),
  handleSubmit: (data, { props }) => {
    props.handleSubmit(data)
  },
  displayName: 'FAQForms'
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
                id="Label.Question"
                defaultMessage="Question"
              />
            }
            className='mb-0'
          >
            <FormattedMessage
              id="Label.Question"
              defaultMessage="Question"
            >
              {
                placeholder => (
                  <Input.TextArea
                    key={`question`}
                    placeholder={placeholder}
                    rows={5}
                    className={
                      classNames('height-auto', {
                        'has-error': formikHelper.checkFieldError(errors,
                          touched, 'title')
                      })
                    }
                    value={values.title}
                    onChange={(input) => {
                      setFieldValue('title', input.target.value)
                    }}
                    onBlur={() => setFieldTouched('title', true)}
                  />
                )
              }
            </FormattedMessage>
            <ErrorMessage
              errors={errors}
              touched={touched}
              isValidate={true}
              fieldName='title'
            />
          </FormItem>
          <FormItem
            required={true}
            label={
              <FormattedMessage
                id="Label.Answer"
                defaultMessage="Answer"
              />
            }
            className='mb-0'
          >
            <FormattedMessage
              id="Label.Answer"
              defaultMessage="Answer"
            >
              {
                placeholder => (
                  <Editor
                    data={values.answer}
                    handleChange={(value) => setFieldValue('answer', value)}
                    handleBlur={() => setFieldTouched('answer', true)}
                    editorConfig='content'
                  />)
              }
            </FormattedMessage>
            <ErrorMessage
              fieldName='answer'
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
                id="Label.Priority"
                defaultMessage="Priority"
              />
            }
            className='mb-0'
          >
            <FormattedMessage
              id="Label.Priority"
              defaultMessage="Priority"
            >
              {
                placeholder => (
                  <InputNumber
                    placeholder={placeholder}
                    value={values.priority}
                    customClass={classNames({
                      'has-error': formikHelper.checkFieldError(errors, touched,
                        'priority')
                    })}
                    handleChange={(value) => setFieldValue('priority', value)}
                    handleBlur={() => setFieldTouched('priority', true)}
                  />
                )
              }
            </FormattedMessage>
            <ErrorMessage
              errors={errors}
              touched={touched}
              isValidate={true}
              fieldName='priority'
            />
          </FormItem>

          <FormItem
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
                    options={enumType.FAQStatusEnum}
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
          resource={resource.MENU_MANAGEMENT_BANNER}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      </div>
    </CustomForm>
  )
}

export default formikMap(FormAction)
