"use strict";

const NUMPIECES = 21;    // Piezas para cada jugador
const SIZEPIECE = 33;    // Tamaño de la ficha
const RED = "#FF0000";   // Color ficha                  
const BLUE = "#0000FF";  // Color ficha

let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let remainingRed = NUMPIECES;
let remainingBlue = NUMPIECES;
let arrayPieces = [];
let lastClickedPiece = null;
let isMouseDown = false;
let clickedColumn = null;
let clickedPiece = null;
let isWinner = false;
let playerTurn = null;
let timeOK = true;

let imageBoard = new Image();
let imageTopBoard = new Image();
let imageBack = new Image();
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

    clickedPiece = findClickedPiece(event.layerX, event.layerY);
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
    clickedColumn = newBoard.findColumn(posX, posY);
    if (((lastClickedPiece != null) && (clickedColumn != null)) && (clickedPiece.getColor() != playerTurn) && (!isWinner) && (timeOK === true)){
        let freeRow = newBoard.locatePiece(clickedColumn);
        if (freeRow != null) {

            lastClickedPiece.setPosition(clickedColumn, freeRow);

            newBoard.addPiece(lastClickedPiece.getColor(), freeRow, clickedColumn);
            newBoard.printArray();

            isWinner = newBoard.checkGame();
            let win = document.querySelector("#winner");
            if (isWinner) {
                if (clickedPiece.getColor() === "#FF0000") {
                    win.innerHTML = "Ganador Jugador ROJO !!!";
                } else {
                    win.innerHTML = "Ganador Jugador AZUL !!!";
                }

            }
            playerTurn = lastClickedPiece.getColor();
            
            let r = document.querySelector("#reds");
            let b = document.querySelector("#blues");
            let t = document.querySelector("#turno");
            if (clickedPiece.getColor() === "#FF0000") {
                r.innerHTML = "Fichas rojas: " + (--remainingRed);
                t.innerHTML = "Turno jugador AZUL";
            } else {
                b.innerHTML = "Fichas azules: " + (--remainingBlue);
                t.innerHTML = "Turno jugador ROJO";
            }
        }
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

    //drawImageBack();
    drawImageBoard();
    drawImageTopBoard();
    drawPieces();

    canvas.addEventListener("mousedown", onMouseDown,false);
    canvas.addEventListener("mouseup", onMouseUp,false);
    canvas.addEventListener("mousemove", onMouseMoved,false);

    let t = document.querySelector("#turno");
    t.innerHTML = "Inicie el juego...";
}

function clearCanvas() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    //reloadImageBack();
    reloadImageBoard();
    reloadImageTopBoard();
}

function drawImageBack() {
    imageBack.src = "imagenes/fondo.png";

    imageBack.onload = function () {
        context.drawImage(imageBack, 0, 0);
    }
}

function drawImageBoard() {
    imageBoard.src = "imagenes/tablero.png";

    imageBoard.onload = function () {
        let posX = (canvas.width - imageBoard.width) / 2;
        let posY = (canvas.height - imageBoard.height) / 2 + 50;
        context.drawImage(imageBoard, posX, posY);
    }
}

function reloadImageBack() {
    context.drawImage(imageBack, 0, 0);
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


function resetGame() {
    playerTurn = null;
    isWinner = false;
    clearCanvas();
    arrayPieces = [];
    newBoard.clear();
    remainingRed = NUMPIECES;
    remainingBlue = NUMPIECES;
    timeOK = true;

    let win = document.querySelector("#winner");
    win.innerHTML = " ";

    let r = document.querySelector("#reds");
    let b = document.querySelector("#blues");
    r.innerHTML = "Fichas rojas: 21";
    b.innerHTML = "Fichas azules: 21 ";
    let t = document.querySelector("#turno");
    t.innerHTML = "Inicie el juego...";

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

let btn_Reset = document.querySelector("#btnReset");
btn_Reset.addEventListener("click",  resetGame);


function runTimer() {
    let myTimer = setInterval(function(){
        timeleft--;
        document.getElementById("countdowntimer").textContent = timeleft;
        if(timeleft <= 0) {
            clearInterval(myTimer);
            timeOK = false;
            let t = document.querySelector("#turno");
            t.innerHTML = "Terminó el tiempo";
            }
        },1000);

    let timeleft = 60;
    let timerBar = setInterval(function(){
            document.getElementById("progressBar").value = 60 - timeleft;
            if(timeleft <= 0)
            clearInterval(timerBar);
    },1000);
}

let btn_timer = document.querySelector("#btnTimer");
btn_timer.addEventListener("click", runTimer);

//#endregion


initPlay();

