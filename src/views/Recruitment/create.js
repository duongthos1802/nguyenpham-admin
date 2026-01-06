import React, { useCallback, useEffect } from "react";
import { withCreate } from "../../hocs/withCreate";
import { enumType, queryPath } from "../../constants";
import Form from "./Form";
import { blogServices, categoryService, recruitmentServices } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import dataActions from "../../actions/dataActions";

const Create = (props) => {
  const { formError, handleSubmitForm, handleCancelForm, user } = props;

  return (
    <Form
      formError={formError}
      mode={enumType.mode.create}
      handleSubmit={handleSubmitForm}
      handleCancel={handleCancelForm}
      user={user}
     />
  );
};

const customCreate = withCreate({
  pathName: queryPath.RECRUITMENT_QUERY,
  createData: (values, { createDataCallback }) => {


    console.log(":values ====", values);
    
    const queryClause = recruitmentServices.initQueryCreateOrUpdate({
      values: values,
    });


    console.log("queryClause====", queryClause);
    
    createDataCallback(queryClause);
  },
});

export default customCreate(Create);
