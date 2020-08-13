import gql from 'graphql-tag'
export const FETCH_DATA_QUERY = gql`
  query FetchDataQuery {
      currentRound {
        roundNumber
        id
        date
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
  }
`