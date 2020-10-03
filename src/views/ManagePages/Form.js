import React, { useEffect, useRef } from 'react'
// lib
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Col, Form as AntForm, Input, Row, Checkbox } from 'antd'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
// constant
import { enumType, FORM_ITEM_LAYOUT } from '../../constants'
import { resource } from '../../routes'
// extensions
import { formikHelper, yupHelper } from '../../extensions'
// components
import { ErrorMessage, FooterForm } from '../../components'

const FormItem = AntForm.Item

const customFormik = withFormik({
  validationSchema: Yup.object().shape({
    name: yupHelper.stringRequired,
    urlFrontEnd: yupHelper.stringRequired
  }),
  mapPropsToValues: ({ data }) => ({
    id: formikHelper.getDefaultValueField(data, '_id', null),
    name: formikHelper.getDefaultValueField(data, 'name', null),
    urlFrontEnd: formikHelper.getDefaultValueField(data, 'urlFrontEnd', null),
    metaTitle: formikHelper.getDefaultValueField(data, 'metaTitle', null),
    metaDescription: formikHelper.getDefaultValueField(data, 'metaDescription',
      null),
    metaKeyword: formikHelper.getDefaultValueField(data, 'metaKeyword', null),
    isHomePage: formikHelper.getDefaultValueField(data, 'isHomePage', false)
  }),
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values)
  },
  displayName: 'PageForm'
})

const Form = (props) => {
  const {
    mode,
    data,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm,
    handleCancel
  } = props

  const codeRef = useRef(null)

  useEffect(
    () => {
      resetForm()
    },
    [data]
  )

  return (
    <React.Fragment>
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
              <FormattedMessage
                id="Label.Name"
                defaultMessage="Name"
              >
                {
                  placeholder => (
                    <Input
                      placeholder={placeholder}
                      ref={codeRef}
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
                      value={values.urlFrontEnd}
                      onChange={(value) => setFieldValue('urlFrontEnd',
                        value.target.value)}
                      onBlur={() => setFieldTouched('urlFrontEnd', true)}
                      className={
                        classNames({
                          'has-error': formikHelper.checkFieldError(errors,
                            touched,
                            'urlFrontEnd')
                        })
                      }
                    />
                  )
                }
              </FormattedMessage>

              <ErrorMessage
                fieldName='urlFrontEnd'
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
              <FormattedMessage
                id="Label.MetaTitle"
                defaultMessage="Meta Title"
              >
                {
                  placeholder => (
                    <Input
                      placeholder={placeholder}
                      value={values.metaTitle}
                      onChange={(value) => setFieldValue('metaTitle',
                        value.target.value)}
                      onBlur={() => setFieldTouched('metaTitle', true)}
                      className={
                        classNames({
                          'has-error': formikHelper.checkFieldError(errors,
                            touched,
                            'metaTitle')
                        })
                      }
                    />
                  )
                }
              </FormattedMessage>

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
              <FormattedMessage
                id="Label.MetaKeyword"
                defaultMessage="Meta Keyword"
              >
                {
                  placeholder => (
                    <Input
                      placeholder={placeholder}
                      value={values.metaKeyword}
                      onChange={(value) => setFieldValue('metaKeyword',
                        value.target.value)}
                      onBlur={() => setFieldTouched('metaKeyword', true)}
                      className={
                        classNames({
                          'has-error': formikHelper.checkFieldError(errors,
                            touched,
                            'metaKeyword')
                        })
                      }
                    />
                  )
                }
              </FormattedMessage>

              <ErrorMessage
                fieldName='metaKeyword'
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>
            <FormItem
              label={
                <FormattedMessage
                  id="Label.MetaKeyword"
                  defaultMessage="Home Page"
                />
              }
              className='mb-0'
              {...FORM_ITEM_LAYOUT}
            >
              <Checkbox
                checked={values.isHomePage}
                onChange={(e) => setFieldValue('isHomePage', e.target.checked)}
              />
            </FormItem>
          </Col>
        </Row>
        <FooterForm
          handleSubmit={handleSubmit}
          resource={resource.MENU_MANAGEMENT_PAGES}
          handleCancel={handleCancel}
          buttonSave={
            mode === enumType.mode.create
              ? 'Add Pages'
              : 'Save Changes'
          }
        />
      </AntForm>
    </React.Fragment>
  )
}

export default customFormik(Form)