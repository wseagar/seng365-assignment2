<template>
  <div class="container">
    <div class="row">
        <div class="jumbotron w-100" style="padding-bottom: 2rem">
          <h1>{{ this.project.title }}</h1>
          <h4 class="text-muted">{{ this.project.subtitle }}</h4>
          <div class="progress mt-4" style="background-color: rgba(0, 0, 0, 0.15)">
            <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :aria-valuenow="project.progress.currentPledged" aria-valuemin="0" :aria-valuemax="project.target">{{ progressPercent }}</div>
          </div>
          <div class="row mt-3">
            <div class="col-md-4">
              <p>
                ${{ this.project.progress.currentPledged }} 
                pledged of ${{ this.project.target}} goal
              </p>
            </div>
            <div class="col-md-4">
              <p>
                {{ this.project.progress.numberOfBackers }} backers
              </p>
            </div>
            <div class="col-md-4">
              <p>
                Project {{ project.open ? 'Open' : 'Closed' }}
              </p>
            </div>
          </div>
        </div>
        
    </div> 
    
    <div class="row">
      <div class="col-md-4">
        <img class="img-fluid" :src="project.image" onerror="javascript:this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'">
        <div class="card my-2">
          <div class="card-body" >
            <h4 class="card-title">Created By</h4>
            <p class="card-text" v-for="(item, index) in project.creators">{{ item.username }}</p>
            <p v-if="owner">
              <router-link :to="`/project/${project.id}/modify`" class="card-link">Modify your project</router-link>
            </p>
          </div>
        </div>
        <div class="card my-2">
          <div class="card-body" >
            <h4 class="card-title">Latest Backers</h4>
            <div class="row ml-0" v-for="(item, index) in backers">
              <p class="card-text">{{ item.username }}</p>
              <p class="card-text ml-auto mr-3">${{ item.amount }}</p>
            </div>
            {{ backers ? "" : "No backers yet!"}}
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card my-2">
          <div class="card-body">
            <h4 class="card-title"> Description </h4>
            <p class="card-text">
              {{ project.description }}
              {{ recentBackers }}
            </p>
          </div>
        </div>
        <div class="card my-2" v-for="(item, index) in project.rewards">
          <div class="card-body" >
            <h4 class="card-title">Reward {{ index + 1 }}</h4>
            <h6 class="card-subtitle mb-2 text-muted">${{ item.amount }}</h6>
            <p class="card-text">{{ item.description }}</p>
            <router-link :to="`/project/${project.id}/pledge`" class="card-link">Get this reward now!</router-link>
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
      project : null,
      backers: null,
      error : null,
      user : null,
      owner: null
    }    
  },
  mounted: function() {
    let id = this.$route.params.id;

    const authed = api.Auth.isAuthenticated();
    if (authed) {
      this.user = JSON.parse(authed);
    }

    api.Project.getProjectById(id)
      .then((res) => {
        res.image = api.baseURL + res.imageUri;
        this.project = res;
        this.setBackers();
        this.isOwner();
      })
      .catch((err) => this.error = "Not Found")
  },
  methods: {
    setBackers: function() {
      const recent = [];
      const backers = this.project.backers;
      
      let anonAmount = 0;

      for (let i = 0; i < backers.length && i < 5; i++){
        let backer = backers[i];

        if (backer.username === "anonymous") {
          anonAmount += backer.amount;
        } else {
          recent.push(backer);
        }
      }

      if (anonAmount) {
        const anon = {
          id : 0,
          username : "anonymous",
          amount: anonAmount
        }  
        recent.push(anon);
      }
      
      this.backers = recent;
    },
    isOwner: function() {
      const creators = this.project.creators;

      for (let i = 0; i < creators.length; i++) {
        if (creators[i].id === this.user.id) {
          this.owner = true;
          return;
        }
      }

      this.owner = false;
      return;
    }
  },
  computed: {
    progressPercent: function() {
      let percent = (this.project.progress.currentPledged / this.project.target) * 100;
      percent = Math.round(percent);
      return percent.toString() + "%";
    }
  }

}

</script>