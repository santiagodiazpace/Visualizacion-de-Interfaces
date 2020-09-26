class Tablero {

    constructor() {
        this.piecesOnBoard = [];  // Fichas colocadas en tablero amarillo
    }

    clear() {
        this.piecesOnBoard = [];
    }

    printArray() {
        console.log("Arreglo:");
        for (let i=0; i<this.piecesOnBoard.length; i++) {
            console.log("  Ficha: " + this.piecesOnBoard[i].getPiece() + " PosX: " + this.piecesOnBoard[i].getPosX() + " PosY: " + this.piecesOnBoard[i].getPosY());
        }
        console.log("Tamaño: " + this.piecesOnBoard.length);
    }

    findPiece(p) {
        let resultado = false;
        for (let i=0; i < this.piecesOnBoard.length; i++) {
            if (this.piecesOnBoard[i].getPiece() === p) {
                resultado = true;
            }
        }
        //console.log(resultado);
        return resultado;
    }

    addPiece(p, x, y) {
        let newPiece = new Celda(p, x, y);
        this.piecesOnBoard.push(newPiece);
    }

    locatePiece(column) {
        let rowPos = null;
        let row = 6;
        while ((row >= 1) && (rowPos === null)) {
            let pos = this.getFreeRow(row);
            if (this.isFreePosition(pos, column)) {
                rowPos = pos;
            }
            row--;
        }
        //console.log("Posicion libre -> " + rowPos);
        return rowPos;
    }
    
    isFreePosition(x, y) {
        let resultado = true;
        let i= 0;
        while (i < this.piecesOnBoard.length) {
            if ((this.piecesOnBoard[i].getPosX() === x) && (this.piecesOnBoard[i].getPosY() === y)) {
                resultado = false;
            }
            i++;
        }
        //console.log(resultado);
        return resultado;
    }

    getFreeRow(row) {
        let posInRow;
        if (row != null) {
            switch (row) {
                case 1:
                    posInRow = 186;  // Fila 1
                    break;
                case 2:
                    posInRow = 271;  // Fila 2
                     break;
                case 3:
                    posInRow = 357;  // Fila 3
                    break;
                case 4:
                    posInRow = 444;  // Fila 4
                    break;
                case 5:
                    posInRow = 528;  // Fila 5
                    break;
                case 6:
                    posInRow = 615;  // Fila 6
                    break;
                default:
                    posInRow = null; 
                    break;
              }
        }
        return posInRow;
    }


    checkGame() {
        return false;
    }
}