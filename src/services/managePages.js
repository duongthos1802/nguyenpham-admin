import { htmlHelper, queryStringHelper, stringHelper } from "../extensions";
import { enumType } from "../constants";

export default {
  initQuerySearchPages(values, defaultPageSize) {
    const { pageSize, skip } = queryStringHelper.getSizeAndIndexPage(
      values,
      defaultPageSize
    );

    let query = ``;
    if (values.keyword) {
      const keyword = stringHelper.removeEscapeCharacter(values.keyword);
      query += `, keyword: "${keyword}"`;
    }

    let orderClause = `CREATEDAT_DESC`;
    if (values.sortField) {
      if (values.sortDirection === enumType.sortDirection.DESC) {
        orderClause = `${values.sortField}_DESC`;
      } else {
        orderClause = `${values.sortField}_ASC`;
      }
    }

    return {
      whereClause: `filter: {${query}}, limit: ${pageSize}, skip: ${skip}, sort: ${orderClause}`,
      whereConnectionClause: `filter: {${query}}`,
    };
  },

  initQueryCreateOrUpdatePage(values) {
    let queryClause = ``;
    if (values.name) {
      const name = stringHelper.removeEscapeCharacter(values.name);
      queryClause += `, name: "${name}"`;
    } else {
      queryClause += `, name: null`;
    }

    if (values.urlFrontEnd) {
      const urlFrontEnd = stringHelper.removeEscapeCharacter(
        values.urlFrontEnd
      );
      queryClause += `, urlFrontEnd: "${urlFrontEnd}"`;
    } else {
      queryClause += `, urlFrontEnd: null`;
    }

    if (values.metaTitle) {
      const metaTitle = htmlHelper.encodeContent(values.metaTitle);
      queryClause += `, metaTitle: "${metaTitle}"`;
    } else {
      queryClause += `, metaTitle: null`;
    }

    if (values.metaDescription) {
      const metaDescription = htmlHelper.encodeContent(values.metaDescription);
      queryClause += `, metaDescription: "${metaDescription}"`;
    } else {
      queryClause += `, metaDescription: null`;
    }

    if (values.metaKeyword) {
      const metaKeyword = htmlHelper.encodeContent(values.metaKeyword);
      queryClause += `, metaKeyword: "${metaKeyword}"`;
    } else {
      queryClause += `, metaKeyword: null`;
    }

    queryClause += `, isHomePage: ${!!values.isHomePage}`;

    if (values.id) {
      queryClause += `, _id: "${values.id}"`;
    }

    return `record: {${queryClause}}`;
  },

  initQueryConfigHomePage(values) {
    const initConfigHomePage = {
      configBanner: values.configBanner,

      configBrand1: values.configBrand1,
      configBrand2: values.configBrand2,
      configBrand3: values.configBrand3,
      configBrand4: values.configBrand4,
      configBrand5: values.configBrand5,
      configBrand6: values.configBrand6,

      configProducts: values.configProducts,

      configBlogs: values.configBlogs,
    };
    let queryClause = `config: "${stringHelper.removeEscapeCharacter(
      JSON.stringify(initConfigHomePage)
    )}"`;

    if (values.id) {
      queryClause += `, _id: "${values.id}"`;
    }
    return `record: {${queryClause}}`;
  },
};
