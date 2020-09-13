export default {
  initQuerydashboard(dashboardClause) {
    return `limitTopProduct: ${dashboardClause.topProduct}, limitRecentLogin: ${dashboardClause.recentLogin}`
  }
}