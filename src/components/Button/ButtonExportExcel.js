import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DownloadExcel = (data) => {
  return (
    <ExcelFile element={<a className="ant-btn ant-btn-primary">Download Excel</a>}>
      <ExcelSheet data={data && data.data ? data.data : []} name="Employees">
        <ExcelColumn label="Name" value="name" />
        <ExcelColumn label="Email" value="email" />
        <ExcelColumn label="Phone" value="phone" />
        <ExcelColumn label="Address" value="address" />
        <ExcelColumn label="Description" value="description" />
      </ExcelSheet>
    </ExcelFile >
  )
}
export default DownloadExcel