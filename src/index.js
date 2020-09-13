import React from 'react'
import ReactDOM from 'react-dom'

import 'react-perfect-scrollbar/dist/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css' 
// bootstrap styles
import 'antd/dist/antd.css'
import './scss/custom-antd.scss'

import App from './App'

import * as serviceWorker from './serviceWorker'

const noop = () => {}

if (process.env.NODE_ENV === 'production') {
  console.log = noop
  console.warn = noop
  console.error = noop
}

ReactDOM.render(<App/>, document.getElementById('root'))

serviceWorker.unregister()
