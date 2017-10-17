import axios from 'axios';

const baseURL = "http://localhost:4941/api/v2"

axios.defaults.baseURL = baseURL;


const Auth = {
  //Authentication status
  isAuthenticated: () => localStorage.getItem('user'),
  init: function() {
    if (this.isAuthenticated()){
      let user = JSON.parse(localStorage.getItem('user'));
      axios.defaults.headers.common['X-Authorization'] = user.token;
    }
  },
  //Create new user
  create: (user, email, pass) =>
    axios.post('/users', {
      username: user,
      email: email,
      password: pass,
      location: "New Zealand"
    }).then((response) => response.data
     ).catch(function (err) {
      let errorMsg; 
      switch (err.response.status) {
        case 400:
          errorMsg = "Username/Email already exists";
          break;
        default:
          errorMsg = "Server error";
      }
      return {
        error: errorMsg
      };
    }),
  login: (user, pass) => 
    axios.post('/users/login' , { }, {
      params : {
        username: user,
        password: pass
      }
    }).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      axios.defaults.headers.common['X-Authorization'] = response.data.token;
      
      return response.data;
    }).catch(function (err) {
      let errorMsg; 
      switch (err.response.status) {
        case 400:
          errorMsg = "Invalid username/password supplied";
          break;
        default:
          errorMsg = "Server error";
      }
      return {
        error: errorMsg
      };
    }),
    logout: () => {
      localStorage.removeItem('user');
      return axios.post('/users/logout')
        .then( (res) => {
          return res.data
        })
        .catch( (err) => err.response )
    }
      
};

const Project = {
  getProjects: (params) =>
    axios.get('/projects', {
      params
    }).then( (res) => res.data)
      .catch( (err) => err.response)
      ,
  create: (projectData) => {
    let user = JSON.parse(localStorage.getItem('user'));

    projectData.rewards.forEach(function (reward) {
      reward.amount = parseInt(reward.amount);
    });

    return axios.post('/projects', {
      title: projectData.title,
      subtitle: projectData.subtitle,
      description: projectData.description,
      target: parseInt(projectData.target),
      creators: [ {id: user.id}],
      rewards: projectData.rewards
    }).then((res) => res.data)
      .catch((err) => {
        let errorMsg; 
        switch (err.response.status) {
          case 400:
            errorMsg = "Malformed project data";
            break;
          case 401:
            errorMsg = "Unauthorized - create account to create project";
            break;
          default:
            errorMsg = "Server error";
        }
        return { error: errorMsg }
      })
  },
  putImage: (projectId, image) => {
    return axios.put(`/projects/${projectId}/image`, 
      image,
      {
        headers: {
          'Content-Type': 'image/png'
        }
      })
      .then (res => console.log(res))
      .catch (err => console.log(err))
  },
  getProjectById: (projectId) => {
    return axios.get(`/projects/${projectId}`)
      .then((res) => res.data)
  },
  createPledge: (projectId, pledge) => {
    return axios.post(`/projects/${projectId}/pledge`, pledge)
      .then( res => res.data)
  },
  closeProject: (projectId) => {
    return axios.put(`/projects/${projectId}`, 
      {
        open: false
      }).then( res => res.data)
  },
  updateRewards: (projectId, rewards) => {
    rewards.forEach(function (reward) {
      reward.amount = parseInt(reward.amount);
    });

    return axios.put(`/projects/${projectId}/rewards`, rewards)
      .then( res => res.data);
  }
}

export default {
  Auth,
  Project,
  baseURL
};