import gql from 'graphql-tag'
export const VOTE_MUTATION = gql`
mutation submitVote($token: String!, $oppid: Int!) {
  submitVote(
    input: {
      token: $token
      oppId: $oppid
    }
  )
  {
    vote {id}
    errors
  }
}
`