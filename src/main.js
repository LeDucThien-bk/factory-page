import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import vuetify from './plugins/vuetify';

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import routes from "./config/routes";


Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  routes, // short for routes: routes
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
