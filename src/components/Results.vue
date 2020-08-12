<template>
    <div v-if="results" id="results">
      <div class="column" v-for="i in power" :key="i">
        <Bracket :currentround="data.roundNumber" :results="results" :iteration="i" :participants="participants"/>
      </div>
    </div>
</template>
<script>
import Bracket from '../components/Bracket.vue'
export default {
  name: 'ResultsPage',
  props: ['results','data','token'],
  components: {
    Bracket
  },
  data() {
    return {
      participants: this.results.length+1,
      power: 0
    }
  },
  mounted() {
    do {
      this.power += 1;
    } while (Math.pow(2,this.power)!=this.participants&&this.participants>this.power);
  }
}
</script>
<style>
#results {
  display: flex;
  flex-direction: row-reverse;
  min-width: max-content;
  cursor: col-resize;
  padding: 15px;
  height: 100%;
}
.column {
  display: inline-block;
  min-width: 300px;
}
#router-view {
  overflow: auto;
}
</style>