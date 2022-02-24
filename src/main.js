import Vue from 'vue'
import App from './App.vue'
import router from './router'
import bootstrap from 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

window.axios = require('axios');

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

