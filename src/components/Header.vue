<template>
  <nav class="navbar navbar-expand navbar-dark bg-primary">
    <router-link to="/home" class="navbar-brand">Crowdfunder </router-link>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <template v-if="!loggedIn">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" v-on:click="logout()">Logout </a>
          </li>
        </ul>
      </template>
    </div>
  </nav>
</template>

<script>
import api from '../services/api';

export default {
  name: 'AppHeader',
  data() {
    return {
      loggedIn : api.Auth.isAuthenticated()
    };
  },
  methods: {
    logout: function() {
      api.Auth.logout()
        .then( () => this.$router.push({ path: '#'}));
    }
  },
  watch: {
    '$route' () {
      this.loggedIn = api.Auth.isAuthenticated();
    }
  }
}

</script>

<style>

</style>