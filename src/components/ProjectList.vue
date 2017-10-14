<template>
  <div class="container">
    <h3>Featured projects</h3>
    <div class="d-flex flex-row flex-wrap">
      <div class="mx-auto" v-for="project in projects">
        <div class="card" style="width: 20rem;">
        <img class="card-img-top" src="../assets/logo.png" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title">{{ project.title }}</h4>
            <p class="card-text">{{ project.subtitle }}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      projects: null
    }
  },
  mounted: function() {
    api.Project.getProjects(0, 6)
      .then( (response) => {
        this.projects = response;
      })
  }
}
</script>