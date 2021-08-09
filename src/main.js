import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import money from 'v-money'

Vue.use(money, { precision: 5 })
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
