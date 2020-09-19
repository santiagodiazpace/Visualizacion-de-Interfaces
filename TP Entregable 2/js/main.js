"use strict";

let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let arrayPieces = [];

let lastClickedPiece = null;
let isMouseDown = false;


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

//#region - Piece utilities
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
    for (let i = 0 ; i< arrayPieces.length; i ++) {
        arrayPieces[i].draw(context);
    }
}

function addPiece() {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let newPiece = new Ficha(posX, posY, 30, context);
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

function clearCanvas() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}

function initPlay() {
    for (let i = 0 ; i< 10; i ++) {
        addPiece();
        console.log("Ficha agregada");
    }

    drawPieces();

    canvas.addEventListener("mousedown", onMouseDown,false);
    canvas.addEventListener("mouseup", onMouseUp,false);
    canvas.addEventListener("mousemove", onMouseMoved,false);
}



initPlay();

