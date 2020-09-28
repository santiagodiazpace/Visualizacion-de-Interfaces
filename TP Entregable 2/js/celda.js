class Celda {

    constructor(color, r, c) {
        this.color = color;
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

    setColor(color) {
        this.color = color;
    }

    getPosRow() {
        return this.posRow;
    }

    setPosRow(r) {
        this.posRow = r;
    }

    getPosColumn() {
        return this.posColumn;
    }

    setPosColumn(c) {
        this.posColumn = c;
    }
}