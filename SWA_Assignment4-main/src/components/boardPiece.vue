<template>
    <div v-for="piece in pieces" class="boardPiece">
        <button @click="pick(piece)">{{piece.value}}</button>
    </div>
</template>

<script>
import { fillBoard } from '../views/gameBoard.vue';
import { move } from '../models/data.ts';

function pick(piece){
    if(piece == undefined) console.log("Failed")
    let result = move(piece);
    if(result){
        fillBoard();
    }
}

export default{
    name: 'boardPiece',
    props: {
        pieces: Array
    },
    methods: {
        pick
    }
}
</script>

<style scoped>
.boardPiece button{
    width: 150px;
}

button{
    width: 100%;
    height: 50px;
    border: 1px solid;
    border-radius: 25px;
    background: transparent;
    color: white;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    text-align: center;
}

button:hover{
    border-color: gray;
    transition: .5s;
}
</style>