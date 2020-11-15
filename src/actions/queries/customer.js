export default {
  loadDataPager(queryClause) {
    return `
		query {
			customers(${queryClause.whereClause}) {
				_id
				name
				phone
				email
        address
        description
				status
				createdAt
			}
			customersCount(${queryClause.whereConnectionClause})
		}
		`
  },

  loadData(queryClause) {
    return `
			query {
				customer(${queryClause}) {
					_id
					name
					phone
					email
          address
          description
					status
					createdAt
				}
			}
		`
  },

  create(dataClause) {
    return `
      mutation {
        createCustomer(${dataClause}) {
          recordId
        }
      }
    `
  },

  update(queryClause) {
    return `
			mutation {
				updateCustomer(${queryClause}) {
					recordId
				}
			}
    `
  }
}