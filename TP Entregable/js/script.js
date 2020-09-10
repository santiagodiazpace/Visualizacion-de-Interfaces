"use strict";

let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
let selectImage = document.querySelector("#myInput");
let imageData = ctx.createImageData(canvas.width, canvas.height);


let r = 0;
let g = 0;
let b = 0;


// Cargar imagen
selectImage.onchange = e => {
    let file = e.target.files[0];
    if(imagenValida(file)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            let image = new Image();
            image.src = content;
    
            image.onload = function () {
                let imageAspectRatio = (1.0 * this.height) / this.width;
                let imageScaledWidth = canvas.width;
                let imageScaledHeight = canvas.width * imageAspectRatio;
    
                ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
                // se resetea el canvas con la imagen.
                imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

                ctx.putImageData(imageData, 0, 0);
            }
        }
    }
}


// Formato de imagen valido
function imagenValida(image){
    let salida = false;
    let tipo = image['type'];
    if(tipo == 'image/jpeg' || tipo == 'image/jpg' || tipo =='image/png') {
        salida = true;
    }
    return salida;
}


function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

function getRed(x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];
}

function getGreen(x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
}

function getBlue(x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
}


//Filtro binarizacion
document.querySelector("#btnBinario").addEventListener("click", function(){
    let umbral = 50;
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let promedio = Math.floor((getRed(x, y) + getGreen(x, y) + getBlue(x, y))/3);
            if(promedio > umbral) {
                setPixel(imageData, x, y, 255, 255, 255, 255);
            }else {
                setPixel(imageData,x, y, 0, 0, 0, 255);
            }
        }
    }
    ctx.putImageData(imageData,0,0);
})

// Filtro Negativo
document.querySelector("#btnNegativo").addEventListener("click", function() {
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let newRed = 255 - getRed(x, y);
            let newGreen = 255 - getGreen(x, y);
            let newBlue = 255 - getBlue(x, y);
            setPixel(imageData, x, y, newRed, newGreen, newBlue, 255);
            //executionTool(x, y, newRed, newGreen, newBlue);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});

// Filtro Sepia
document.querySelector("#btnSepia").addEventListener("click", function() {
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {    
                let promedio= Math.floor((getRed(x, y) + getGreen(x, y) + getBlue(x, y))/3);
                let newRed = Math.min(promedio + 40, 255);
                let newGreen = Math.min(promedio + 15, 255);
                let newBlue = Math.min(promedio, 255);
                setPixel(imageData, x, y, newRed, newGreen, newBlue, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});

// Filtro saturacion
document.querySelector("#btnSaturacion").addEventListener("click", function() {
    let contraste = 100; // Valor por defecto
    let factor = ( 259 * ( contraste + 255 ) ) / ( 255 * ( 259 - contraste ) );
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let newRed = factor * ( getRed(x,y) - 128 ) + 128;
            let newGreen = factor * ( getGreen(x,y) - 128 ) + 128;
            let newBlue = factor * ( getBlue(x,y) - 128 ) + 128;
            setPixel(imageData, x, y, newRed, newGreen, newBlue, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});

// Filtro grises
document.querySelector("#btnGrises").addEventListener("click", function() {
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {    
                let gris = ((getRed(x,y) + getGreen(x,y) + getBlue(x,y)) / 3);
                let newRed = gris;
                let newGreen = gris;
                let newBlue = gris;
                setPixel(imageData, x, y, newRed, newGreen, newBlue, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});

// Filtro brillo
document.querySelector("#btnBrillo").addEventListener("click", function() {
let factor = 75;  // valor por defecto
for(let x = 0; x < canvas.width - 1; x++) {
    for(let y = 0; y < canvas.height; y++) {
        let newRed = Math.min(getRed(x, y) + factor, 255);
        let newGreen = Math.min(getGreen(x, y) + factor, 255);
        let newBlue = Math.min(getBlue(x, y) + factor, 255);
        setPixel(imageData, x, y, newRed, newGreen, newBlue, 255);
    }
}
ctx.putImageData(imageData, 0, 0);
});

// Descargar
function descargarImagen() {
    let download = document.querySelector("#btnDownload");
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}


// Limpiar lienzo
let cleanCanvas = document.querySelector("#btnLimpiar");
cleanCanvas.addEventListener("click", function() {
    for(let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
            ejecutar(x, y, 255, 255, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});


// Herramienta dibujar o borrar
let tool = "dibujar";  // por defecto
let toolController = document.querySelector(".herramienta").addEventListener("change", function() {
    let execution = document.getElementsByName("accion");
    for(let i = 0; i < execution.length; i ++) {
        if (execution[i].checked) {
            tool = execution[i].value;
        }
    }
})


// Dibujar
let action = false;
let lines = [];

canvas.addEventListener("mousedown", function() {
    action = true;
});

canvas.addEventListener("mousemove", function(e) {
    if (action) {
        if(tool == "dibujar") {
            r = 0;
            g = 0;
            b = 0;
        }
        else {
            r = 255;
            g = 255;
            b = 255;
        }
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        if(lines.length > 0) {  // si hay pixels dibujados
            let distanceY = y - lines[lines.length - 1][1];
            let distanceX = x - lines[lines.length - 1][0];
            let moduleY = Math.abs(distanceY);
            let moduleX = Math.abs(distanceX);
            let aux = 0;
            if(moduleX > moduleY) {
                aux = moduleX;
            }
            else {
                aux = moduleY;
            }
            let auxX = lines[lines.length - 1][0];
            let auxY = lines[lines.length - 1][1];
            for(let i = 0; i < aux; i ++) {
                auxX += distanceX / aux;
                auxY += distanceY / aux;
                ejecutar(Math.round(auxX), Math.round(auxY), r, g, b);
            }
        }   
        lines.push([x, y]);
        ejecutar(x, y, r, g, b);
        ctx.putImageData(imageData, 0, 0);
    }
});

canvas.addEventListener("mouseup", function() {
    action = false;
    lines = [];
});

canvas.onmouseleave = (function() {
    action = false;
    lines = [];
})

function ejecutar(x, y, r, g, b) {
    if ((x < canvas.width) && (x >= 0) && (y < canvas.height) && (y >= 0)) {
        setPixel(imageData, x, y, r, g, b, 255);
    }
}