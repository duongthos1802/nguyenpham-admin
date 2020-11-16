export default {
	loadDataPager(queryClause) {
		return `
		query {
			searchCustomer(${queryClause.whereClause}) {
				items {
					_id
				name
				phone
				email
				address
				description
				status
				date
				createdAt
				}
				total
			}
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