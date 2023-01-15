<template>
  <Sidebar />
</template>

<script>
import { getUserToken } from '../models/data';
import Sidebar from '../components/sidebar.vue'

export default {
  data() {
    return {
      token: '',
    }
  },
  created() {
    this.token = getUserToken();
  },  
  components: {
    Sidebar,
  }
}
</script>
