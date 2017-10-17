<template>
  <div class="container">
    <div class="row justify-content-center my-4">
      <h1>Projects</h1>
    </div>
    <div class="btn-toolbar mb-3" role="toolbar">
      <div class="btn-group" role="group" v-if="userId != null">
        <button v-on:click="allOnClick()" type="button" class="btn btn-secondary">All</button>
        <button type="button" class="btn btn-secondary" v-on:click="creatorOnClick()">Created</button>
        <button type="button" class="btn btn-secondary" v-on:click="backerOnClick()">Backing</button>
        
      </div>
      <div class="input-group ml-auto">
        <input type="text" class="form-control" v-model="search" v-on:keyup="onKeyPress" placeholder="Search">
        
      </div>
    </div>
    <div class="row justify-contend-end">
      <router-link to="project/new" class="ml-auto mr-3">Create a Project</router-link>
    </div>
    <div class="row">
      <div class="col-sm-4 my-2" v-for="project in displayedProjects">
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
      projects: null,
      displayedProjects: null,
      creatorProjects: null,
      backerProjects: null,
      allProjects: null,
      userId: null,
      search: "",
    }
  },
  mounted: function () {
    this.setUserId();
    this.setProjects();
    this.setBackerProjects();
    this.setCreatorProjects();
  },
  methods: {
    setUserId: function() {
      const authed = api.Auth.isAuthenticated();
      if (!authed) {
        return;
      }
      const user = JSON.parse(authed);
      this.userId = user.id;
    },
    setProjects: function() {
      const params = {
        open: true,
      }
      api.Project.getProjects(params)
        .then( (response) => {
          this.allProjects = response;
          this.allProjects.forEach( (project) => {
            project.image = api.baseURL + `/projects/${project.id}/image`;
          })
          this.projects = this.allProjects;
          this.displayedProjects = this.projects;
        });
    },
    setBackerProjects: function() {
      const params = {
        backer: this.userId,
        open: true,
      }

      api.Project.getProjects(params)
        .then( (response) => {
          let uniq = new Set(response.map(e => JSON.stringify(e)));
          let filtered = Array.from(uniq).map(e => JSON.parse(e));
          this.backerProjects = filtered;
          this.backerProjects.forEach( (project) => {
            project.image = api.baseURL + `/projects/${project.id}/image`;
          })
        });
    },
    setCreatorProjects: function() {
      const params = {
        creator: this.userId,
        open: true,
      }
      api.Project.getProjects(params)
        .then( (response) => {
          this.creatorProjects = response;
          this.creatorProjects.forEach( (project) => {
            project.image = api.baseURL + `/projects/${project.id}/image`;
          })
        });
    },

    allOnClick: function() {
      this.projects = this.allProjects;
      this.search = "";
      this.displayedProjects = this.projects;
    },
    backerOnClick: function () {
      this.projects = this.backerProjects;
      this.search = "";
      this.displayedProjects = this.projects;
    },
    creatorOnClick: function () {
      this.projects = this.creatorProjects;
      this.search = "";
      this.displayedProjects = this.projects;
    },
    onKeyPress: function() {
      this.displayedProjects = [];

      for (let project of this.projects) {
        if (project.title.search(this.search) != -1 
         || project.subtitle.search(this.search) != -1) {
           this.displayedProjects.push(project);
          }
      }
    }

  }
}

</script>

<style>


img {
  height: 20em;
}
</style>