import { enumType } from "../constants";
import { queryStringHelper, stringHelper, htmlHelper } from "../extensions";

export default {
  initQuerySearchRecruitments(searchObject, defaultPageSize) {
    const { pageSize, skip } = queryStringHelper.getSizeAndIndexPage(
      searchObject,
      defaultPageSize
    );

    let query = "";

    if (searchObject.keyword) {
      const keyword = stringHelper.removeEscapeCharacter(searchObject.keyword);
      query += `keyword: "${keyword}"`;
    } 

    if (searchObject.status) {
      query += `, status: "${searchObject.status}"`;
    }

    let orderClause = "date_DESC";
    if (searchObject.sortField) {
      if (searchObject.sortDirection === enumType.sortDirection.DESC) {
        orderClause = `${searchObject.sortField}_DESC`;
      } else {
        orderClause = `${searchObject.sortField}_ASC`;
      }
    }

    return {
      whereClause: `where: {${query}}, first :${pageSize}, skip: ${skip}, sortBy: "${orderClause}"`,
    };
  },

  initQueryCreateOrUpdate({ values, _id }) {
    let queryClause = ``;

    if (_id) {
      queryClause += `_id: "${_id}"`;
    }

    if (values.name) {
      const name = stringHelper.removeEscapeCharacter(values.name);
      queryClause += `, name: "${name}"`;
    } else {
      queryClause += `, name: null`;
    } 

    if (values?.address) {
      queryClause += `, address: "${values.address}"`;
    } else {
      queryClause += `, address: ""`;
    }

    if (values?.salary) {
      queryClause += `, salary: "${values.salary}"`;
    } else {
      queryClause += `, salary: ""`;
    }

    if (values?.timeWork) {
      queryClause += `, timeWork: "${values.timeWork}"`;
    } else {
      queryClause += `, timeWork: ""`;
    }

    if (values?.startDate && values?.endDate) {
      queryClause +=
        `, startDate: "${values.startDate}" ` +
        `, endDate: "${values.endDate}"`;
    } else {
      queryClause += `, endDate: "", startDate: ""`;
    } 

    if (values.content) {
      const content = htmlHelper.encodeContent(values.content);
      queryClause += `, content: "${content}"`;
    } else {
      queryClause += `, content: null`;
    }

    if (values.updateBy) {
      queryClause += `, updateBy: "${values.updateBy}"`;
    }

    queryClause += `, status: ${values.status}`;
    // queryClause += `, createdBy: "${values.createdBy}"`;

    return `record: {${queryClause}}`;
  },

  initQueryDelete(data) {
    return ` record: {_id: "${data._id}", status: ${enumType.recruitmentStatus.Deleted}}`;
  },
};
