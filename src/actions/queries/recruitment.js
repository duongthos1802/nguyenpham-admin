export default {
  loadData(queryClause) {
    return `
    query {
      recruitment(${queryClause}) {
        _id
        name
        salary
        content
        address
        startDate
        endDate
        timeWork
        status
      }
    }`;
  },
 
  loadDataPager(queryClause) {
    return `
    query {
      searchRecruitments(${queryClause.whereClause}) {
        items {
          _id
          name
          salary
          content
          address
          startDate
          endDate
          timeWork
          status
        }
        total
      }
    }
    `;
  },

  create(queryClause) {
    return `
    mutation {
      createRecruitment(${queryClause}) {
        recordId
      }
    }
    `;
  },

  update(queryClause) {
    return `
    mutation {
      updateRecruitment(${queryClause}) {
        recordId
      }
    }
    `;
  },
  delete(queryClause) {
    return `
    mutation {
      deleteRecruitment(${queryClause}) {
        recordId
      }
    }
    `;
  },
};
