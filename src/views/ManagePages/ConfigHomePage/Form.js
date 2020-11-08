import React, { useEffect, useState } from 'react'
// lib
import { Form as AntForm, Radio, Input } from 'antd'
import { withFormik } from 'formik'
import { FormattedMessage } from 'react-intl'
// constant
import { enumType, FORM_ITEM_LAYOUT } from '../../../constants'
import { resource } from '../../../routes'
// extensions
import { formikHelper } from '../../../extensions'
// component
import { ErrorMessage, FooterForm, UploadImage } from '../../../components'
import { CategorySelect, UserSelect, BannerSelect, HtmlBlockSelect } from '../../../components/Select'

const customFormik = withFormik({
  mapPropsToValues: ({ data }) => {
    const configHome = formikHelper.getDefaultValueField(data, 'config', null)
    const dataConfigHome = configHome ? JSON.parse(configHome) : null
    return {
      id: formikHelper.getDefaultValueField(data, '_id', null),
      configBanner: formikHelper.getDefaultValueField(dataConfigHome, 'configBanner', null),
      configCategory: formikHelper.getDefaultValueField(dataConfigHome, 'configCategory', null),
      configCategorySecond: formikHelper.getDefaultValueField(dataConfigHome, 'configCategorySecond', null),
      configCategoryThird: formikHelper.getDefaultValueField(dataConfigHome, 'configCategoryThird', null),
      configPartner: formikHelper.getDefaultValueField(dataConfigHome, 'configPartner', null),
      configPartnerSecond: formikHelper.getDefaultValueField(dataConfigHome, 'configPartnerSecond', null),
      configPartnerThird: formikHelper.getDefaultValueField(dataConfigHome, 'configPartnerThird', null),
      configCategoryFour: formikHelper.getDefaultValueField(dataConfigHome, 'configCategoryFour', null),
      configService: formikHelper.getDefaultValueField(dataConfigHome, 'configService', null),
      configEventLeft: formikHelper.getDefaultValueField(dataConfigHome, 'configEventLeft', null),

      configEventRightVideo: formikHelper.getDefaultValueField(dataConfigHome, 'configEventRightVideo', null),
      configEventRightBanner: formikHelper.getDefaultValueField(dataConfigHome, 'configEventRightBanner', null),
      configEventRightActive: formikHelper.getDefaultValueField(dataConfigHome, 'configEventRightActive', enumType.eventLeftType.Banner)

    }
  },
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values)
  },
  displayName: 'NotificationForm'
})

const FormItem = AntForm.Item

const FormAction = (props) => {
  const {
    data,
    isMobile,
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    handleCancel,
    resetForm
  } = props

  const [activeEvent, setActiveEvent] = useState(enumType.eventLeftType.Banner)

  useEffect(
    () => {
      resetForm()
    },
    [data]
  )

  return (
    <AntForm
      {...FORM_ITEM_LAYOUT}
      onSubmit={handleSubmit}
    >
      <FormItem
        required={true}
        label={
          <FormattedMessage
            id="Label.Banner"
            defaultMessage="Banner"
          />
        }
        className='mb-0'
      >
        <FormattedMessage
          id="Label.Banner"
          defaultMessage="Banner"
        >
          {
            (placeholder) => (
              <BannerSelect
                placeholder={placeholder}
                value={values.configBanner}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                path={'configBanner'}
              />
            )
          }
        </FormattedMessage>
        <ErrorMessage
          fieldName='configBanner'
          touched={touched}
          errors={errors}
          isValidate={true}
        />
      </FormItem>

      <FormItem
        required={true}
        label={
          <FormattedMessage
            id="Label.Service"
            defaultMessage="Service"
          />
        }
        className="mb-0"
      >
        <div className="d-flex">
          <div className="mr-2 w-100">
            <FormattedMessage
              id="Label.Service"
              defaultMessage="Service"

            >
              {
                (placeholder) => (
                  <HtmlBlockSelect
                    placeholder={placeholder}
                    value={values.configService}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    path={'configService'}
                  />
                )
              }
            </FormattedMessage>
          </div>
        </div>

        <ErrorMessage
          fieldName='configService'
          touched={touched}
          errors={errors}
          isValidate={true}
        />
      </FormItem>


      <FormItem
        required={true}
        label={
          <FormattedMessage
            id="Label.Event.Left"
            defaultMessage="Event Left"
          />
        }
      >
        <div className="d-flex">
          <div className="mr-2 w-100">
            <FormattedMessage
              id="Label.Event.Left"
              defaultMessage="Event left"

            >
              {
                (placeholder) => (
                  <HtmlBlockSelect
                    placeholder={placeholder}
                    value={values.configEventLeft}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    path={'configEventLeft'}
                  />
                )
              }
            </FormattedMessage>
          </div>
        </div>
      </FormItem>

      <FormItem
        required={true}
        label={
          <FormattedMessage
            id="Label.Event"
            defaultMessage="Event Right "
          />
        }
      >
        <div className="">
          <Radio.Group name="radiogroup" defaultValue={activeEvent} value={values.configEventRightActive}
            onChange={(e) => {
              setFieldValue('configEventRightActive', e.target.value)
            }}>
            <Radio value={enumType.eventLeftType.Banner} >Banner</Radio>
            <Radio value={enumType.eventLeftType.Video}> Video</Radio>
          </Radio.Group>
          {
            values.configEventRightActive === enumType.eventLeftType.Banner
              ? <div className="mr-2 w-100">
                <FormattedMessage
                  id="Label.Banner"
                  defaultMessage="Banner event"
                >
                  {
                    (placeholder) => (
                      <BannerSelect
                        placeholder={placeholder}
                        value={values.configEventRightBanner}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        path={'configEventRightBanner'}
                      />
                    )
                  }
                </FormattedMessage>
              </div>
              : <div className="mr-2 w-100">
                <FormattedMessage
                  id="Label.Url.Video"
                  defaultMessage="Url video"

                >
                  {
                    (placeholder) => (
                      <Input
                        placeholder={placeholder}
                        value={values.configEventRightVideo}
                        onChange={(input) => {
                          setFieldValue('configEventRightVideo', input.target.value)
                        }}
                        onBlur={() => setFieldTouched('configEventRightVideo', true)}
                      />
                    )
                  }
                </FormattedMessage>
              </div>
          }
        </div>
      </FormItem>


      <FormItem
        required={true}
        label={
          <FormattedMessage
            id="Label.Category"
            defaultMessage="Category"
          />
        }
        className='mb-0'
      >
        <FormattedMessage
          id="Label.Category"
          defaultMessage="Category"
        >
          {
            (placeholder) => (
              <CategorySelect
                isProduct={true}
                value={values.configCategory}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                path={'configCategory'}
                placeholder={placeholder}
                showCategoryParent={false}
              />
            )
          }
        </FormattedMessage>
        <ErrorMessage
          fieldName='category'
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>

      <FormItem
        required={true}
        label={
          <FormattedMessage
            id="Label.Category2"
            defaultMessage="Category 2"
          />
        }
        className='mb-0'
      >
        <FormattedMessage
          id="Label.Category2"
          defaultMessage="Category 2"
        >
          {
            (placeholder) => (
              <CategorySelect
                isProduct={true}
                value={values.configCategorySecond}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                path={'configCategorySecond'}
                placeholder={placeholder}
                showCategoryParent={false}
              />
            )
          }
        </FormattedMessage>
        <ErrorMessage
          fieldName='configCategorySecond'
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>

      <FormItem
        required={true}
        label={
          <FormattedMessage
            id="Label.Category3"
            defaultMessage="Category 3"
          />
        }
        className='mb-0'
      >
        <FormattedMessage
          id="Label.Category3"
          defaultMessage="Category 3"
        >
          {
            (placeholder) => (
              <CategorySelect
                isProduct={true}
                value={values.configCategoryThird}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                path={'configCategoryThird'}
                placeholder={placeholder}
                showCategoryParent={false}
              />
            )
          }
        </FormattedMessage>
        <ErrorMessage
          fieldName='configCategoryThird'
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>


      <FormItem
        required={true}
        label={
          <FormattedMessage
            id="Label.Category4"
            defaultMessage="Category 4"
          />
        }
        className='mb-0'
      >
        <FormattedMessage
          id="Label.Category4"
          defaultMessage="Category 4"
        >
          {
            (placeholder) => (
              <CategorySelect
                isProduct={true}
                value={values.configCategoryFour}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                path={'configCategoryFour'}
                placeholder={placeholder}
                showCategoryParent={false}
              />
            )
          }
        </FormattedMessage>
        <ErrorMessage
          fieldName='configCategoryFour'
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>

      <FooterForm
        isHiddenCancel={true}
        isMobile={isMobile}
        resource={resource.MENU_MANAGEMENT_PAGES}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        buttonSave={<FormattedMessage
          id="Button.SaveChange"
          defaultMessage="Save Change"
        />}
      />
    </AntForm>
  )
}

export default customFormik(FormAction)