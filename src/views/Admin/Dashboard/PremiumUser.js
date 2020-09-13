import React from 'react'
import ChartistGraph from 'react-chartist'
import { inboundBandwidthData, outboundBandwidthData } from './data'

const PremiumUser = (props) => {
  const {data, chartOptions} = props
  return (
    <div className="col-xl-4">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header">
              <div className="utils__title utils__title--flat">
                <strong className="text-uppercase font-size-16">No. of Premium user</strong>
              </div>
            </div>
            <div className="card-body">
              <span className="font-size-36 font-weight-bold text-primary">{data ? data.totalPremiumUser || 0 : 0}</span>
            </div>
            <ChartistGraph
              data={inboundBandwidthData}
              options={chartOptions}
              type="Line"
              className="height-200"
            />
          </div>
        </div>
        <div className="col-xl-12">
          <div className="graphCard card">
            <div className="card-header">
              <div className="utils__title utils__title--flat">
                <strong className="text-uppercase font-size-16">No. of Sign ups this week</strong>
              </div>
            </div>
            <div className="card-body">
              <span className="font-size-36 font-weight-bold text-success">{data ? data.topUserSignUp || 0 : 0}</span>
            </div>
            <div className="utils__chartist utils__chartist--success">
              <ChartistGraph
                data={outboundBandwidthData}
                options={chartOptions}
                type="Line"
                className="height-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumUser