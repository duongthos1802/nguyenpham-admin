import React from 'react'
import {useSelector} from 'react-redux'
import utils from '../utils'

export const withPermission = Component => {
  return props => {
    const {
      resource,
      action
    } = props

    const state = useSelector(state => ({
      auth: state.auth
    }))

    const enableAction = utils.checkPermission(
      action,
      resource,
      state.auth
    )

    // console.log('enableAction........', enableAction)

    if (enableAction) {
      return <Component
        {...props}
      />
    }
    return null
  }
}