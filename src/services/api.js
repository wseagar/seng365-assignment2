import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4941/api/v2";


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
    logout: () =>
      axios.post('/users/logout')
        .then( (res) => {
          localStorage.removeItem('user');
          return res.data
        })
        .catch( (err) => err.response )
};

const Project = {
  getProjects: (startIndex, count) =>
    axios.get('/projects', {
      params: {
        startIndex: startIndex,
        count: count,
        open: true,
      }
    }).then( (res) => res.data)
      .catch( (err) => err.response)
}

export default {
  Auth,
  Project
};