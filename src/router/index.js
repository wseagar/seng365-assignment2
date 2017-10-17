import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Projects from '../components/Projects.vue';
import CreateProject from '../components/CreateProject.vue';
import ProjectDetails from '../components/ProjectDetails.vue';
import ProjectPledge from '../components/ProjectPledge.vue';
import ModifyProject from '../components/ModifyProject.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/home', name: 'home', component: Home},
    { path: '/login', name: 'login', component: Login},
    { path: '/register', name: 'register', component: Register},
    { path: '/project', name:'projects', component: Projects },
    { path: '/project/new', name: 'createproject', component: CreateProject},
    { path: '/project/:id', name: 'viewproject', component: ProjectDetails},
    { path: '/project/:id/pledge', name: 'pledgeproject', component: ProjectPledge},
    { path: '/project/:id/modify', name: 'modifyproject', component: ModifyProject},

    { path: '*', redirect: { name: 'home' } }
  ]
})