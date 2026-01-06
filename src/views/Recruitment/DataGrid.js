import React, { memo } from "react";
// lib
import { Divider } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
// constant
import { enumType } from "../../constants";
import { resource, routes } from "../../routes";
// utils
// component
import { CustomTable } from "../../components";
import { ButtonAction, ButtonDelete } from "../../components/Button";
// extensions
import { redirectPath } from "../../actions/commonAction";
import BlogStatus from "../../components/Tag/BlogStatus";

const DataGrid = (props) => {
  const {
    search,
    data,
    total,
    pageSize,
    pageIndex,
    handleChangePageSize,
    handleChangePageIndex,
    handleChangeItemUpdate,
    handleChangeTable,
  } = props;

  let header = [
    {
      title: <FormattedMessage id="Grid.name" defaultMessage="Name" />,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <FormattedMessage id="Grid.salary" defaultMessage="Salary" />,
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: <FormattedMessage id="Grid.timeWork" defaultMessage="timeWork" />,
      dataIndex: "timeWork",
      key: "timeWork",
    },
    {
      title: <FormattedMessage id="Grid.Deadline" defaultMessage="Deadline" />,
      dataIndex: "Deadline",
      key: "Deadline",
      render: (text, record) => (
        <div>
          {record?.startDate} - {record?.endDate}
        </div>
      ),
    },
    {
      title: <FormattedMessage id="Grid.Address" defaultMessage="Address" />,
      dataIndex: "address",
      key: "Address",
    },
    {
      title: <FormattedMessage
        id="Grid.Status"
        defaultMessage="Status"
      />,
      dataIndex: 'status',
      key: 'status',
      render: (text) => <BlogStatus status={text}/>
    },
    {
      title: <FormattedMessage id="Grid.Action" defaultMessage="Action" />,
      className: "text-center",
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <div className="d-flex align-items-center justify-content-center">
          <ButtonAction
            resource={resource.MENU_RECRUITMENT}
            action={enumType.action.View}
            buttonName={
              <FormattedMessage id="Button.View" defaultMessage="View" />
            }
            customClass="bg-transparent border-0 text-primary px-0"
          />
          {record.status !== enumType.blogStatus.Deleted ? (
            <div>
              <Divider type="vertical" />
              <ButtonDelete
                type={enumType.buttonTypeComponent.Link}
                isHiddenIcon={true}
                resource={resource.MENU_RECRUITMENT}
                action={enumType.action.Write}
                record={record}
                handleChangeItemUpdate={handleChangeItemUpdate}
                customClass="px-0"
              />
            </div>
          ) : null}
        </div>
      ),
    },
  ];

  const dataGrid = data && data.length > 0 ? data : [];

  return (
    <CustomTable
      rowKey={(record) => record._id}
      columns={header}
      dataGrid={dataGrid}
      total={total}
      pageSize={pageSize}
      pageIndex={pageIndex}
      showPagination={true}
      handleChangePageIndex={handleChangePageIndex}
      handleChangePageSize={handleChangePageSize}
      onChangeTable={handleChangeTable}
      onRowClick={(record) =>
        redirectPath(`${routes.ROUTE_RECRUITMENT_EDIT}/${record._id}`)
      }
    />
  );
};

DataGrid.propTypes = {
  search: PropTypes.any,
  data: PropTypes.any,
  auth: PropTypes.any,
  total: PropTypes.any,
  pageSize: PropTypes.any,
  pageIndex: PropTypes.any,
  handleChangePageSize: PropTypes.func,
  handleChangePageIndex: PropTypes.func,
  handleChangeItemUpdate: PropTypes.func,
  handleChangeTable: PropTypes.func,
};

export default memo(DataGrid);
