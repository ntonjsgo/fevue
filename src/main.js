import Vue from 'vue'
import App from './App.vue'
import NavBar from './components/Navbar.vue';
import router from './router'
import bootstrap from 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

window.axios = require('axios');

Vue.config.productionTip = false

Vue.component('app-navbar', NavBar);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

