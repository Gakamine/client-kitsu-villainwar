<template>
    <div>
        <ul v-for="round in calculatedRound" :key="round.id" v-bind:class="{ current: round.roundNumber == currentround}" class="round">
            <li :class="'opp_'+round.opp1Id.id"><span class="opp_results">{{ round.resultsOpp1 }}</span>{{ round.opp1Id.name }}</li>
            <li :class="'opp_'+round.opp2Id.id"><span class="opp_results">{{ round.resultsOpp2 }}</span>{{ round.opp2Id.name }}</li>
        </ul>
        <ul v-if="iteration%2==0" class="spacer"></ul>
    </div>
</template>
<script>
export default {
  name: 'BracketItem',
  props: ['iteration','results','participants','currentround'],
  computed: {
    calculatedRound: function() {
        return this.results.filter(this.calculateMinMax)
    }
  },
  methods: {
      calculateMinMax: function(data) {
        this.mem=1;
        for(var i=1;i<this.iteration;i++) {
            this.mem=this.mem*2
        }
        this.max=this.participants-this.mem
        this.min=this.participants-(this.mem*2)+1
        return data.roundNumber >= this.min && data.roundNumber <= this.max
      }
  }
}
</script>
<style>
.round {
    border: 1px solid black;
}
li {
    background-color: #292631;
}
li:nth-child(1) {
    border-bottom: 1px solid black;
}
.opp_results {
    background-color: #18161d;
    min-width: 30px;
    height: 24px;
    float: left;
}
.opp_1:hover ~ .opp_1 {
    background-color: #dd452a !important;
}
.current {
    border-color: #dd452a;
}
.spacer {
    height: 25.15px;
}
</style>