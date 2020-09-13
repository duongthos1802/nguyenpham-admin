import React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd'

const LoadableRoute = (Component) => (
  Loadable({
    loader: Component,
    loading: ({ isLoading }) => isLoading && (
      <div
        className='d-flex align-self-stretch align-items-center justify-content-center'
      >
        <Spin size='large'/>
      </div>
    )
  })
)

export default LoadableRoute