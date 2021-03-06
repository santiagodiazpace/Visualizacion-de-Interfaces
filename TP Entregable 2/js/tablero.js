class Tablero {

    constructor() {
        this.piecesOnBoard = [];  // Fichas colocadas en tablero amarillo, arreglo de Celda.
    }

//#region - Utilities

    clear() {
        this.piecesOnBoard = [];
    }

    printArray() {
/*         console.log("----> Arreglo:");
        for (let i=0; i<this.piecesOnBoard.length; i++) {
            console.log("  Ficha: " + this.piecesOnBoard[i].getColor() + ", posRow: " + this.piecesOnBoard[i].getPosRow() + " en Y - PosColumm: " + this.piecesOnBoard[i].getPosColumn() + " en X");
        }
        console.log(" Tamaño: " + this.piecesOnBoard.length); */
    }

    findCell(r, c, color) {
        let resultado = false;
        for (let i=0; i < this.piecesOnBoard.length; i++) {
            if ((this.piecesOnBoard[i].getPosRow() === r) && (this.piecesOnBoard[i].getPosColumn() === c) && (this.piecesOnBoard[i].getColor() === color)){
                resultado = true;
            }
        }
        //console.log(resultado);
        return resultado;
    }

    addPiece(p, x, y) {
        let newPiece = new Celda(p, x, y);  // (color, row, column)
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
            if ((this.piecesOnBoard[i].getPosRow() === x) && (this.piecesOnBoard[i].getPosColumn() === y)) {
                resultado = false;
            }
            i++;
        }
        //console.log(resultado);
        return resultado;
    }

    getFreeRow(row) {  // cambia fila cada 85 px
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
                    posInRow = 358;  // Fila 3
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

    findColumn(x, y) {    // Cambia columna cada 87 px
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
            if ((x >= 721) && (x <810)) {   // Columna 7
                column = 761;
            }
        }
        //console.log("Columna: " + column);
        return column;
    }


    nextPositionRight(posColumn) {
        let deltaColumn = 87;
        return (posColumn + deltaColumn);
    }

    nextPositionLeft(posColumn) {
        let deltaColumn = 87;
        return (posColumn - deltaColumn);
    }

    nextPositionUp(posRow) {
        let deltaRow = 85;
        return (posRow - deltaRow);
    }

    nextPositionDown(posRow) {
        let deltaRow = 85;
        return (posRow + deltaRow);
    }

//#endregion

//#region - Check winner

    checkHorizontal(cell, color) {

        // Derecha
        let piecesFoundRigth = 0;
        let auxCellRigth = new Celda(cell.getColor(), cell.getPosRow(), cell.getPosColumn());
        let nextRigthCell = new Celda(cell.getColor(), cell.getPosRow(), this.nextPositionRight(cell.getPosColumn()));
        for (let i = 1; i <= 3; i++) {
            let c1 = nextRigthCell.getColor();
            let c2 = auxCellRigth.getColor();
            if (this.findCell(nextRigthCell.getPosRow(), nextRigthCell.getPosColumn(), color) && (c1 === c2)) {
                piecesFoundRigth ++;
                auxCellRigth.setPosColumn(nextRigthCell.getPosColumn());
                nextRigthCell.setPosColumn(this.nextPositionRight(nextRigthCell.getPosColumn()));
            }
        }

        // Izquierda
        let piecesFoundLeft = 0;
        let auxCellLeft = new Celda(cell.getColor(), cell.getPosRow(), cell.getPosColumn());
        let nextLeftCell = new Celda(cell.getColor(), cell.getPosRow(), this.nextPositionLeft(cell.getPosColumn()));
        for (let j = 1; j <= 3; j++) {
            let c3 = nextLeftCell.getColor();
            let c4 = auxCellLeft.getColor();
            if (this.findCell(nextLeftCell.getPosRow(), nextLeftCell.getPosColumn(), color) && (c3 === c4)) {
                piecesFoundLeft ++;
                auxCellLeft.setPosColumn(nextLeftCell.getPosColumn());
                nextLeftCell.setPosColumn(this.nextPositionLeft(nextLeftCell.getPosColumn()));
            } 
        }
        //console.log("------------------------");
        //console.log("izq: " + piecesFoundLeft);
        //console.log("der: " + piecesFoundRigth);
        let total = piecesFoundLeft + piecesFoundRigth;
        //console.log("total: " + total);
        return total;  
    }


    checkVertical(cell, color) {

        // Abajo
        let piecesFoundDown = 0;
        let auxCellDown = new Celda(cell.getColor(), cell.getPosRow(), cell.getPosColumn());
        let nextDownCell = new Celda(auxCellDown.getColor(), this.nextPositionDown(auxCellDown.getPosRow()), auxCellDown.getPosColumn());
        for (let i = 1; i <= 3; i++) {
            let c1 = nextDownCell.getColor();
            let c2 = auxCellDown.getColor();
            if (this.findCell(nextDownCell.getPosRow(), nextDownCell.getPosColumn(), color) && (c1 === c2)) {
                piecesFoundDown ++;
                auxCellDown.setPosRow(nextDownCell.getPosRow());
                nextDownCell.setPosRow(this.nextPositionDown(nextDownCell.getPosRow()));
            }
        }
        //console.log("Encontradas abajo: " + piecesFoundDown);
        return  piecesFoundDown;  
    }


    checkDiagonalUpRigth(cell, color) {

        // Arriba-diagonal-derecha
        let piecesFoundUpRigth = 0;
        let auxCellRigth = new Celda(cell.getColor(), cell.getPosRow(), cell.getPosColumn());

        let rowUp = this.nextPositionUp(auxCellRigth.getPosRow());
        let columnRigth = this.nextPositionRight(auxCellRigth.getPosColumn());
        let nextRigthCell = new Celda(auxCellRigth.getColor(), rowUp, columnRigth);

        for (let i = 1; i <= 3; i++) {
            let c1 = nextRigthCell.getColor();
            let c2 = auxCellRigth.getColor();
            if (this.findCell(nextRigthCell.getPosRow(), nextRigthCell.getPosColumn(), color) && (c1 === c2)) {
                piecesFoundUpRigth ++;
                auxCellRigth.setPosRow(nextRigthCell.getPosRow());
                auxCellRigth.setPosColumn(nextRigthCell.getPosColumn());
                nextRigthCell.setPosRow(this.nextPositionUp(nextRigthCell.getPosRow()));
                nextRigthCell.setPosColumn(this.nextPositionRight(nextRigthCell.getPosColumn()));
            }
        }
        let total = piecesFoundUpRigth;
        //console.log("Encontradas arriba diagonal derecha: " + total);
        return total;  
    }


    checkDiagonalUpLeft(cell, color) {

       // Arriba-diagonal-izquierda
       let piecesFoundUpLeft = 0;
       let auxCellLeft = new Celda(cell.getColor(), cell.getPosRow(), cell.getPosColumn());

       let rowUpLeft = this.nextPositionUp(auxCellLeft.getPosRow());
       let columnLeft = this.nextPositionLeft(auxCellLeft.getPosColumn());
       let nextLeftCell = new Celda(auxCellLeft.getColor(), rowUpLeft, columnLeft);

       for (let i = 1; i <= 3; i++) {
           let c1 = nextLeftCell.getColor();
           let c2 = auxCellLeft.getColor();
           if (this.findCell(nextLeftCell.getPosRow(), nextLeftCell.getPosColumn(), color) && (c1 === c2)) {
               piecesFoundUpLeft ++;
               auxCellLeft.setPosRow(nextLeftCell.getPosRow());
               auxCellLeft.setPosColumn(nextLeftCell.getPosColumn());
               nextLeftCell.setPosRow(this.nextPositionUp(nextLeftCell.getPosRow()));
               nextLeftCell.setPosColumn(this.nextPositionLeft(nextLeftCell.getPosColumn()));
           }
       }

        let total = piecesFoundUpLeft;
        //console.log("Encontradas arriba diagonal izquierda: " + total);
        return total;  
    }


    checkDiagonalDownRigth(cell, color) {

        // Abajo-diagonal-derecha
        let piecesFoundDownRigth = 0;
        let auxCellRigth = new Celda(cell.getColor(), cell.getPosRow(), cell.getPosColumn());

        let rowDown = this.nextPositionDown(auxCellRigth.getPosRow());
        let columnRigth = this.nextPositionRight(auxCellRigth.getPosColumn());
        let nextRigthCell = new Celda(auxCellRigth.getColor(), rowDown, columnRigth);

        for (let i = 1; i <= 3; i++) {
            let c1 = nextRigthCell.getColor();
            let c2 = auxCellRigth.getColor();
            if (this.findCell(nextRigthCell.getPosRow(), nextRigthCell.getPosColumn(), color) && (c1 === c2)) {
                piecesFoundDownRigth ++;
                auxCellRigth.setPosRow(nextRigthCell.getPosRow());
                auxCellRigth.setPosColumn(nextRigthCell.getPosColumn());
                nextRigthCell.setPosRow(this.nextPositionDown(nextRigthCell.getPosRow()));
                nextRigthCell.setPosColumn(this.nextPositionRight(nextRigthCell.getPosColumn()));
            }
        }
        let total = piecesFoundDownRigth;
        //console.log("Encontradas abajo diagonal derecha: " + total);
        return total; 
    }


    checkDiagonalDownLeft(cell, color) {

        // Abajo-diagonal-izquierda
        let piecesFoundDownLeft = 0;
        let auxCellLeft = new Celda(cell.getColor(), cell.getPosRow(), cell.getPosColumn());

        let rowDown = this.nextPositionDown(auxCellLeft.getPosRow());
        let columnLeft = this.nextPositionLeft(auxCellLeft.getPosColumn());
        let nextLeftCell = new Celda(auxCellLeft.getColor(), rowDown, columnLeft);

        for (let i = 1; i <= 3; i++) {
            let c1 = nextLeftCell.getColor();
            let c2 = auxCellLeft.getColor();
            if (this.findCell(nextLeftCell.getPosRow(), nextLeftCell.getPosColumn(), color) && (c1 === c2)) {
                piecesFoundDownLeft ++;
                auxCellLeft.setPosRow(nextLeftCell.getPosRow());
                auxCellLeft.setPosColumn(nextLeftCell.getPosColumn());
                nextLeftCell.setPosRow(this.nextPositionDown(nextLeftCell.getPosRow()));
                nextLeftCell.setPosColumn(this.nextPositionLeft(nextLeftCell.getPosColumn()));
            }
        }
        let total = piecesFoundDownLeft;
        //console.log("Encontradas abajo diagonal izquierda: " + total);
        return total; 
    }


    checkGame() {

        let isWinnerHere = false;
        let ultimoAgregadoArray = this.piecesOnBoard[this.piecesOnBoard.length - 1];

        // Celda(color, row, column)
        let cell = new Celda(ultimoAgregadoArray.getColor(), ultimoAgregadoArray.getPosRow(), ultimoAgregadoArray.getPosColumn()); 
        
        // Check pieces
        
        let horizontal = this.checkHorizontal(cell, ultimoAgregadoArray.getColor());

        let vertical = this.checkVertical(cell, ultimoAgregadoArray.getColor());

        let diagonalArribaDerecha = this.checkDiagonalUpRigth(cell, ultimoAgregadoArray.getColor());

        let diagonalArribaIzquierda = this.checkDiagonalUpLeft(cell, ultimoAgregadoArray.getColor());

        let diagonalAbajoDerecha = this.checkDiagonalDownRigth(cell, ultimoAgregadoArray.getColor());

        let diagonalAbajoIzquierda = this.checkDiagonalDownLeft(cell, ultimoAgregadoArray.getColor());


        //Check winner
        if ( (horizontal >= 3) || (vertical >= 3)  ) {                      
            isWinnerHere = true;
            console.log("Ganador !!!");
        }

        if ((diagonalArribaDerecha >= 3) || (diagonalAbajoIzquierda >=3) ) {
            isWinnerHere = true;
            console.log("Ganador !!!");
        }

        if ((diagonalArribaIzquierda >= 3) || (diagonalAbajoDerecha >= 3)) {
            isWinnerHere = true;
            console.log("Ganador !!!");
        }

        if ((diagonalArribaDerecha + diagonalAbajoIzquierda) >= 3) {
            isWinnerHere = true;
            console.log("Ganador !!!");
        }

        if ((diagonalArribaIzquierda + diagonalAbajoDerecha) >= 3) {
            isWinnerHere = true;
            console.log("Ganador !!!");
        }

        return isWinnerHere;
    }

//#endregion

}