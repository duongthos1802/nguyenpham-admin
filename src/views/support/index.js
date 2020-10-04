import React from 'react'
// lib
import { FormattedMessage } from 'react-intl'
// components
import { CustomCard } from '../../components'
import { Collapse } from 'antd'
const { Panel } = Collapse;

const text = `
  demo content support.
`;

const Index = () => {




  return (
    <CustomCard
      title={
        <strong>
          <FormattedMessage
            id="Title.Support"
            defaultMessage="Support"
          />
        </strong>
      }
    >

      <Collapse >
        <Panel header="Product or Recipes" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="Category" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="Html Block" key="3">
          <p>{text}</p>
        </Panel>
        <Panel header="Manage page" key="4">
          <p>{text}</p>
        </Panel>
        <Panel header="Block" key="5">
          <p>{text}</p>
        </Panel>
        <Panel header="Banner" key="6">
          <p>{text}</p>
        </Panel>
      </Collapse>,

    </CustomCard>
  )
}


export default Index