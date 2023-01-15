<template>
    <div class="sidebar">
        <h1>Match3!</h1>
        <h2>Welcome</h2>
        <h2>{{username}}</h2>
        <div class="navItem">
            <i class="fas fa-user"/>
            <router-link to="/highscore">Profile</router-link>
        </div>
        <div class="navItem">
            <i class="fas fa-list-ol"></i>
            <router-link to="/highscore">Highscore</router-link>
        </div>
        <div class="navItem">
            <i class="fas fa-list-ol"></i>
            <router-link to="/gameboard">Game</router-link>
        </div>
        <div class="navItem">
            <i class="fas fa-list-ol"/>
            <router-link to="/" @click="logout">Logout</router-link>
        </div>
    </div>
</template>

<script>
import { getUserToken, getUsername } from '../models/data';
import { useRouter, useRoute, RouterLink } from 'vue-router'
import axios from 'axios';

let router = useRouter();

async function logout(){

  let res = await axios.post("http://localhost:9090/logout?token=" + getUserToken());

  if(res.status == 403){
    router.push({name: 'home', params: {token: this.userToken}});
  }else{
    console.log("Logout succeded")
  }
}

export default {
  setup() {
    router = useRouter();
  },
  name: 'Sidebar',
  data() {
    return {
      token: '',
      username: ''
    }
  },
  created() {
    this.token = getUserToken();
    this.username = getUsername();
  },
  methods: {
        logout
    },
}
</script>

<style scoped>
.sidebar {
  color: rgb(6, 134, 23);
  background-color: rgb(33, 34, 33);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  width: 17%;
}
.sidebar h1 {
  height: 1.0em;
  text-align: left;
}

.sidebar h2 {
  color: rgb(3, 134, 3);
}
</style>