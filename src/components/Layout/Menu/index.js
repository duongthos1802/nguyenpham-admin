import React, {useState, useEffect} from 'react'
import DrawerMenu from 'rc-drawer'

import MenuLeft from './Menu'
import {usePrevious} from '../../../hooks/usePrevious'

import 'rc-drawer/assets/index.css'

const Index = (props) => {

  const {
    isMobile,
    menuCollapsed,
    menuMobileOpened,
    handleToggleMenuMobileOpen,
    handleToggleMenuCollapse
  } = props
  // state
  const [open, setOpen] = useState(false)

  // functions
  const toggleOpen = () => {
    if (isMobile) {
      handleToggleMenuMobileOpen()
    } else {
      handleToggleMenuCollapse()
    }
  }

  useEffect(
    () => {
      if (!isMobile) {
        setOpen(menuCollapsed)
      }
    },
    [menuCollapsed]
  )

  useEffect(
    () => {
      if (isMobile) {
        setOpen(menuMobileOpened)
      }
    },
    [menuMobileOpened]
  )

  // HOOKs
  const usePreviousOpen = usePrevious(menuMobileOpened)
  useEffect(
    () => {
      if (!usePreviousOpen) {
        setOpen(menuMobileOpened)
      }
    },
    [menuMobileOpened]
  )

  // render
  return isMobile
    ? (
      <DrawerMenu
        getContainer={null}
        level={null}
        open={open}
        onMaskClick={toggleOpen}
        onHandleClick={toggleOpen}
      >
        <MenuLeft
          {...props}
        />
      </DrawerMenu>
    ) : (
      <MenuLeft
        {...props}
      />
    )
}

export default Index
