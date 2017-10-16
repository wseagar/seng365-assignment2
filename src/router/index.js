import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import CreateProject from '../components/CreateProject.vue';
import ProjectDetails from '../components/ProjectDetails.vue';
import ProjectPledge from '../components/ProjectPledge.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/home', name: 'home', component: Home},
    { path: '/login', name: 'login', component: Login},
    { path: '/register', name: 'register', component: Register},
    { path: '/project/new', name: 'createproject', component: CreateProject},
    { path: '/project/:id', name: 'viewproject', component: ProjectDetails},
    { path: '/project/:id/pledge', name: 'pledgeproject', component: ProjectPledge},
    { path: '*', redirect: { name: 'home' } }
  ]
})