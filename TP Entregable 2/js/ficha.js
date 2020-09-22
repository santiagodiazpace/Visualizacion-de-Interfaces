class Ficha {

    constructor(posX, posY, radius, context, color) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.context = context;
        this.highligthed = false;
        this.highligthedColor = "orange"; 
        this.color = color;
    }

    draw(color) {
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.strokeStyle = "#000000";  // Black
        this.context.lineWidth = 1;
        this.context.stroke();
        this.context.fill();
        
        if (this.highligthed === true) {
            this.context.strokeStyle = this.highligthedColor;
            this.context.lineWidth = 3;
            this.context.stroke();
        }
        
        this.context.closePath();
    }

    getRadius() {
        return this.radius;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getColor() {
        return this.color;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    } 

    setHighligthed(value) {
        this.highligthed = value;
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
}