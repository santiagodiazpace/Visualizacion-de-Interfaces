class Tablero {

    constructor() {
        this.piecesOnBoard = [];  // Fichas colocadas en tablero amarillo
    }

    printArray() {
        console.log("Arreglo:");
        for (let i=0; i<this.piecesOnBoard.length; i++) {
            console.log(this.piecesOnBoard[i].getPiece());
            console.log(this.piecesOnBoard[i].getPosX());
            console.log(this.piecesOnBoard[i].getPosY());
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
        console.log(resultado);
        return resultado;
    }

    addPiece(p, x, y) {
        let newPiece = new Celda(p, x, y);
        this.piecesOnBoard.push(newPiece);
    }


    existPlaceInColumn(y) {   
        let resultado = true;
        let i = 0;
        while (i < this.piecesOnBoard.length) {
            if (this.piecesOnBoard[i].getPosY() === y) {
                resultado = false;
            }
            i++;
        }
        console.log(resultado);
        return resultado;
    }

    isFreePosition(x, y) {
        let resultado = true;
        let i = 0;
        while (i < this.piecesOnBoard.length) {
            if ((this.piecesOnBoard[i].getPosY() === x) && (this.piecesOnBoard[i].getPosY() === y)) {
                resultado = false;
            }
            i++;
        }
        console.log(resultado);
        return resultado;
    }
    
    locatePiece(column) {
        let rowPos = null;
        let row = 6;
        while (row >= 1) {
            if (this.isFreePosition(row, column)) {
                rowPos = row;
            }
            row--;
        }
        rowPos = this.getFreeRow(row);
        console.log("Posicion libre -> " + rowPos);
        return rowPos;
    }

    getFreeRow(row) {
        if (row != null) {
            return 615;
        }
    }

}