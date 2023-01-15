<template>
    <Sidebar />
    <div class="grid-container">
        <div class="grid-item"><h2>Game-Board</h2></div>
        <div class="grid-item"><h2><br/>Timer: {{}}</h2></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item">
            <BoardPieces :pieces="row1"/>
        </div>
        <div class="grid-item">
            <BoardPieces :pieces="row2"/>
        </div>
        <div class="grid-item">
            <BoardPieces :pieces="row3"/>
        </div>
        <div class="grid-item">
            <BoardPieces :pieces="row4"/>
        </div>
        <div class="grid-item">
            <BoardPieces :pieces="row5"/>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/sidebar.vue'
import BoardPieces from '../components/boardPiece.vue';
import { generatePieces, generateBoard } from '../models/data';

export function fillBoard(){
    this.row1 = generatePieces(0)
    this.row2 = generatePieces(1)
    this.row3 = generatePieces(2)
    this.row4 = generatePieces(3)
    this.row5 = generatePieces(4)
}

export default{
    name: 'gameBoard',
    data() {
        return {
            row1: [],
            row2: [],
            row3: [],
            row4: [],
            row5: [],
            timer: ''
        }
    },
    created() {
        generateBoard();
        this.row1 = generatePieces(0)
        this.row2 = generatePieces(1)
        this.row3 = generatePieces(2)
        this.row4 = generatePieces(3)
        this.row5 = generatePieces(4)
    },
    methods: {
        fillBoard,
    },
    components: {
        Sidebar,
        BoardPieces
    },
}

</script>

<style scoped>
.grid-container {
    align-items: center;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
}
</style>