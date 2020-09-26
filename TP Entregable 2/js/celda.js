class Celda {

    constructor(p, x, y) {
        this.color = p;
        this.posX = x;
        this.posY = y;
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

    getPosX() {
        return this.posX;
    }
   
    setPosX(x) {
        this.posX = x;
    }

    getPosY() {
        return this.posY;
    }

    setPosY(y) {
        this.posY = y;
    }

}