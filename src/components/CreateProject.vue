<template>
  <div class="project-page">
    <div class="container page">
      <div class="row justify-content-center mt-5">
        <div class="col-md-12 col-xs-12">
          <h1 class="text-center">New Project</h1>
          <br>
          <p v-if="error">
              {{ error }}
          </p>
          <div class="container">
            <form v-on:submit.prevent="login()">
              <div class="form-group row">
                <label for="title" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-lg" v-model="Title" placeholder="Title">
                </div>
              </div>
              <div class="form-group row">
                <label for="subtitle" class="col-sm-2 col-form-label">Subtitle</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-lg" v-model="Subtitle" placeholder="Subtitle">
                  </input>
                </div>
              </div>
              <div class="form-group row">
                <label for="description" class="col-sm-2 col-form-label">Description</label>
                <div class="col-sm-10">
                  <textarea type="text" class="form-control form-control-lg" v-model="Description" placeholder="Description">
                  </textarea>
                </div>
              </div>
              <div class="form-group row">
                <label for="target" class="col-sm-2 col-form-label">Target</label>
                <div class="col-sm-10">
                  <input type="number" class="form-control form-control-lg" v-model="Target" placeholder="Target">
                  </input>
                </div>
              </div>
              <button class="btn btn-lg btn-primary pull-xs-right" type="submit">Create</button>
            </form>
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
      title: null,
      subtitle: null,
      description: null,
      target: null
    };
  },
  mounted: function() {
    if (!api.Auth.isAuthenticated()){
      this.$router.push({ path: 'login'});
    }
  },
}

</script>