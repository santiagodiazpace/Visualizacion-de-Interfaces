class Celda {

    constructor(p, r, c) {
        this.color = p;
        this.posRow = r;
        this.posColumn = c;
    }

    getColor() {
        let c;
        if (this.color === "#FF0000") {
            c = "Roja";
        } else {
            c = "Azul";
        }
        return c;
    }

    setPiece(color) {
        this.piece = color;
    }

    getPosRow() {
        return this.posRow;
    }

    getPosColumn() {
        return this.posColumn;
    }


}