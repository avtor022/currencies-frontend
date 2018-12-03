import Vue from 'vue'
import Router from 'vue-router'
import Currency from '@/components/currency'
import Admin from '@/components/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Currency
    },
    {
      path: '/admin',
      component: Admin
    }
  ]
})
