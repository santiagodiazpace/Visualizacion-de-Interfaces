"use strict";

const NUMPIECES = 21;     // Piezas para cada jugador
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
let imageBoard = new Image();


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

//#region - Pieces
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

    canvas.addEventListener("mousedown", onMouseDown,false);
    canvas.addEventListener("mouseup", onMouseUp,false);
    canvas.addEventListener("mousemove", onMouseMoved,false);
}

function clearCanvas() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    reloadImageBoard();
}

function drawImageBoard() {
    imageBoard.src = "imagenes/tablero.png";

    imageBoard.onload = function () {
        let posX = (canvas.width - imageBoard.width) / 2;
        let posY = (canvas.height - imageBoard.height) / 2;
        context.drawImage(imageBoard, posX, posY, imageBoard.width, imageBoard.height);
    }
}

function reloadImageBoard() {
    let posX = (canvas.width - imageBoard.width) / 2;
    let posY = (canvas.height - imageBoard.height) / 2;
    context.drawImage(imageBoard, posX, posY, imageBoard.width, imageBoard.height);
}
//#endregion


initPlay();