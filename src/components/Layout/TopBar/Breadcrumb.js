import React, { memo, useState, useEffect } from 'react'
import { reduce } from 'lodash'
import { Breadcrumb as AntBreadcrumb } from 'antd'

import { navAdmin as menuData, routes } from '../../../routes'

const Breadcrumb = props => {
  // state
  const [mainBreadcrumb, setMainBreadcrumb] = useState([])

  // functions
  const getPath = (data, url, parents = []) => {
    const items = reduce(
      data,
      (result, entry) => {
        if (result.length) {
          return result
        } else if (entry.path === url) {
          return [entry].concat(parents)
        } else if (entry.children) {
          const nested = getPath(entry.children, url, [entry].concat(parents))
          return nested || result
        }
        return result
      },
      []
    )
    return items.length > 0 ? items : false
  }

  const getBreadcrumb = (props, items) => {
    let breadcrumb = mainBreadcrumb
    let url = props.location.pathname
    const urlPath = getPath(items, url)
    if (urlPath.length > 0) {
      let [activeMenuItem, ...path] = urlPath
      if (activeMenuItem) {
        if (path.length) {
          breadcrumb = path.reverse().map((item, index) => {
            if (index === path.length - 1) {
              return (
                <React.Fragment
                  key={index}
                >
                  <AntBreadcrumb.Item
                    key={Math.random()}
                    className='breadcrumbBar__path'
                  >
                    {item.name}
                  </AntBreadcrumb.Item>
                  <AntBreadcrumb.Item
                    key={Math.random()}
                    className='breadcrumbBar__path'
                  >
                    {activeMenuItem.name}
                  </AntBreadcrumb.Item>
                </React.Fragment>

              )
            } else {
              return (
                <AntBreadcrumb.Item
                  key={Math.random()}
                  className='breadcrumbBar__path'
                >
                  {item.name}
                </AntBreadcrumb.Item>
              )
            }
          })
        } else {
          return (
            <AntBreadcrumb.Item
              key={Math.random()}
              className='breadcrumbBar__path'
            >
              {activeMenuItem.name}
            </AntBreadcrumb.Item>
          )
        }

      } else {
        breadcrumb = (
          <AntBreadcrumb.Item
            key={Math.random()}
            className='breadcrumbBar__path'
          >
            {props.name}
          </AntBreadcrumb.Item>
        )
      }
    }
    return breadcrumb
  }

  // effect
  useEffect(() => {
    setMainBreadcrumb(getBreadcrumb(props, menuData))
  }, [props.location.pathname])

  // render
  return (
    <AntBreadcrumb
      className='breadcrumbBar my-0 border-0 py-4'
      separator={
        <span className="lnr lnr-chevron-right"/>
      }>
      <AntBreadcrumb.Item
        className='breadcrumbBar__path'
        href={routes.ADMIN_DASHBOARD}
      >
        Home
      </AntBreadcrumb.Item>
      {mainBreadcrumb}
    </AntBreadcrumb>
  )
}

export default memo(Breadcrumb)
