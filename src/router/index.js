import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import CreateProject from '../components/CreateProject.vue'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/home', name: 'home', component: Home},
    { path: '/login', name: 'login', component: Login},
    { path: '/register', name: 'register', component: Register},
    { path: '/createproject', name: 'createproject', component: CreateProject},
    { path: '*', redirect: { name: 'home' } }
  ]
})