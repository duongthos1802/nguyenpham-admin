import React, { useEffect, useState } from 'react'
import { Select, Icon } from 'antd'
import { enumType } from '../constants'

const DeliveryTypeSelect = ({ type, onChange, values }) => {
  const [currentSelect, setCurrentSelect] = useState(enumType.DeliveryOptionsValue.OneWay)
  const { Option } = Select

  useEffect(() => {
    if (onChange) {
      if (type === enumType.DeliveryOptionsValue.NoDelivery || type === null) {
        onChange(enumType.DeliveryOptionsValue.OneWay)
        setCurrentSelect(enumType.DeliveryOptionsValue.OneWay)
      } else {
        setCurrentSelect(type)
      }
    }
  }, [values.delivery])

  return (
    <React.Fragment>
      <Icon type="line" className="ml-3" />
      <Select
        onChange={(value) => {
          onChange(value)
          setCurrentSelect(value)
        }}
        value={currentSelect}
        style={{ width: '35%' }}
        className={`custom-topbar-category text-uppercase rounded-0 bg__breadcrumb border-grey font-cabin border-radius-left-2 text__search ml-3`}
      >
        {enumType.deliveryType.map((item, index) => {
          return (
            <Option value={item.value} key={index} className={`text-uppercase`}>
              {item.label}
            </Option>
          )
        })}
      </Select>
    </React.Fragment>
  )
}

export default DeliveryTypeSelect