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
            <form v-on:submit.prevent="create()">
              <div class="form-group row">
                <label for="title" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-lg" v-model="title" placeholder="Title">
                </div>
              </div>
              <div class="form-group row">
                <label for="subtitle" class="col-sm-2 col-form-label">Subtitle</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control form-control-lg" v-model="subtitle" placeholder="Subtitle">
                  </input>
                </div>
              </div>
              <div class="form-group row">
                <label for="description" class="col-sm-2 col-form-label">Description</label>
                <div class="col-sm-10">
                  <textarea type="text" class="form-control form-control-lg" v-model="description" placeholder="Description">
                  </textarea>
                </div>
              </div>
              <div class="form-group row">
                <label for="target" class="col-sm-2 col-form-label">Target</label>
                <div class="col-sm-10">
                  <input type="number" class="form-control form-control-lg" v-model="target" placeholder="Target">
                  </input>
                </div>
              </div>
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
              <div class="form-group row">
                <label for="image" class="col-sm-2 col-form-label">Image</label>
                <div class="col-sm-10">
                    <input type="file" class="form-control form-control-lg" @change="onFileChange" name="file" />
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
      target: null,
      image: null,
      error: null,
      rows: [],
      rewardId: 0,
    };
  },
  mounted: function() {
    if (!api.Auth.isAuthenticated()){
      this.$router.push({ path: '/login'});
    }
  },
  methods: {
    addRow: function() {
      let elem = document.createElement('tr');
      this.rows.push({
        description: "",
        amount: 0,
      })
    },
    onFileChange(e) {
      debugger;
      var files = e.target.files || e.dataTransfer.files;
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
    create: function() {
      let projectData = {
        title: this.title,
        subtitle: this.subtitle,
        description: this.description,
        target: this.target,
        rewards: this.rows,
      }

      api.Project.create(projectData)
        .then((response) =>{
          if (response.error) {
            this.error = response.error;
          } else {
            api.Project.putImage(response.id, this.image)
              .then( (res) => this.$router.push({ path: '/project' + response.id} ));
          }
        });
    }
  }
}

</script>