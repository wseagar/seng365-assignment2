<template>
  <div class="project-page">
    <div class="container page">
      <div class="row justify-content-center mt-5">
        <div class="col-md-12 col-xs-12">
          <h1 class="text-center">Pledge to {{ project.title }}</h1>
          <br>
          <p v-if="error">
              {{ error }}
          </p>
          <div class="container">
            <form v-on:submit="create">
              <div class="form-group row">
                <label for="amount" class="col-sm-2 col-form-label">Amount</label>
                <div class="col-sm-10">
                  <input type="number" class="form-control form-control-warning" v-model="amount" placeholder="Amount">
                  <div class="form-control-feedback" v-if="attemptSubmit && wrongNumber">This field is required.</div>
                </div>
              </div>
              <div class="form-group row">
                <label for="anonymous" class="col-sm-2 col-form-label">Anonymous</label>
                <div class="col-sm-10">
                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="checkbox" class="form-check-input" v-model="anonymous">Tick this to pledge anonymously
                    </label>
                  </div>
                </div>
              </div>
              <button class="btn btn-lg btn-primary pull-xs-right" type="submit">Pledge</button>
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
      project: null,
      amount: null,
      anonymous: false,
      userId: null,
      token: null,
      error: null,
    }
  },
  mounted: function() {
    let id = this.$route.params.id;
    api.Project.getProjectById(id)
      .then((res) => {
        res.image = api.baseURL + res.imageUri;
        this.project = res;
        if (this.project.open === false) { 
          alert("This project is closed sorry!");
          this.$router.push({ path: `/projects/${id}` });
        }
        this.checkOwner();
      })
      .catch((err) => {

        this.error = "Not Found";
      })
  },
  methods: {
    checkOwner: function() {
      const authed = api.Auth.isAuthenticated();
      if (!authed) {
        alert("You need to be logged in to pledge");
        this.$router.push({ path: '/login'});
      }
      const user = JSON.parse(authed);
      this.userId = user.id;
      this.token = user.token;

      const owners = this.project.creators;

      for (let i = 0; i < owners.length; i++) {
        if (owners[i].id === user.id) {
          alert("You can't pledge to your own project");
          this.$router.push({ path: '/home' });
        }
      }
    },
    create: function(e) {
      if (this.amount === undefined || this.amount === null) {
        this.error = "Please enter a valid amount";
        return;
      }

      let pledge = {
        id: this.userId,
        amount: parseInt(this.amount),
        anonymous: this.anonymous,
        card: {
          authToken: this.token
        }
      }

      api.Project.createPledge(this.project.id, pledge)
        .then(data => {
          this.$router.push({ path: '/project/' + this.project.id} )
        })
    }
  }
}
</script>