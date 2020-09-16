<template>
    <div id="fantasy-league">
      <div v-if="fantasyLeague&&fantasyLeague!=''">
        <h1>Select 10 best villains for the Fantasy League: </h1>
        <form class="grid">
            <div class="grid-items">
                <b-checkbox v-for="opponent in fantasyLeague" v-model="vote_villains_fantasyleague"
                    name="opponents"
                    :native-value="opponent.id" :key="opponent.id">
                    <img :src="'https://api.villainwar.madao-king.xyz/'+opponent.image"/>
                    <p>{{ opponent.name }}</p>
                </b-checkbox>
            </div>
            <input v-if="this.$parent.token==null" type="button" value="You need to log in" class="button is-primary" disabled/>
            <input v-else-if="this.$parent.checkvote" type="button" value="You already voted" class="button is-primary" disabled/>
            <input v-else-if="vote_villains_fantasyleague.length!=10" type="button" value="Select 10 villains" class="button is-primary" disabled/>
        </form>
        <div v-if="vote_villains_fantasyleague.length==10&&this.$parent.token!=null&&!this.$parent.checkvote">
          <h1>Now choose your best villain:</h1>
          <form class="grid">
            <div class="grid-items">
              <b-radio v-for="best_villain in vote_villains_fantasyleague" v-model="vote_bestvillain_fantasyleague"
                name="opponents"
                :native-value="best_villain" :key="fantasyLeague[best_villain-1].id">
                <img :src="'https://api.villainwar.madao-king.xyz/'+fantasyLeague[best_villain-1].image"/>
                <p>{{ fantasyLeague[best_villain-1].name }}</p>
              </b-radio>
            </div>
            <input v-if="vote_bestvillain_fantasyleague.length!=1" type="button" value="Select a villain" class="button is-primary" disabled/>
            <input v-else-if="checkvote" type="button" value="You already voted" class="button is-primary" disabled/>
            <input v-else type="button" value="Submit your vote" class="button is-primary" @click="SubmitVote()"/>           
          </form>
        </div>
      </div>
      <h1 v-else>No match today. Come back later!</h1>
    </div>
</template>
<script>
import { FETCH_FANTASYLEAGUE_QUERY } from '../gql/fetch_fantasyleague';
import { FANTASYLEAGUE_VOTE_MUTATION } from '../gql/mutation_fantasyleague_vote';
export default {
  name: 'FantasyleaguePage',
  data() {
      return {
          vote_villains_fantasyleague: [],
          vote_bestvillain_fantasyleague: 0,
          checkvote: false
      }
  },
  apollo: {
    fantasyLeague: {
      query: FETCH_FANTASYLEAGUE_QUERY
    }
  },
  methods: {
    SubmitVote: function() {
        this.$apollo.mutate({
          // Query
          mutation: FANTASYLEAGUE_VOTE_MUTATION,
          // Parameters
          variables: {
            token: this.$parent.token,
            villains: this.vote_villains_fantasyleague.filter(val => !this.vote_bestvillain_fantasyleague.includes(val)),
            best_villain: parseInt(this.vote_bestvillain_fantasyleague)
          }
        })
        .then((reponse) => {
          this.api_response=reponse.data.submitFantasyleagueVote
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
  }
}
</script>
<style>
#fantasy-league {
    width: 100%;
}
#fantasy-league .control-label {
    margin-bottom: 35px;
}
.checkbox {
    margin: 0 !important;
    border: 1px solid #3b3946;
    overflow: hidden;
    width: 225px;
}
.checkbox:hover {
    background-color: #24212c;
}
.b-radio.radio {
    width: 225px;
}
.radio img {
    max-height: 100% !important;
     width: 100%;
}
</style>
