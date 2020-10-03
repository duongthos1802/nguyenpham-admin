import React from 'react'
// lib
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
// constant
import { enumType } from '../../constants'
// utils
import utils, { urlUtils } from '../../utils'
// component
import { TabContent } from '../../components'

const TabEdit = (props) => {
  const {
    activeKey,
    pageId,
    page,
  } = props
  return (
    <TabContent
      title={
        <div className='text-uppercase'>
          <strong>
            {
              utils.initTitleForm(
                <FormattedMessage
                  id="Page.ManagePages"
                  defaultMessage="Manage Pages"
                />,
                enumType.mode.edit
              )
            }
          </strong>
        </div>
      }
      activeKey={activeKey}
      baseUrl={urlUtils.getUrlEditPage(pageId)}
      listTabs={urlUtils.getPageEditTabs(page ? page.pathPageConfig : null)}
    >
      {props.children}
    </TabContent>
  )
}

TabEdit.propTypes = {
  activeKey: PropTypes.string,
  pageId: PropTypes.string
}

export default TabEdit