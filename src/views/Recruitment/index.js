import React from "react";
// lib
import { FormattedMessage } from "react-intl";
// HoCs
import { withSearch } from "../../hocs/withSearch";
// constant
import { DEFAULT_PAGE_SIZE, enumType, queryPath } from "../../constants";
import { routes } from "../../routes";
// extensions
import { queryStringHelper } from "../../extensions";
// services
import { recruitmentServices } from "../../services";
// components
import { ColSearch, CustomCard, SearchBox } from "../../components";
import { CustomCreateButton } from "../../components/Button";
import { CategorySelect, EnumSelect } from "../../components/Select";
import utils from "../../utils";
import DataGrid from "./DataGrid";
// actions

const Search = ({ search, handleSearchClick, parentId }) => (
  <div className="row">
    <ColSearch label="Keyword" customCol="col-lg-4">
      <FormattedMessage id="Placeholder.Keyword" defaultMessage="Keyword">
        {(placeholder) => (
          <SearchBox
            placeholder="Search"
            value={search.keyword}
            onChange={(value) => handleSearchClick("keyword", value)}
          />
        )}
      </FormattedMessage>
    </ColSearch> 
    <ColSearch label="Status" customCol="col-lg-4">
      <FormattedMessage id="Placeholder.Blog" defaultMessage="Status">
        {(placeholder) => (
          <EnumSelect
            isClearable={true}
            placeholder={placeholder}
            value={search.status}
            labelField="description"
            onChange={(value) => handleSearchClick("status", value)}
            options={enumType.blogStatusEnum}
          />
        )}
      </FormattedMessage>
    </ColSearch>
  </div>
);

const Index = (props) => {
  const {
    data,
    search,
    handleSearchClick,
    handleChangePageSize,
    handleChangePageIndex,
    handleChangeItemUpdate,
    handleChangeTable,
  } = props;

  const { pageIndex, pageSize } = queryStringHelper.getSizeAndIndexPage(
    search,
    DEFAULT_PAGE_SIZE
  );

  const { countConnection, dataGrid } = utils.getCountAndDataGridItems(
    data,
    "searchRecruitments",
    pageSize,
    pageIndex
  );

  return (
    <CustomCard
      title={
        <strong>
          <FormattedMessage
            id="Title.Recruitment"
            defaultMessage="Recruitment"
          />
        </strong>
      }
      buttonGroup={
        <CustomCreateButton
          linkUrl={routes.ROUTE_RECRUITMENT_CREATE}
          labelName="Create Recruitment"
        />
      }
    >
      <Search search={search} handleSearchClick={handleSearchClick} />
      <DataGrid
        search={search}
        data={dataGrid}
        total={countConnection}
        handleChangeItemUpdate={handleChangeItemUpdate}
        handleChangeTable={handleChangeTable}
        handleChangePageIndex={handleChangePageIndex}
        handleChangePageSize={handleChangePageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </CustomCard>
  );
};

const customSearch = withSearch({
  pathName: queryPath.RECRUITMENT_QUERY,
  fieldName: (
    <FormattedMessage id="Page.Recruitment" defaultMessage="recruitment" />
  ),
  loadData: (values, { loadDataPagerCallback }) => {
    const queryClause = recruitmentServices.initQuerySearchRecruitments(
      values,
      DEFAULT_PAGE_SIZE
    );
    loadDataPagerCallback(queryClause);
  },
  deleteData: (values, { updateDataCallback }) => {
    const queryClause = recruitmentServices.initQueryDelete(values);
    updateDataCallback(queryClause);
  },
});

export default customSearch(Index);
