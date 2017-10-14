<template>
  <div id="app">
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import api from './services/api';

export default {
  name: 'app',
  mounted: function() {
    api.Auth.init();
  },
  components: {
    AppHeader
  }
};

</script>

<style>
</style>
