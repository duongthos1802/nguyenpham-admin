import XLSX from 'xlsx'
import { DEFAULT_DISCOUNT_RANGE, enumType } from '../constants'

const borderCell = {
  top: { style: 'thin' },
  left: { style: 'thin' },
  bottom: { style: 'thin' },
  right: { style: 'thin' }
}

const fontCell = {
  name: 'Arial'
}

const headerStyle = {
  font: {
    bold: true,
    size: 15,
    ...fontCell
  },
  border: borderCell
}

const cellStyle = {
  font: {
    ...fontCell,
    size: 13
  }
  // border: borderCell
}

export const excelMimeType = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv'
]

export const cellType = {
  Number: 'Number',
  Text: 'Text',
  Option: 'Option'
}

export const optionBoolean = ['TRUE', 'FALSE']

export const optionProductStatus = ['Online', 'Offline', 'Suspended']

const discountRange = () => {
  let discount = []

  for (let index = DEFAULT_DISCOUNT_RANGE[0]; index <=
  DEFAULT_DISCOUNT_RANGE[1]; index += 5) {
    discount.push(index.toString())
  }
  return discount
}

export const productSheetColumn = [
  {
    header: 'No',
    key: 'index',
    type: cellType.Number,
    allowNull: true,
    option: [],
    defaultValue: 0,
    width: 10
  },
  {
    header: 'Name',
    key: 'name',
    type: cellType.Text,
    allowNull: false,
    option: [],
    defaultValue: null,
    width: 35
  },
  {
    header: 'User (Signed up)',
    key: 'user',
    type: cellType.Text,
    allowNull: false,
    option: [],
    defaultValue: null,
    width: 30
  },
  {
    header: 'Category',
    key: 'category',
    type: cellType.Option,
    allowNull: false,
    option: [],
    defaultValue: null,
    width: 35
  },
  {
    header: 'CategoryId',
    key: 'categoryId',
    type: cellType.Text,
    allowNull: false,
    option: [],
    defaultValue: null,
    hidden: true,
    width: 35
  },
  {
    header: 'Daily Rate',
    key: 'price',
    type: cellType.Number,
    allowNull: false,
    option: [],
    defaultValue: 0,
    width: 15
  },
  // {
  //   header: 'Daily Rate',
  //   key: 'flatRate',
  //   type: cellType.Number,
  //   allowNull: false,
  //   option: [],
  //   defaultValue: 0,
  //   width: 15
  // },
  {
    header: 'Deposit',
    key: 'deposit',
    type: cellType.Number,
    allowNull: false,
    option: [],
    defaultValue: 0,
    width: 15
  },
  {
    header: 'Description',
    key: 'description',
    type: cellType.Text,
    allowNull: false,
    option: [],
    defaultValue: 0,
    width: 35
  },
  {
    header: 'Self Collect',
    key: 'selfCollect',
    type: cellType.Option,
    allowNull: false,
    option: optionBoolean,
    defaultValue: optionBoolean[0],
    width: 15
  },
  {
    header: 'Delivery',
    key: 'delivery',
    type: cellType.Option,
    allowNull: false,
    option: optionBoolean,
    defaultValue: optionBoolean[0],
    width: 20
  },
  {
    header: 'Delivery Options',
    key: 'deliveryType',
    type: cellType.Option,
    allowNull: true,
    option: enumType.DeliveryOptions,
    defaultValue: null,
    width: 20
  },
  {
    header: 'Delivery Fee',
    key: 'flatRate',
    type: cellType.Number,
    allowNull: false,
    option: [],
    defaultValue: 0,
    width: 30
  },
  {
    header: 'Quantity',
    key: 'quantity',
    type: cellType.Number,
    allowNull: false,
    option: [],
    defaultValue: 1,
    width: 30
  },
  {
    header: 'Discount Weekly (%)',
    key: 'discountWeekly',
    type: cellType.Option,
    allowNull: false,
    option: discountRange(),
    defaultValue: 0,
    width: 25
  },
  {
    header: 'Discount Monthly (%)',
    key: 'discountMonthly',
    type: cellType.Option,
    allowNull: false,
    option: discountRange(),
    defaultValue: 0,
    width: 25
  },
  {
    header: 'Min Rental days',
    key: 'minRentalDay',
    type: cellType.Number,
    allowNull: false,
    option: [],
    defaultValue: 1,
    width: 25
  },
  // {
  //   header: 'View Count',
  //   key: 'viewCount',
  //   type: cellType.Number,
  //   allowNull: false,
  //   option: [],
  //   defaultValue: 0,
  //   width: 15
  // },
  // {
  //   header: 'Like Count',
  //   key: 'likeCount',
  //   type: cellType.Number,
  //   allowNull: false,
  //   option: [],
  //   defaultValue: 0,
  //   width: 15
  // },
  // {
  //   header: 'Status',
  //   key: 'status',
  //   type: cellType.Option,
  //   allowNull: false,
  //   option: optionProductStatus,
  //   defaultValue: optionProductStatus[0],
  //   width: 20
  // }
]

export const readFileImport = (
  {
    file,
    handleFileData,
    sheetIndex = 0,
    hasHeader
  }) => {
  /* Boilerplate to set up FileReader */
  const reader = new FileReader()
  const rABS = !!reader.readAsBinaryString
  reader.onload = (event) => {
    /* Parse data */
    const bstr = event.target.result
    const workBook = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' })
    /* Get first worksheet */
    const worksheetName = workBook.SheetNames[sheetIndex]
    const workSheet = workBook.Sheets[worksheetName]
    /* Convert array of arrays */
    const option = {}
    if (hasHeader) {
      option.header = 1
    }
    let data = XLSX.utils.sheet_to_json(workSheet, option)
    if (hasHeader) {
      data.shift()
    }
    data = data.filter(record => record.length > 0)

    handleFileData(data)
  }
  if (rABS) {
    reader.readAsBinaryString(file)
  } else {
    reader.readAsArrayBuffer(file)
  }
}

export const getStyleForCell = (
  {
    worksheet,
    fromColumn,
    toColumn,
    fromRow,
    toRow,
    isHeader
  }
) => {
  const style = isHeader
    ? headerStyle
    : cellStyle
  for (let column = fromColumn; column <= toColumn; column++) {
    for (let row = fromRow; row <= toRow; row++) {
      const columnName = String.fromCharCode(column + 65)
      worksheet.getCell(`${columnName}${row}`).style = style
    }
  }
}

export const getNameColumn = (column, headerColumn) => {
  if (!column || !headerColumn || headerColumn.length === 0) {
    return null
  }
  const columnIndex = headerColumn.findIndex(item => item.key === column)
  return columnIndex >= 0 ? String.fromCharCode(columnIndex + 65) : null
}

export const addColumnNameToHeader = (header) => {
  if (!header || header.length === 0) {
    return []
  }

  header.forEach((column, index) => {
    column.columnName = getNameColumn(column.key, header)
    column.index = index
  })
}

export const formatNumberCell = (cell, cellValue = 0) => {
  cell.value = cellValue > 0
    ? cellValue
    : null
  cell.style = {
    numFmt: '#,##0_);(#,##0)'
  }
}

export const formatOptionCell = (
  {
    cell,
    option,
    defaultValue,
    columnName,
    row
  }
) => {
  if (defaultValue) {
    cell.value = {
      formula: `IF(${columnName}${row}="", "", "${defaultValue}")`,
      result: defaultValue
    }
  }
  cell.dataValidation = {
    type: 'list',
    allowBlank: false,
    formulae: [option],
    showErrorMessage: true,
    errorStyle: 'error',
    errorTitle: 'Invalid Value',
    error: 'Please select an valid option'
  }
}

export const addCellValidation = (
  {
    worksheet,
    headerColumns,
    fromRow,
    toRow
  }
) => {
  if (!worksheet || !headerColumns || headerColumns.length === 0) {
    return
  }
  const listNumberColumns = headerColumns.filter(
    ({ type }) => type === cellType.Number)
  const listOptionColumns = headerColumns.filter(
    ({ type }) => type === cellType.Option)

  if (listNumberColumns.length > 0) {
    listNumberColumns.forEach(column => {
      for (let row = fromRow; row < toRow; row++) {
        const cell = worksheet.getCell(`${column.columnName}${row}`)
        formatNumberCell(cell, column.defaultValue)
      }
    })
  }

  if (listOptionColumns.length > 0) {
    listOptionColumns.forEach(column => {
      for (let row = fromRow; row < toRow; row++) {
        const cell = worksheet.getCell(`${column.columnName}${row}`)
        formatOptionCell({
          cell: cell,
          option: `"${column.option.join(',')}"`,
          columnName: column.columnName,
          row: row
        })
      }
    })
  }
}

export default {
  readFileImport,
  getStyleForCell,
  getNameColumn,
  addColumnNameToHeader,
  formatNumberCell,
  formatOptionCell,
  addCellValidation
}