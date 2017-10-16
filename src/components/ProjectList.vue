<template>
  <div class="container">
    <div class="row">
      <h3>Featured projects</h3>
      <a class="ml-auto">View all projects</a>
    </div>
    <div class="row">
      <div class="col-sm-4 my-2" v-for="project in projects">
        <div class="card h-100">
          <img class="card-img-top" :src="project.image" onerror="javascript:this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'">
          <div class="card-block">
            <div>
              <h4 class="card-title">{{ project.title }}</h4>
              <p class="card-text">{{ project.subtitle }}</p>
            </div>
            
          </div>
          <div class="d-flex h-100">
              <router-link :to="'/project/' + project.id" href="#" class="btn btn-primary align-self-end">View Details</router-link>
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
        this.projects.forEach( (project) => {
          project.image = api.baseURL + `/projects/${project.id}/image`;
        })
      });
  }
}
</script>

<style>


img {
  height: 20em;
}
</style>