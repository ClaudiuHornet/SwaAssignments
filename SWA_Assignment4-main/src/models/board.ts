export type Generator<T>= { next:() => T } 

export type Position = {
    row: number,
    col: number
}

export type Match<T> = {
    matched: T,
    positions: Position[]
}

export type BoardEvent<T> = [];

export type BoardListener<T> = {};

export type Piece<T> = {
    value: T;
    position: Position;
}

export class Board<T> {
    height: number;
    width: number;

    constructor(generator: Generator<T>, cols: number, rows: number) {
        this.width = cols;
        this.height = rows;   
        this.initBoardConfig(generator);
      }

    pieces: Piece<T>[] = [];
    addListener(listener: BoardListener<T>) {
    }

    piece(p: Position): T | undefined {
        if (this.isPositionOutsideBoard(p))
        {
            return this.piecePosition(p).value;
        }
        return undefined;        
    }

    canMove(first: Position, second: Position): boolean {
        if (!this.isPositionOutsideBoard(first) || !this.isPositionOutsideBoard(second)) 
        {
            return false;
        }

        if (first.col == second.col || first.row == second.row) 
        {
            this.movePieces(first, second);
            let m = this.isThereMatch(first, second);
            this.movePieces(first, second);
            return m;      
        }
        return false;
      }
    
    move(first: Position, second: Position) {
        if(this.canMove(first, second)){
             this.movePieces(first, second);
        }
    }

//--------------------------------------------------------------------------------------------------
//-------------------------------------Helper functions---------------------------------------------
//--------------------------------------------------------------------------------------------------
private initBoardConfig(generator: Generator<T>){
    for(let row: number = 0; row < this.height; row++) {
        for(let col: number = 0; col < this.width; col ++) {
            this.pieces.push({
                value: generator.next(),
                position: {row, col},
            });
        }
    }
}

private movePieces(first: Position, second: Position) {
    const firstPiecePosition = this.piecePosition(first);
    const secondPiecePosition = this.piecePosition(second);

    const firstPieceIndex = this.pieces.indexOf(firstPiecePosition);
    const secondPieceIndex = this.pieces.indexOf(secondPiecePosition);

    const firstPieceValue = firstPiecePosition.value;
    const secondPieceValue = secondPiecePosition.value;

    this.pieces[firstPieceIndex].value = secondPieceValue;
    this.pieces[secondPieceIndex].value = firstPieceValue;
  }

  private isThereMatch(first: Position, second: Position)
  {
    let isFirstHorizontalMatch = this.findMatch(first.row, true);
    let isSecondHorizontalMatch = this.findMatch(second.row, true);
    let isFirstVerticalMatch = this.findMatch(first.col, false);
    let isSecondVerticalMatch = this.findMatch(second.col, false);
    let match = (isFirstHorizontalMatch || isSecondHorizontalMatch || isFirstVerticalMatch || isSecondVerticalMatch)
    return match;
  }

  private findMatch(num: number, isRow:boolean) {
    let matchFound = false;
    const piecesGroup = this.pieces.filter((element) => {
      if(isRow){
        return element.position.row == num;
      }
      else {
        return element.position.col == num;
      }
      
    });
    
    for (var j = 0; j < piecesGroup.length; j++){
      if (j == 0){
        if(piecesGroup[j].value == piecesGroup[j+1].value && piecesGroup[j].value == piecesGroup[j+2].value)
        {
          matchFound = true;
          break;
        }
      }
      else if (j > 0 && j != (piecesGroup.length - 1)){
        if(piecesGroup[j].value == piecesGroup[j+1].value && piecesGroup[j].value == piecesGroup[j-1].value)
        {
          matchFound = true;
          break;
        }
      }
    }
    return matchFound;
  }

  private piecePosition(position: Position) {
    return this.pieces.find((element) => {
      return (
        element.position.col == position.col &&
        element.position.row == position.row
      );
    });
  }

  private isPositionOutsideBoard(p: Position): boolean {
    if (p.col >= this.width || p.col < 0) {
      return false;
    }

    if (p.row >= this.height || p.row < 0) {
      return false;
    }
    return true;
  }

  public getPieces() : Piece<T>[]{
    return this.pieces;
  }
}

export class CyclicGenerator implements Generator<string> {
  private sequence: string
  private index: number

  constructor(sequence: string) {
      this.sequence = sequence
      this.index = 0
  }

  next(): string {
      const n = this.sequence.charAt(this.index)
      this.index = (this.index + 1) % this.sequence.length
      return n
  }
}

export class GeneratorFake<T> implements Generator<T> {
  private upcoming: T[]

  constructor(...upcoming: T[]) {
      this.upcoming = upcoming
  }

  prepare(...e: T[]) {
      this.upcoming.push(...e)
  }

  next(): T {
      let v = this.upcoming.shift()
      if (v === undefined) 
          throw new Error('Empty queue')
      else
          return v
  }

}
