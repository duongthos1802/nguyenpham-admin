export default {
  loadDataPager(clause) {
    return `
      query {
        adminNotifications (${clause.whereClause}) {
          _id
          date
          text
        }
        adminNotificationsConnection {
          aggregate {
            count
          }
        }
      }
    `
  },

  loadData(clause) {
    return `
      query {
        adminNotification( where: { ${clause} }) {
          _id
          date
          text
        }
      }
    `
  }
}