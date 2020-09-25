class Celda {

    constructor(p, x, y) {
        this.piece = p;
        this.posX = x;
        this.posY = y;
    }

    getPiece() {
        return this.piece;
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