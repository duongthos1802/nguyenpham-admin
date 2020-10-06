import React, {useCallback, useEffect, useState} from 'react'
// lib
import {useDispatch, useSelector} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {Menu, Dropdown, Avatar, Badge} from 'antd'
// action
import authActions from '../../../actions/authActions'
// utils
import utils from '../../../utils'
// component
import {FormModal} from '../../index'
import ChangePasswordForm from './ChangePassword'
import {stringHelper} from '../../../extensions'

const ProfileMenu = () => {

  const [openModal, setOpenModal] = useState(false)
  const [userInfo, setUserInfo] = useState({
    userName: 'Guest',
    email: null,
    id: null
  })

  const state = useSelector(state => ({
    auth: state.auth,
    formError: state.form
  }))

  // map dispatch from redux to local
  const dispatch = useDispatch()

  const onLogout = useCallback(
    () => dispatch(authActions.logout()),
    [dispatch]
  )

  const changePassword = useCallback(
    (username, oldPass, newPass) => dispatch(authActions.changePassword(username, oldPass, newPass)),
    [dispatch]
  )

  useEffect(
    () => {
      if (state.auth && state.auth.user) {
        const {
          user
        } = state.auth
        setUserInfo({
          userName: user.username,
          email: user.mail,
          id: user._id
          //email: stringHelper.decodeEmailAddress(user.emailEncrypt)
        })
      }
    },
    [state.auth]
  )

  const handleLogout = () => {
    onLogout()
  }

  const handleChangePassword = (values) => {
    changePassword(userInfo.id, values.oldPass, values.newPass)
    setOpenModal(false)
  }

  const generateUserMenu = (userInfo) => (
    <Menu selectable={false}>
      <Menu.Item>
        <div className="rfq__widget__system-status__item">
          <strong>Hello, {userInfo.userName}</strong>
        </div>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item>
        <div className="rfq__widget__system-status__item">
          <a
            onClick={() => setOpenModal(true)}
          >
            <FormattedMessage
              id={'Label.ChangePassword'}
              defaultMessage={'Change Password'}/>
          </a>
        </div>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item>
        <a onClick={handleLogout}>
          <i className="topbar__dropdownMenuIcon icmn-exit"/> Logout
        </a>
      </Menu.Item>
    </Menu>
  )

  // render
  return userInfo
    ? (
      <div className="topbar__dropdown d-inline-block">
        <Dropdown
          overlay={generateUserMenu(userInfo)}
          trigger={['click']}
          // placement="bottomRight"
        >
          <a className="ant-dropdown-link" href="/">
            <Avatar size="large" className='text-uppercase' shape="square">
              {utils.getAbbreviate(userInfo.userName)}
            </Avatar>
          </a>
        </Dropdown>
        <FormModal
          customClass='modal-lg'
          open={openModal}
          handleCloseModal={() => setOpenModal(false)}
          title={
            <FormattedMessage
              id="Title.ChangePassword"
              defaultMessage="Change Password"
            />
          }
        >
          <ChangePasswordForm
            toggle={openModal}
            handleSubmit={handleChangePassword}
          />
        </FormModal>
      </div>
    )
    : null
}

export default ProfileMenu
