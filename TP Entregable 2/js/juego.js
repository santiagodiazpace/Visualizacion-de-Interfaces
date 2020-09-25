"use strict";

const NUMPIECES = 21;    // Piezas para cada jugador
const SIZEPIECE = 30;    // Tamaño de la ficha
const RED = "#FF0000";   // Color ficha                  
const BLUE = "#0000FF";  // Color ficha

let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let arrayPieces = [];
let lastClickedPiece = null;
let isMouseDown = false;
let clickedColumn = null;

let imageBoard = new Image();
let imageTopBoard = new Image();
let newBoard = new Tablero();


//#region - Pieces

canvas.addEventListener("click", event => {
    if (lastClickedPiece != null) {
        lastClickedPiece.setHighligthed(false);
        lastClickedPiece = null
    }

    let clickedPiece = findClickedPiece(event.layerX, event.layerY);

    if (clickedPiece != null) {
        clickedPiece.setHighligthed(true);
        lastClickedPiece = clickedPiece;
    } 

    drawPieces();
});

function findClickedPiece(x,y) {
    for (let index = 0 ; index < arrayPieces.length; index ++) {
        let element = arrayPieces[index];
        if (element.isPointInside(x,y)) {
            return element;
        }
    }
}

function drawPieces() {
    clearCanvas();
    for (let i = 0 ; i < arrayPieces.length; i++) {
        arrayPieces[i].draw(arrayPieces[i].getColor());
    }
}

function addPiece(color) {
    let posX = 0;
    if (color === RED) {
        posX = 50;
    } else {
        posX = 950;
    }
    let posY = Math.round(Math.random() * canvasHeight);
    if ((posY + SIZEPIECE) > canvas.height) {
        posY -= SIZEPIECE * 2;
    }
    if ((posY - SIZEPIECE) < 0) {
        posY += SIZEPIECE * 2;
    }
    let newPiece = new Ficha(posX, posY, SIZEPIECE, context, color);
    arrayPieces.push(newPiece);
}

//#endregion

//#region - Mouse events

function onMouseDown(event) {
    isMouseDown = true;
    if (lastClickedPiece != null) {
        lastClickedPiece.setHighligthed(false);
        lastClickedPiece = null;
    }

    let clickedPiece = findClickedPiece(event.layerX, event.layerY);
    if (clickedPiece != null) {
        clickedPiece.setHighligthed(true);
        lastClickedPiece = clickedPiece;
    }
    drawPieces();
}

function onMouseMoved(event) {
    if (isMouseDown && lastClickedPiece != null) {
        lastClickedPiece.setPosition(event.layerX, event.layerY);
        drawPieces();
    }
}

function onMouseUp(event) {
    isMouseDown = false;
    let posX = event.layerX;
    let posY = event.layerY;
    //console.log("Coordenadas: " + posX + " , " + posY);
    clickedColumn = findColumn(posX, posY);
    if ((lastClickedPiece != null) && (clickedColumn != null) && (newBoard.isFreePosition(posX, posY))) {
        lastClickedPiece.setPosition(findColumn(posX, posY), locatePiece());
        newBoard.addPiece(lastClickedPiece.getColor(), lastClickedPiece.getPosX(), lastClickedPiece.getPosY());
        // Ubicar la ficha en celda ???
        // newBoard.printArray();
    }
}

//#endregion

//#region - Utilities

function initPlay() {

    for (let i = 1 ; i <= NUMPIECES; i++) {
        addPiece(BLUE);
        addPiece(RED);
    }
    console.log("--> " + arrayPieces.length + " fichas creadas");

    drawPieces();
    drawImageBoard();
    drawImageTopBoard();

    canvas.addEventListener("mousedown", onMouseDown,false);
    canvas.addEventListener("mouseup", onMouseUp,false);
    canvas.addEventListener("mousemove", onMouseMoved,false);
}

function clearCanvas() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    reloadImageBoard();
    reloadImageTopBoard();
}

function drawImageBoard() {
    imageBoard.src = "imagenes/tablero.png";

    imageBoard.onload = function () {
        let posX = (canvas.width - imageBoard.width) / 2;
        let posY = (canvas.height - imageBoard.height) / 2 + 50;
        context.drawImage(imageBoard, posX, posY);
    }
}

function reloadImageBoard() {
    let posX = (canvas.width - imageBoard.width) / 2;
    let posY = (canvas.height - imageBoard.height) / 2 + 50;
    context.drawImage(imageBoard, posX, posY);
}

function drawImageTopBoard() {
    imageTopBoard.src = "imagenes/flechas.png";

    imageTopBoard.onload = function () {
        let posX = (canvas.width - imageTopBoard.width) / 2;
        let posY = 30;
        context.drawImage(imageTopBoard, posX, posY);
    }
}

function reloadImageTopBoard() {
    let posX = (canvas.width - imageTopBoard.width) / 2;
    let posY = 30;
    context.drawImage(imageTopBoard, posX, posY);
}

//#endregion

function findColumn(x, y) {
    let column = null;
    if ((y >= 30) && (y < 120)) {
        if ((x >= 187) && (x < 276)) {  // Columna 1
            column = 232;
        }
        if ((x >= 276) && (x < 365)) {  // Columna 2
            column = 321;
        }
        if ((x >= 365) && (x < 454)) {  // Columna 3
            column = 410;
        }
        if ((x >= 454) && (x < 543)) {  // Columna 4
            column = 499;
        }
        if ((x >= 543) && (x < 632)) {  // Columna 5
            column = 588;
        }
        if ((x >= 632) && (x < 721)) {  // Columna 6
            column = 677;
        }
        if ((x >= 721) && (x <810)) {  // Columna 7
            column = 766;
        }
    }
    console.log("Columna: " + column);
    return column;
}

function locatePiece() {
    return 600;
}



initPlay();
