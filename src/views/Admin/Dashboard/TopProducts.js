import React from 'react'
import utils from '../../../utils'
import ShortItemInfo from '../../../components/CleanUIComponents/ShortItemInfo'
import { getImageProduct } from '../../../extensions/product'

const ListProducts = ({ data }) => {
  return (
    <React.Fragment>
      {data.map(item => {
        const actionData = (
          <span>{utils.showDecimalPlace(item.price)}</span>
        )
        return (
          <ShortItemInfo
            key={item.name}
            img={getImageProduct(item)}
            name={item.name}
            actionData={actionData}
          />
        )
      })}
    </React.Fragment>
  )
}

const TopProducts = (props) => {
  const { data } = props
  return (
    <div className="col-xl-4">
      <div className="card graphCard card--fullHeight">
        <div className="card-header">
          <div className="utils__title utils__title--flat">
            <strong className="text-uppercase font-size-16">Top products</strong>
          </div>
        </div>
        <div className="card-body">
          {
            data ? (
              <ListProducts
                data={data.topProducts}
              />
            ) :  null
          }
        </div>
      </div>
    </div>
  )
}

export default TopProducts