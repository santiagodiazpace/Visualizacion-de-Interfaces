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
            console.log("  Ficha: " + this.piecesOnBoard[i].getColor() + ", PosFila: " + this.piecesOnBoard[i].getPosX() + " en Y - PosColumna: " + this.piecesOnBoard[i].getPosY() + " en X");
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
                    posInRow = 188;  // Fila 1
                    break;
                case 2:
                    posInRow = 273;  // Fila 2
                     break;
                case 3:
                    posInRow = 359;  // Fila 3
                    break;
                case 4:
                    posInRow = 443;  // Fila 4
                    break;
                case 5:
                    posInRow = 528;  // Fila 5
                    break;
                case 6:
                    posInRow = 613;  // Fila 6
                    break;
                default:
                    posInRow = null; 
                    break;
              }
        }
        return posInRow;
    }

    findColumn(x, y) {
        let column = null;
        if ((y >= 30) && (y < 120)) {
            if ((x >= 187) && (x < 276)) {  // Columna 1
                column = 239;
            }
            if ((x >= 276) && (x < 365)) {  // Columna 2
                column = 326;
            }
            if ((x >= 365) && (x < 454)) {  // Columna 3
                column = 413;
            }
            if ((x >= 454) && (x < 543)) {  // Columna 4
                column = 500;
            }
            if ((x >= 543) && (x < 632)) {  // Columna 5
                column = 587;
            }
            if ((x >= 632) && (x < 721)) {  // Columna 6
                column = 674;
            }
            if ((x >= 721) && (x <810)) {  // Columna 7
                column = 761;
            }
        }
        //console.log("Columna: " + column);
        return column;
    }

    
    checkGame() {
        return false;
    }
}