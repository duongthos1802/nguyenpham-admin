import React, { memo } from 'react'
import { Spin } from 'antd'

const CustomSpin = ({ spinning, children }) => (
  <Spin
    spinning={spinning}
    className='custom-loading'
    tip='Loading...'
  >
    {children}
  </Spin>
)

export default memo(CustomSpin)
