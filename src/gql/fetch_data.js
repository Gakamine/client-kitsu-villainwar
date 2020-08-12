import gql from 'graphql-tag'
export const FETCH_DATA_QUERY = gql`
  query FetchDataQuery {
      currentRound {
        roundNumber
        id
        dateStart
        dateEnd
        opp1Id {
          id
          name
          image
        }
        opp2Id {
          id
          name
          image
        }
      }
      getResults{
        dateEnd
        dateStart
        id
        roundNumber
        opp1Id {
          id
          name
          image
        }
        opp2Id {
          id
          name
          image
        }
        resultsOpp1
        resultsOpp2
      }
  }
`