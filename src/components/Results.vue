<template>
  <iframe src="https://challonge.com/fr/kitsu_villainwar/module" width="100%" height="500" frameborder="0" scrolling="auto" allowtransparency="true"></iframe>
</template>
<script>
// import Bracket from '../components/Bracket.vue'

export default {  
  name: 'ResultsPage',
  props: ['checkvote','data','token'],
}
</script>
<style>
#results {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  cursor: col-resize;
  height: 250px;
}
</style>