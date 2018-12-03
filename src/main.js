import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ApiSettings from '@/settings/api.js'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App),
  settings: {
    api: new ApiSettings()
  }
}).$mount('#app')
