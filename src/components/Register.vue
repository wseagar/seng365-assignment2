<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row justify-content-center mt-5">
        <div class="jumbotron col-md-6 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link to="login">Already have an account?</router-link>
          </p>
          <p v-if="error">
              {{ error }}
          </p>
          <form v-on:submit.prevent="register()">
            <fieldset>
              <fieldset class="form-group">
                <input type="username" class="form-control form-control-lg" v-model="username" placeholder="Username">
                </input>
              </fieldset>
              <fieldset class="form-group">
                <input type="email" class="form-control form-control-lg" v-model="email" placeholder="Email">
                </input>
              </fieldset>
              <fieldset class="form-group">
                <input type="password" class="form-control form-control-lg" v-model="password" placeholder="Password">
                </input>
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" type="submit">Sign up</button>
            </fieldset>
          </form>
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
      username : "",
      password : "",
      email: "",
      error: null
    }
    
  },
  methods: {
    register: function() {
      api.Auth.create(this.username, this.email, this.password)
        .then((response) => {
          if (response.error) {
            this.error = response.error;
          } else {
            api.Auth.login(this.username, this.password)
              .then((response) => {
                this.$router.push({ path: 'home'});
              });
          }
        });
    }
  }
}

</script>