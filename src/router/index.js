import Vue from 'vue'
import Router from 'vue-router'
import Vote from '@/components/Vote'
import Results from '@/components/Results'
import Error404 from '@/components/Error404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Vote
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    },
    {
      path: '/*',
      name: 'Eror404',
      component: Error404    
    }
  ]
})
