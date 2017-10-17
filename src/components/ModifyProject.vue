<template>
  <div class="container page">
      <div class="row justify-content-center mt-5">
        <div class="col-md-12 col-xs-12">
          <h1 class="text-center">Modify Project</h1>
          <br>
          <p v-if="error">
              {{ error }}
          </p>
          <div class="container card">
            <form v-on:submit.prevent="closeProject()">
              <div class="card-body">
                <div class="form-group row">
                  <label for="close" class="col-sm-2 col-form-label">Close Project</label>
                  <div class="col-sm-10">
                    <button class="btn btn-lg btn-primary pull-xs-right" type="submit">Close</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <br>
          <div class="container card">
            <form v-on:submit.prevent="updateImage()">
              <div class="card-body">
                <div class="form-group row">
                  <label for="image" class="col-sm-2 col-form-label">Image</label>
                  <div class="col-sm-10">
                      <input type="file" class="form-control form-control-lg" @change="onFileChange" name="file" />
                  </div>
                </div>
                <div class="from-group row">
                  <button class="btn btn-lg btn-primary pull-xs-right" type="submit">Update Image</button>
                </div>
              </div>
            </form>
          </div>
          <br>
          <div class="container card">
            <form v-on:submit.prevent="updateRewards()">
              <div class="card-body">
                <div class="form-group row">
                  <label for="target" class="col-sm-2 col-form-label">Rewards</label>
                  <div class="col-sm-10">
                    <table class="table">
                      <thead>
                        <tr>
                          <td>Description</td>
                          <td>Amount</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(row, index) in rows">
                          <td><input type="textarea" class="form-control" v-model="row.description"></td>
                          <td><input type="number" class="form-control" v-model="row.amount"></td>
                        </tr>
                      </tbody>
                    </table>
                    <button type="button" class="btn btn-primary" @click="addRow">Add row</button>
                  </div>
                </div>
                <div class="from-group row">
                  <button class="btn btn-lg btn-primary pull-xs-right" type="submit">Update Rewards</button>
                </div>
              </div>
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
      project: null,
      error: null,
      userId: null,
      image: null,
      rows: [],
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
        alert("You need to be logged in to modify a project");
        this.$router.push({ path: '/login'});
      }
      const user = JSON.parse(authed);
      this.userId = user.id;

      const owners = this.project.creators;
      let owned = false;

      for (let i = 0; i < owners.length; i++) {
        if (owners[i].id === user.id) {
          owned = true;
          break;
        }
      }

      if (!owned) {
        alert("You can't modify a project you don't own");
        this.$router.push({ path: '/home' });
      }
    },
    closeProject: function() {
      api.Project.closeProject(this.project.id)
        .then( data => this.$router.push({ path: `/project/${this.project.id}` }))
    },
    updateImage: function() {
      api.Project.putImage(this.project.id, this.image)
        .then( data => this.$router.push({ path: `/project/${this.project.id}` }));
    },
    updateRewards: function() {
      api.Project.updateRewards(this.project.id, this.rows)
        .then( data => this.$router.push({ path: `/project/${this.project.id}` }));
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      if (files[0].type !== "image/png" && files[0].type !== "image/jpeg") {
        alert("Please submit image as jpeg or png");
        e.target.value = '';
        return;
      }

      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsArrayBuffer(file);
    },
    addRow: function() {
      let elem = document.createElement('tr');
      this.rows.push({
        description: "",
        amount: 0,
      })
    },
  }
}
</script>