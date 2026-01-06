import React from "react";
import { enumType, queryPath } from "../../constants";
import { withUpdate } from "../../hocs/withUpdate";
import { routes } from "../../routes";
import {
  recruitmentServices
} from "../../services";
import Form from "./Form";

const Edit = (props) => {
  const {
    match,
    formError,
    data,
    handleSubmitForm,
    handleCancelForm,
    user,
  } = props;

  const { id } = match.params;

  const recruitmentDetail =
    data && data.recruitment && data.recruitment._id === id ? data.recruitment : null;


    console.log("recruitmentDetail======", recruitmentDetail);
    
  return recruitmentDetail ? (
    <Form
      formError={formError}
      data={recruitmentDetail}
      mode={enumType.mode.edit}
      handleCancel={handleCancelForm}
      handleSubmit={handleSubmitForm}
      user={user}
    />
  ) : null;
};

const customUpdate = withUpdate({
  pathName: queryPath.RECRUITMENT_QUERY,
  loadData: (values, { loadDataCallback }) => {
    const query = `_id: "${values}"`;
    loadDataCallback(query);
  },
  updateData: (values, { updateDataCallback }) => {
    const query = recruitmentServices.initQueryCreateOrUpdate({
      values: values,
      _id: values._id,
    });
    updateDataCallback(query);
  },
  pathRedirect: routes.ADMIN_RECRUITMENT,
});

export default customUpdate(Edit);
