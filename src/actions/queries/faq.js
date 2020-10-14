export default {
	loadDataPager(queryClause) {
		return `
		query {
			faqs(${queryClause.whereClause}) {
				_id
				title
				answer
				description
				status
				priority
				createdAt
			}
			faqsCount(${queryClause.whereConnectionClause})
		}
		`
	},

	loadData(queryClause) {
		return `
			query {
				faq(${queryClause}) {
					_id
					title
					answer
					description
					status
					priority
					createdAt
				}
			}
		`
	},

	create(dataClause) {
		return `
      mutation {
        createFaq(${dataClause}) {
          recordId
        }
      }
    `
	},

	update(queryClause) {
		return `
			mutation {
				updateFaq(${queryClause}) {
					recordId
				}
			}
    `
	}
}