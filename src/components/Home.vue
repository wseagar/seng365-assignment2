<template>
  <div>
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Bring new ideas to life, anywhere.</h1>
        <p class="lead text-muted">Explore creative projects and bring bold new ideas into the world.</p>
        <p>
          <router-link to="createproject" class="btn btn-primary">Create a Project</router-link>
        </p>
      </div>
    </section>
    <ProjectList />
  </div>
</template>

<script>
import ProjectList from './ProjectList.vue';


export default {
  components: {
    ProjectList
  }
}
</script>

<style>
</style>