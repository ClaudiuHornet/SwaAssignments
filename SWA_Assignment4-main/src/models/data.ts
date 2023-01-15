import axios from 'axios';
import { Board, CyclicGenerator, GeneratorFake } from '../models/board'
let userToken = ''
let username = ''
let Game = {
    id: '',
    user: '',
    score: '',
    completed: false
}

let row1: Piece<String>[] = []
let row2: Piece<String>[] = []
let row3: Piece<String>[] = []
let row4: Piece<String>[] = []
let row5: Piece<String>[] = []
let board: Board<String>;
let piece1;
let piece2;

export function setUsername(name: string){
    username = name;
}

export function getUsername(){
    return username;
}

export function setUserToken(token: string){
    userToken = token;
}

export function getUserToken() : string{
    return userToken;
}

export async function getGames() {
    const res = await axios.post('http://localhost:9090/games?token=' + userToken);

    if(res.status != 403){
        return res.data;
    }else{
        return undefined;
    }
}

export type Piece<T> = {
    value: T;
    position: Position;
}

export type Position = {
    row: number,
    col: number
}

export function generateBoard(){
    const generator = new GeneratorFake<String>(
        'A', 'B', 'A', 'C', 'F', 
        'D', 'B', 'C', 'C', 'A',
        'D', 'A', 'C', 'B', 'F',
        'C', 'D', 'D', 'C', 'D',
        'A', 'B', 'A', 'C', 'F'
    )
    board = new Board(generator,5,5);

    let pieces = board.getPieces();
    for (let index = 0; index < pieces.length; index++) {
        if(0 == pieces[index].position.col){
            row1.push(pieces[index]);
        }else if(1 == pieces[index].position.col){
            row2.push(pieces[index]);
        }else if(2 == pieces[index].position.col){
            row3.push(pieces[index]);
        }else if(3 == pieces[index].position.col){
            row4.push(pieces[index]);
        }else if(4 == pieces[index].position.col){
            row5.push(pieces[index]);
        }
    }
}

export function generatePieces(n: number){
    if(0 == n){
        console.log(row1)
        return row1;
    }else if(1 == n){
        return row2;
    }else if(2 == n){
        return row3;
    }else if(3 == n){
        return row4;
    }else if(4 == n){
        return row5;
    }
}

export function move(p: Piece<String>){
    if(piece1 == undefined){
        piece1 = p;
    }else {
        piece2 = p; 

        let canMove = board.canMove(piece1.position, piece2.position);

        if(canMove){
            board.move(piece1, piece2);
        }

        piece1 == undefined;
        piece2 == undefined;
        return canMove;
    }
}