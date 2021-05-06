import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import axios from 'axios'
//import VueAxios from 'vue-axios'
import './assets/css/bootstrap.css'


if (localStorage.getItem("logged") === null) {
    window.localStorage.setItem('logged',false);
  }

createApp(App).use(router).mount('#app');

