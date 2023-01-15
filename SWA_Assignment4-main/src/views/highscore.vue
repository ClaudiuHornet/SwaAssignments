<template>
    <Sidebar />
    <div class="highscoreContainer">
      <GamePiece :games="games"/>
    </div>
</template>

<script>
import { getUserToken, getGames } from '../models/data';
import Sidebar from '../components/sidebar.vue'
import GamePiece from '../components/boardPiece.vue';

export default {
  name: 'highscore',
  components: {
    GamePiece,
    Sidebar
  },
  data() {
    return {
      token: '',
      games: [],
    }
  },
  created() {
    this.token = getUserToken();
    this.games = getGames();
  },
  components: {
    Sidebar,
  }
}
</script>