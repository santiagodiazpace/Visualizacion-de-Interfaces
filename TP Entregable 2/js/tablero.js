class Tablero {

    constructor() {
        this.piecesOnBoard = [];  // Fichas ya colocadas en tablero amarillo
    }

    printArray() {
        for (let i=0; i<this.piecesOnBoard.length; i++) {
            console.log(this.piecesOnBoard[i].getPiece());
            console.log(this.piecesOnBoard[i].getPosX());
            console.log(this.piecesOnBoard[i].getPosY());
        }
    }

    findPiece(p) {
        let resultado = false;
        for (let i=0; i < this.piecesOnBoard.length; i++) {
            if (this.piecesOnBoard[i].getPiece() === p) {
                resultado = true;
            }
        }
        console.log(resultado);
        return resultado;
    }

    addPiece(p, x, y) {
        let newPiece = new Celda(p, x, y);
        this.piecesOnBoard.push(newPiece);
    }

    isFreePosition(x, y) {   // ver ????
        let resultado = true;
        for (let i=0; i < this.piecesOnBoard.length; i++) {
            if ((this.piecesOnBoard[i].getPosX() === x) && (this.piecesOnBoard[i].getPosY() === y)) {
                resultado = false;
            }
        }
        console.log(resultado);
        return resultado;
    }
    
}