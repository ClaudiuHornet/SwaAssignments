<template>
    <div v-for="game in games" class="gameScore">
        <h2>{{game.id}}</h2>
        <h2>{{game.user}}</h2>
        <p>Score: {{game.score}}</p>
    </div>
</template>

<script>

export default{
    name: 'gamePiece',
    props: {
        games: Array
    }
}
</script>