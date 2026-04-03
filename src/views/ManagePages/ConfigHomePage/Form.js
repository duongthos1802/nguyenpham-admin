import React, { useEffect, useState } from "react";
// lib
import { Form as AntForm, Radio, Input } from "antd";
import { withFormik } from "formik";
import { FormattedMessage } from "react-intl";
// constant
import { enumType, FORM_ITEM_LAYOUT } from "../../../constants";
import { resource } from "../../../routes";
// extensions
import { formikHelper } from "../../../extensions";
// component
import { ErrorMessage, FooterForm, UploadImage } from "../../../components";
import {
  CategorySelect,
  UserSelect,
  BannerSelect,
  HtmlBlockSelect,
  ProductSelect,
  BrandSelect,
  BrandHomeSelect,
  BlogSelect,
} from "../../../components/Select";

const customFormik = withFormik({
  mapPropsToValues: ({ data }) => {
    const configHome = formikHelper.getDefaultValueField(data, "config", null);
    const dataConfigHome = configHome ? JSON.parse(configHome) : null;
    return {
      id: formikHelper.getDefaultValueField(data, "_id", null),
      configBanner: formikHelper.getDefaultValueField(
        dataConfigHome,
        "configBanner",
        null
      ),

      configBrand1: formikHelper.getDefaultValueField(
        dataConfigHome,
        "configBrand1",
        null
      ),
      configBrand2: formikHelper.getDefaultValueField(
        dataConfigHome,
        "configBrand2",
        null
      ),
      configBrand3: formikHelper.getDefaultValueField(
        dataConfigHome,
        "configBrand3",
        null
      ),
      configBrand4: formikHelper.getDefaultValueField(
        dataConfigHome,
        "configBrand4",
        null
      ),
      configBrand5: formikHelper.getDefaultValueField(
        dataConfigHome,
        "configBrand5",
        null
      ),
      configBrand6: formikHelper.getDefaultValueField(
        dataConfigHome,
        "configBrand6",
        null
      ),
      configProducts: formikHelper.getDefaultValueField(
        dataConfigHome,
        "configProducts",
        null
      ),
      configBlogs: formikHelper.getDefaultValueField(
        dataConfigHome,
        "configBlogs",
        null
      ),

      // configEventRightVideo: formikHelper.getDefaultValueField(
      //   dataConfigHome,
      //   "configEventRightVideo",
      //   null
      // ),
      // configEventRightBanner: formikHelper.getDefaultValueField(
      //   dataConfigHome,
      //   "configEventRightBanner",
      //   null
      // ),
      // configEventRightActive: formikHelper.getDefaultValueField(
      //   dataConfigHome,
      //   "configEventRightActive",
      //   enumType.eventLeftType.Banner
      // ),
    };
  },
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  },
  displayName: "NotificationForm",
});

const FormItem = AntForm.Item;

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
    resetForm,
  } = props;

  // const [activeEvent, setActiveEvent] = useState(enumType.eventLeftType.Banner);

  useEffect(() => {
    resetForm();
  }, [data]);

  return (
    <AntForm {...FORM_ITEM_LAYOUT} onSubmit={handleSubmit}>
      <FormItem
        required={true}
        label={<FormattedMessage id="Label.Banner" defaultMessage="Banner" />}
        className="mb-0"
      >
        <FormattedMessage id="Label.Banner" defaultMessage="Banner">
          {(placeholder) => (
            <BannerSelect
              placeholder={placeholder}
              value={values.configBanner}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configBanner"}
            />
          )}
        </FormattedMessage>
        <ErrorMessage
          fieldName="configBanner"
          touched={touched}
          errors={errors}
          isValidate={true}
        />
      </FormItem>

      {/* <FormItem
        required={true}
        label={<FormattedMessage id="Label.Service" defaultMessage="Service" />}
        className="mb-0"
      >
        <div className="d-flex">
          <div className="mr-2 w-100">
            <FormattedMessage id="Label.Service" defaultMessage="Service">
              {(placeholder) => (
                <HtmlBlockSelect
                  placeholder={placeholder}
                  value={values.configService}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  path={"configService"}
                />
              )}
            </FormattedMessage>
          </div>
        </div>

        <ErrorMessage
          fieldName="configService"
          touched={touched}
          errors={errors}
          isValidate={true}
        />
      </FormItem> */}

      {/* <FormItem
        required={true}
        label={
          <FormattedMessage id="Label.Event.Left" defaultMessage="Event Left" />
        }
      >
        <div className="d-flex">
          <div className="mr-2 w-100">
            <FormattedMessage id="Label.Event.Left" defaultMessage="Event left">
              {(placeholder) => (
                <HtmlBlockSelect
                  placeholder={placeholder}
                  value={values.configEventLeft}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  path={"configEventLeft"}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
      </FormItem> */}

      {/* <FormItem
        required={true}
        label={
          <FormattedMessage id="Label.Event" defaultMessage="Event Right " />
        }
      >
        <div className="">
          <Radio.Group
            name="radiogroup"
            defaultValue={activeEvent}
            value={values.configEventRightActive}
            onChange={(e) => {
              setFieldValue("configEventRightActive", e.target.value);
            }}
          >
            <Radio value={enumType.eventLeftType.Banner}>Banner</Radio>
            <Radio value={enumType.eventLeftType.Video}> Video</Radio>
          </Radio.Group>
          {values.configEventRightActive === enumType.eventLeftType.Banner ? (
            <div className="mr-2 w-100">
              <FormattedMessage id="Label.Banner" defaultMessage="Banner event">
                {(placeholder) => (
                  <BannerSelect
                    placeholder={placeholder}
                    value={values.configEventRightBanner}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    path={"configEventRightBanner"}
                  />
                )}
              </FormattedMessage>
            </div>
          ) : (
            <div className="mr-2 w-100">
              <FormattedMessage id="Label.Url.Video" defaultMessage="Url video">
                {(placeholder) => (
                  <Input
                    placeholder={placeholder}
                    value={values.configEventRightVideo}
                    onChange={(input) => {
                      setFieldValue(
                        "configEventRightVideo",
                        input.target.value
                      );
                    }}
                    onBlur={() =>
                      setFieldTouched("configEventRightVideo", true)
                    }
                  />
                )}
              </FormattedMessage>
            </div>
          )}
        </div>
      </FormItem> */}

      {/* <FormItem
        required={true}
        label={
          <FormattedMessage id="Label.Category" defaultMessage="Category" />
        }
        className="mb-0"
      >
        <FormattedMessage id="Label.Category" defaultMessage="Category">
          {(placeholder) => (
            <CategorySelect
              isProduct={true}
              value={values.configCategory}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configCategory"}
              placeholder={placeholder}
              showCategoryParent={false}
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
        required={true}
        label={
          <FormattedMessage id="Label.Category2" defaultMessage="Category 2" />
        }
        className="mb-0"
      >
        <FormattedMessage id="Label.Category2" defaultMessage="Category 2">
          {(placeholder) => (
            <CategorySelect
              isProduct={true}
              value={values.configCategorySecond}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configCategorySecond"}
              placeholder={placeholder}
              showCategoryParent={false}
            />
          )}
        </FormattedMessage>
        <ErrorMessage
          fieldName="configCategorySecond"
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>

      <FormItem
        required={true}
        label={
          <FormattedMessage id="Label.Category3" defaultMessage="Category 3" />
        }
        className="mb-0"
      >
        <FormattedMessage id="Label.Category3" defaultMessage="Category 3">
          {(placeholder) => (
            <CategorySelect
              isProduct={true}
              value={values.configCategoryThird}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configCategoryThird"}
              placeholder={placeholder}
              showCategoryParent={false}
            />
          )}
        </FormattedMessage>
        <ErrorMessage
          fieldName="configCategoryThird"
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem> */}

      <FormItem
        required={true}
        label={<FormattedMessage id="Label.Brand1" defaultMessage="Brand 1" />}
        className="mb-0"
      >
        <FormattedMessage id="Label.Brand1" defaultMessage="Brand 1">
          {(placeholder) => (
            <BrandHomeSelect
              value={values.configBrand1}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configBrand1"}
              placeholder={placeholder}
            />
          )}
        </FormattedMessage>
        <ErrorMessage
          fieldName="configBrand1"
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>
      <FormItem
        required={true}
        label={<FormattedMessage id="Label.Brand2" defaultMessage="Brand 2" />}
        className="mb-0"
      >
        <FormattedMessage id="Label.Brand2" defaultMessage="Brand 2">
          {(placeholder) => (
            <BrandHomeSelect
              value={values.configBrand2}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configBrand2"}
              placeholder={placeholder}
            />
          )}
        </FormattedMessage>
        <ErrorMessage
          fieldName="configBrand2"
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>
      <FormItem
        required={true}
        label={<FormattedMessage id="Label.Brand3" defaultMessage="Brand 3" />}
        className="mb-0"
      >
        <FormattedMessage id="Label.Brand3" defaultMessage="Brand 3">
          {(placeholder) => (
            <BrandHomeSelect
              value={values.configBrand3}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configBrand3"}
              placeholder={placeholder}
            />
          )}
        </FormattedMessage>
        <ErrorMessage
          fieldName="configBrand3"
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>

      <FormItem
        required={true}
        label={<FormattedMessage id="Label.Brand4" defaultMessage="Brand 4" />}
        className="mb-0"
      >
        <FormattedMessage id="Label.Brand4" defaultMessage="BrBrand 4">
          {(placeholder) => (
            <BrandHomeSelect
              value={values.configBrand4}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configBrand4"}
              placeholder={placeholder}
            />
          )}
        </FormattedMessage>
        <ErrorMessage
          fieldName="configBrand4"
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>

      <FormItem
        required={true}
        label={<FormattedMessage id="Label.Brand5" defaultMessage="Brand 5" />}
        className="mb-0"
      >
        <FormattedMessage id="Label.Brand5" defaultMessage="Brand 5">
          {(placeholder) => (
            <BrandHomeSelect
              value={values.configBrand5}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configBrand5"}
              placeholder={placeholder}
            />
          )}
        </FormattedMessage>
        <ErrorMessage
          fieldName="configBrand5"
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>
      <FormItem
        required={true}
        label={<FormattedMessage id="Label.Brand6" defaultMessage="Brand 6" />}
        className="mb-0"
      >
        <FormattedMessage id="Label.Brand6" defaultMessage="Brand 6">
          {(placeholder) => (
            <BrandHomeSelect
              value={values.configBrand6}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configBrand6"}
              placeholder={placeholder}
            />
          )}
        </FormattedMessage>
        <ErrorMessage
          fieldName="configBrand6"
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>

      <FormItem
        required={true}
        label={
          <FormattedMessage id="Label.Products" defaultMessage="Products" />
        }
        className="mb-0"
      >
        <FormattedMessage id="Label.Products" defaultMessage="Products">
          {(placeholder) => (
            <ProductSelect
              isMulti={true}
              value={values.configProducts}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configProducts"}
              placeholder={placeholder}
              showCategoryParent={false}
            />
          )}
        </FormattedMessage>
        <ErrorMessage
          fieldName="configProducts"
          errors={errors}
          touched={touched}
          isValidate={true}
        />
      </FormItem>
      
      <FormItem
        required={true}
        label={
          <FormattedMessage id="Label.Blogs" defaultMessage="Blogs" />
        }
        className="mb-0"
      >
        <FormattedMessage id="Label.Blogs" defaultMessage="Blogs">
          {(placeholder) => (
            <BlogSelect
              isMulti={true}
              value={values.configBlogs}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={"configBlogs"}
              placeholder={placeholder}
              showCategoryParent={false}
            />
          )}
        </FormattedMessage>
        <ErrorMessage
          fieldName="configBlogs"
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
        buttonSave={
          <FormattedMessage
            id="Button.SaveChange"
            defaultMessage="Save Change"
          />
        }
      />
    </AntForm>
  );
};

export default customFormik(FormAction);
