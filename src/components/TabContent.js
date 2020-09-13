import React from 'react'
// lib
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
// component
import { CustomCard, PageNotFound } from './index'

const { TabPane } = Tabs

const TabContent = (props) => {

  const {
    title = null,
    activeKey,
    listTabs = [],
    hiddenTab = [],
    baseUrl
  } = props

  const tabShows = listTabs.filter(tab => !hiddenTab.includes(tab.value))

  return activeKey
    ? (
      <CustomCard
        title={title}
      >
        <Tabs
          activeKey={activeKey}
        >
          {
            tabShows.map((tab) => (
              <TabPane
                tab={
                  <Link
                    to={`${baseUrl}/${tab.value}`}
                  >
                    {tab.title}
                  </Link>
                }
                key={tab.value}
              />
            ))
          }
        </Tabs>
        {
          props.children
        }
      </CustomCard>
    )
    : <PageNotFound/>
}

TabContent.propTypes = {
  title: PropTypes.any,
  activeKey: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  hiddenTab: PropTypes.array,
  listTabs: PropTypes.array
}

export default TabContent