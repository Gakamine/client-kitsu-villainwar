<template>
    <div id="vote">
      <form v-if="data" class="grid">
        <div class="grid-items">
          <b-radio v-model="vote"
              name="opponents"
              :native-value="data.opp1Id.id">
              <img :src="'https://api.villainwar.madao-king.xyz/'+data.opp1Id.image"/>
              <p>{{ data.opp1Id.name }}</p>
          </b-radio>
          <b-radio v-model="vote"
              name="opponents"
              :native-value="data.opp2Id.id">
              <img :src="'https://api.villainwar.madao-king.xyz/'+data.opp2Id.image"/>
              <p>{{ data.opp2Id.name }}</p>
          </b-radio>
        </div>
        <input v-if="token&&!checkvote" type="button" value="Submit your vote" @click="SubmitVote()" class="button is-primary"/>
        <input v-else-if="checkvote" type="button" value="You already voted" disabled class="button is-primary"/>
        <input v-else type="button" value="You need to log in" disabled class="button is-primary"/>
      </form>
      <fantasyleague v-else/>
    </div>
</template>
<script>
import { VOTE_MUTATION } from '../gql/mutation_vote';
import fantasyleague from '../components/FantasyLeague.vue'
export default {
  name: 'VotePage',
  props: ['data','token','checkvote'],
  components: { fantasyleague },
  data() {
    return {
      vote: null,
      api_response: null
    }
  },
  methods: {
    SubmitVote: function() {
      if(this.vote) {
        this.$apollo.mutate({
          // Query
          mutation: VOTE_MUTATION,
          // Parameters
          variables: {
            token: this.token,
            oppid: parseInt(this.vote)
          }
        })
        .then((reponse) => {
          this.api_response=reponse.data.submitVote
          if(this.api_response.errors[0]&&this.api_response.errors!="_typename") {
            this.$buefy.notification.open({
                duration: 5000,
                message: this.api_response.errors[0],
                type: 'is-danger',
            })
          } else {
            this.$buefy.notification.open({
                duration: 5000,
                message: "Vote submitted",
                type: 'is-success',
            })
            this.checkvote=true
          }
        })
        .catch(() => {
          this.$buefy.notification.open({
              duration: 5000,
              message: 'Something went wrong, please contact the administrator.',
              type: 'is-danger',
          })
        })
      }
      else {
        this.$buefy.notification.open({
            duration: 5000,
            message: 'You need to select a villain.',
            type: 'is-danger',
        })
      }
    }
  }
}
</script>
<style>
  .grid {
    border: 2px solid #292631;
    background-color: #292631;
    border-radius: 6px;
    overflow: hidden;
    margin: auto;
    display: inline-block;
  }
  @media (min-width: 1200px){
    .grid {
      max-width: 45%;
    }
  }
  .grid-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid #3b3946;
    border-radius: 6px;
    overflow: hidden;
  }
  .grid .button {
    top: 2px;
    width: 100%;
  }
  .radio {
    border: 2px solid #3b3946;
    margin: 0 !important;
    border-radius: 6px;
    overflow: hidden;
    
  }
  .radio:hover {
    background-color: #24212c;
  }
  .check {
    display: inline-block !important;
    position: absolute !important;
    bottom: 0px;
    margin-left: calc(50% - 10px);
    margin-bottom: 5px;
  }
  .control-label {
    padding-left: 0 !important;
    text-align: center;
  }
  .radio img {
    max-height: 250px;
    margin: auto;
  }
  .radio p {
    margin-bottom: 30px;
  }
  #vote {
    display: flex;
    padding: 10px;
    width: 100%;
  }
</style>