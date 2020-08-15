import gql from 'graphql-tag'
export const FANTASYLEAGUE_VOTE_MUTATION = gql`
mutation submitFantasyleagueVote($token: String!, $villains: [String!]!, $best_villain: Int!) {
    submitFantasyleagueVote(
    input: {
      token: $token
      villainIds: $villains
      bestVillain: $best_villain
    }
  )
  {
    vote {id}
    errors
  }
}
`