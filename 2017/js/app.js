import '../styles/mobile.scss';
import * as example from './example.js';
import Vue from 'vue';
import VueRouter from 'vue-router';

// Import the pages
import home from './home';
import about from './about';

// enable the Vue devtools stuff
Vue.config.devtools = true;

// enable Vue Router
Vue.use(VueRouter);

// Set up the routes for Vue-router
const routes = [
  {path: '/about', component: about},
  {path: '/', component: home},
];

// Make the router and supply it with the routes
const router = new VueRouter({
  routes,
});
example.sayHello();

// Create a Vue instance, supply it with our router, and make it do it's magic on the #content element
const app = new Vue({
  router,
}).$mount('#content');
