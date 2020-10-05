import React from 'react'
//lib
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
// hOcs
import { withSearch } from '../../../hocs/withSearch'
// constants
import { queryPath, DEFAULT_LIMIT_TOP_PRODUCT, DEFAULT_LIMIT_RECENT_LOGIN } from '../../../constants'
//service
import {dashboardServices} from '../../../services'

// components
import PremiumUser from './PremiumUser'
import RatingUser from './RatingUser'
import TopProducts from './TopProducts'


const chartOptions = {
  showPoint: true,
  showLine: true,
  showArea: true,
  fullWidth: true,
  showLabel: false,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
  axisY: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
  chartPadding: 0,
  low: 0,
  plugins: [
    ChartistTooltip({
      anchorToPoint: false,
      appendToBody: true,
      seriesName: false,
    }),
  ],
}

const Admin = (props) => {

  const {
    data
  } = props

  const information = data && data.getDashboard
    ? data.getDashboard
    : null

  // render
  return (
    <div className="row settings__borderLess">
      <PremiumUser
        data={information}
        chartOptions={chartOptions}
      />
      <TopProducts
        data={information}
        chartOptions={chartOptions}
      />
      <RatingUser
        data={information}
      />
    </div>
  )
}

const customSearch = withSearch({
  pathName: queryPath.DASHBOARD_QUERY,
  loadData: (values, { loadDataCallback }) => {
    const queryClause = dashboardServices.initQuerydashboard({
      topProduct: DEFAULT_LIMIT_TOP_PRODUCT,
      recentLogin: DEFAULT_LIMIT_RECENT_LOGIN
    })

    // loadDataCallback(queryClause)
  }
})

export default customSearch(Admin)