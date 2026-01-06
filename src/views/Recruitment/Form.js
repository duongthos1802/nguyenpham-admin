import React, { useEffect, useRef } from "react";
// lib
import { withFormik } from "formik";
import * as Yup from "yup";
import { Form as AntForm, Input, Row, Col, InputNumber } from "antd";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
// constant
import { DEFAULT_ISO_FORMAT_DATE, enumType } from "../../constants";
import { resource } from "../../routes";
import { validateError } from "../../constants/validate";
// extensions
import {
  formikHelper,
  htmlHelper,
  stringHelper,
  yupHelper,
} from "../../extensions";
// utils
import utils from "../../utils";
// components
import {
  CustomForm,
  DateRangePicker,
  Editor,
  ErrorMessage,
  FooterForm,
  UploadImage,
} from "../../components";
import { errorCode } from "../../constants/error";
import { EnumSelect, CategorySelect } from "../../components/Select";

// name: {
//   type: String,
//   require: true,
// },
// price: {
//   type: String,
// },
// content: {
//   type: String,
// },
// address: {
//   type: String,
// },
// startDate: {
//   type: Date,
// },
// endDate: {
//   type: Date,
// },
// timeWork: {
//   type: String,
// },
// status: {
//   type: String,
//   enum: Object.values(BLOG_STATUS),
// }

const FormItem = AntForm.Item;

const customFormik = withFormik({
  validationSchema: Yup.object().shape({
    name: yupHelper.stringRequired,
    content: yupHelper.stringRequired.test({
      name: "emptyContent",
      test: (value) => {
        try {
          if (value) {
            const contentRemoveSpace = utils.standardizedContent(value);
            return yupHelper.stringRequired.isValidSync(contentRemoveSpace);
          }
          return false;
        } catch (e) {
          return true;
        }
      },
      message: validateError.required,
    }),
  }),
  mapPropsToValues: ({ data, user }) => {
    console.log("uer", user);
    const blogPictures = formikHelper.getListImageValueField({
      data: data,
      fieldName: "pictures",
      imageType: enumType.imagePath.Blog,
      fileNameField: "filename",
    });

    const fileUpload =
      blogPictures && blogPictures.length > 0 ? blogPictures : [];

    return {
      _id: formikHelper.getDefaultValueField(data, "_id", null),
      name: formikHelper.getDefaultValueField(data, "name", null),
      slug: formikHelper.getDefaultValueField(data, "slug", null),
      description: utils.handleShowLineBreakTextarea(
        formikHelper.getDefaultValueField(data, "description", null)
      ),
      content: htmlHelper.decodeContent(
        formikHelper.getDefaultValueField(data, "content", null)
      ),
      category: utils.formatObjectSelect(
        data ? data.category : null,
        "_id",
        "name"
      ),
      createdBy: user?.username ?? null,
      metaTitle: formikHelper.getDefaultValueField(data, "metaTitle", null),
      metaDescription: stringHelper.handleShowLineBreakTextarea(
        formikHelper.getDefaultValueField(data, "metaDescription", null)
      ),
      metaKeyword: formikHelper.getDefaultValueField(data, "metaKeyword", null),
      fileUpload: fileUpload,
      status: formikHelper.getDefaultValueField(
        data,
        "status",
        enumType.blogStatusEnum.PUBLISHED
      ),
    };
  },
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  },
  displayName: "RecruitmentForm",
});

const handleChangeDateRange = (
  startDateField,
  startDate,
  endDateField,
  endDate
) => {
  // setFormData(
  //   immutableHelper.updateDateRange(formData, startDateField, startDate,
  //     endDateField, endDate))
};

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
    handleCancel,
  } = props;
  const nameRef = useRef(null);
  const slugRef = useRef(null);

  useEffect(() => {
    resetForm();
  }, [data]);

  useEffect(() => {
    if (formError) {
      switch (formError.field) {
        case errorCode.NAME_EXIST: {
          setFieldError("name", formError.message);
          if (nameRef && nameRef.current) {
            nameRef.current.focus();
          }
          break;
        }
        case errorCode.SLUG_EXIST: {
          setFieldError("slug", formError.message);
          if (slugRef && slugRef.current) {
            slugRef.current.focus();
          }
          break;
        }
        default:
          break;
      }
    }
  }, [formError]);
  return (
    <CustomForm
      title={
        <span>
          {utils.initTitleForm(
            <FormattedMessage id="Page.BLog" defaultMessage="recruitment" />,
            mode
          )}
        </span>
      }
    >
      <AntForm
        onKeyDown={formikHelper.preventEnterSubmitForm}
        onSubmit={handleSubmit}
      >
        <Row gutter={30}>
          <Col lg={16}>
            <FormItem
              required={true}
              label={<FormattedMessage id="Label.Name" defaultMessage="Name" />}
              className="mb-0"
            >
              <Input
                ref={nameRef}
                value={values.name}
                onChange={(value) => {
                  const name = value.target.value;
                  const slug = stringHelper.generateSlug(name);
                  setFieldValue("name", name);
                  setFieldValue("slug", slug);
                }}
                onBlur={() => setFieldTouched("name", true)}
                className={classNames({
                  "has-error": formikHelper.checkFieldError(
                    errors,
                    touched,
                    "name"
                  ),
                })}
              />
              <ErrorMessage
                fieldName="name"
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>
            <Row gutter={30}>
              <Col lg={12}>
                <FormItem
                  label={
                    <FormattedMessage id="Label.salary" defaultMessage="Salary" />
                  }
                  className="mb-0"
                >
                  <Input
                    ref={nameRef}
                    value={values?.salary}
                    onChange={(value) => {
                      const salary = value.target.value;
                      setFieldValue("salary", salary);
                    }}
                    onBlur={() => setFieldTouched("salary", true)}
                    className={classNames({
                      "has-error": formikHelper.checkFieldError(
                        errors,
                        touched,
                        "salary"
                      ),
                    })}
                  />
                </FormItem>
              </Col>
              <Col lg={12}>
                <FormItem
                  label={
                    <FormattedMessage
                      id="Label.timeWork"
                      defaultMessage="Time Work"
                    />
                  }
                  className="mb-0"
                >
                  <Input
                    ref={nameRef}
                    value={values?.timeWork}
                    onChange={(value) => {
                      const timeWork = value.target.value;
                      setFieldValue("timeWork", timeWork);
                    }}
                    onBlur={() => setFieldTouched("timeWork", true)}
                    className={classNames({
                      "has-error": formikHelper.checkFieldError(
                        errors,
                        touched,
                        "timeWork"
                      ),
                    })}
                  />
                </FormItem>
              </Col>
              <Col lg={12}>
                <FormItem
                  label={
                    <FormattedMessage
                      id="Label.deadline"
                      defaultMessage="Deadline"
                    />
                  }
                  className="mb-0"
                >
                  <DateRangePicker
                    dateFormat={DEFAULT_ISO_FORMAT_DATE}
                    startDate={values.startDate}
                    endDate={values.endDate}
                    startDateField="startDate"
                    endDateField="endDate"
                    enableClear={true}
                    onChange={handleChangeDateRange}
                  />
                </FormItem>
              </Col>
              <Col lg={12}>
                <FormItem
                  label={
                    <FormattedMessage
                      id="Label.address"
                      defaultMessage="Address"
                    />
                  }
                  className="mb-0"
                >
                  <Input
                    ref={nameRef}
                    value={values?.address}
                    onChange={(value) => {
                      const address = value.target.value;
                      setFieldValue("address", address);
                    }}
                    onBlur={() => setFieldTouched("address", true)}
                    className={classNames({
                      "has-error": formikHelper.checkFieldError(
                        errors,
                        touched,
                        "address"
                      ),
                    })}
                  />
                </FormItem>
              </Col>
            </Row>

            <FormItem
              required={true}
              label={
                <FormattedMessage id="Label.Content" defaultMessage="Content" />
              }
              className="mb-0"
            >
              <Editor
                data={values.content}
                handleChange={(value) => setFieldValue("content", value)}
                handleBlur={() => setFieldTouched("content", true)}
                editorConfig="content"
              />
              <ErrorMessage
                fieldName="content"
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>
          </Col>
          <Col lg={8}>
            <FormItem
              required={true}
              label={
                <FormattedMessage id="Label.Status" defaultMessage="Status" />
              }
              className="mb-0"
            >
              <EnumSelect
                options={enumType.recruitmentStatusEnum}
                value={values.status}
                onChange={(value) => setFieldValue("status", value)}
                isClearable={false}
                onBlur={() => setFieldTouched("status", true)}
              />
              <ErrorMessage
                errors={errors}
                touched={touched}
                fieldName="status"
                isValidate={true}
              />
            </FormItem>

            <FormItem
              label={
                <FormattedMessage id="Label.Author" defaultMessage="Author" />
              }
              className="mb-0"
            >
              <Input
                value={values.createdBy}
                disabled
                placeholder="Author"
                onChange={(value) =>
                  setFieldValue("createdBy", value.target.value)
                }
                onBlur={() => setFieldTouched("createdBy", true)}
                className={classNames({
                  "has-error": formikHelper.checkFieldError(
                    errors,
                    touched,
                    "createdBy"
                  ),
                })}
              />
              <ErrorMessage
                fieldName="createdBy"
                touched={touched}
                errors={errors}
                isValidate={true}
              />
            </FormItem>
          </Col>
        </Row>

        <FooterForm
          handleSubmit={handleSubmit}
          resource={resource.MENU_RECRUITMENT}
          handleCancel={handleCancel}
          buttonSave={
            mode === enumType.mode.create ? "Add RECRUIMENT" : "Save Changes"
          }
        />
      </AntForm>
    </CustomForm>
  );
};

export default customFormik(Form);
