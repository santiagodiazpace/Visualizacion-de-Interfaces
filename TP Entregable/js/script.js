"use strict";

let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
let selectImage = document.querySelector("#myInput");
let imageData = ctx.createImageData(canvas.width, canvas.height);
let imagenOriginal = [];
let r = 0;
let g = 0;
let b = 0;
let canvasOriginalW=canvas.width;
let canvasOriginalH=canvas.height;
let canvasData = ctx.createImageData(canvasOriginalW,canvasOriginalH);


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
                let arrWxH= adaptarCanvas(this)
                let imageScaledWidth=arrWxH[0];
                let imageScaledHeight=arrWxH[1];
                // se dibuja imagen en canvas
                canvasData = ctx.createImageData(imageScaledWidth , imageScaledHeight)
                ctx.drawImage(image,0,0, imageScaledWidth, imageScaledHeight);
                imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                guardarImagenOriginal();
            }
        }
    }
}


//Auxiliares

function guardarImagenOriginal() {
    imagenOriginal = [];
    for(let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
            imagenOriginal[imagenOriginal.length] = getRed(x, y);
            imagenOriginal[imagenOriginal.length] = getGreen(x, y);
            imagenOriginal[imagenOriginal.length] = getBlue(x, y);
            imagenOriginal[imagenOriginal.length] = getAlpha(x, y);
        }
    }
}

function deshacerImagen() {
    let pos = 0;
    for(let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
            setPixel(imageData, x, y, imagenOriginal[pos], imagenOriginal[pos+1], imagenOriginal[pos+2], imagenOriginal[pos+3]);
            pos += 4;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

let resetImagen = document.querySelector("#btnDeshacer");
resetImagen.addEventListener("click", function() {
    deshacerImagen();
});


function adaptarCanvas(imagen){
    let arrSalida=[];
    let imageAspectRatio;
    let imageScaledWidth;
    let imageScaledHeight;
    if( imagen.width > imagen.height){
        imageAspectRatio = (1.0 * imagen.height) / imagen.width;
        imageScaledWidth = canvasOriginalW;
        imageScaledHeight = canvasOriginalH * imageAspectRatio;
    }else{
        imageAspectRatio =(1.0 * imagen.width) / imagen.height
        imageScaledWidth=canvasOriginalW * imageAspectRatio 
        imageScaledHeight=canvasOriginalH;                    
    }
    arrSalida.push(imageScaledWidth);
    arrSalida.push(imageScaledHeight);
    canvas.width=imageScaledWidth ;
    canvas.height=imageScaledHeight;       
    return arrSalida;
}


function imagenValida(image){
    let salida = false;
    let tipo = image['type'];
    if(tipo == 'image/jpeg' || tipo == 'image/jpg' || tipo =='image/png' || tipo =='image/bmp') {
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

function getAlpha(x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index+3];
}

//Filtro binarizacion
document.querySelector("#btnBinario").addEventListener("click", function(){
    let umbral = 50;
    for(let x = 0; x < canvas.width; x++) {
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
    for(let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let newRed = 255 - getRed(x, y);
            let newGreen = 255 - getGreen(x, y);
            let newBlue = 255 - getBlue(x, y);
            setPixel(imageData, x, y, newRed, newGreen, newBlue, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});

// Filtro Sepia
document.querySelector("#btnSepia").addEventListener("click", function() {
    for(let x = 0; x < canvas.width; x++) {
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

// Filtro saturacion --> ERRONEO !!!
/* document.querySelector("#btnSaturacion").addEventListener("click", function() {
    let contraste = 100; // Valor por defecto
    let factor = ( 259 * ( contraste + 255 ) ) / ( 255 * ( 259 - contraste ) );
    for(let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let newRed = factor * ( getRed(x,y) - 128 ) + 128;
            let newGreen = factor * ( getGreen(x,y) - 128 ) + 128;
            let newBlue = factor * ( getBlue(x,y) - 128 ) + 128;
            setPixel(imageData, x, y, newRed, newGreen, newBlue, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}); */


// Filtro saturacion
document.querySelector("#btnSaturacion").addEventListener("click", function() {
    for (let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
        let r = getRed(x,y);  
        let g = getGreen(x,y);
        let b = getBlue(x,y);

        let colorHSV= convertirRGBaHSV (r,g,b);                   // Convierte color a formato HSV
        colorHSV[1] *= 2.5;                                       // S: saturacion * factor
        let colorRGB = convertirHSVaRGB(colorHSV);                // Convierte color a formato RGB

        setPixel(imageData, x, y ,colorRGB[0], colorRGB[1], colorRGB[2], 255);
    }}
    ctx.putImageData(imageData,0,0);
});

function convertirRGBaHSV(r, g, b) {

    let min = Math.min( r, g, b );
    let max = Math.max( r, g, b );
    let h = 0;
    let s = 0;
    let v = max;
    let delta = max - min;
    let resultado = [];

    if ( max != 0 )
        s = delta / max;        // s
    else {
        s = 0;
        h = -1;
        return [h, s, undefined];
    }
    if( r === max )
        h = (( g - b ) / delta);      // between yellow & magenta
    else if( g === max )
        h = (2 + ( b - r ) / delta);  // between cyan & yellow
    else
        h = (4 + ( r - g ) / delta);  // between magenta & cyan
    h *= 60;                // degrees
    if( h < 0 )
        h += 360;
    if ( isNaN(h) )  // no es un  numero
        h = 0;
    
    resultado[0] = h;
    resultado[1] = s;
    resultado[2] = v;

    return resultado;
};

function convertirHSVaRGB(colorHSV) {

    let r, g, b;
    let h= colorHSV[0];
    let s= colorHSV[1];
    let v= colorHSV[2];
    let resultado = [];

    if(s === 0 ) {          // gris
        r = v;
        g = v;
        b = v;
    } else {                // color
        h /= 60;               
        let o = Math.floor( h );
        let f = h - o;         
        let p = v * ( 1 - s );
        let q = v * ( 1 - s * f );
        let t = v * ( 1 - s * ( 1 - f ) );
        
        switch( o ) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:        
                r = v;
                g = p;
                b = q;
                break;
        }
    }
    resultado[0] = r;
    resultado[1] = g;
    resultado[2] = b;
    return resultado;
}



// Filtro grises
document.querySelector("#btnGrises").addEventListener("click", function() {
    for(let x = 0; x < canvas.width; x++) {
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
for(let x = 0; x < canvas.width; x++) {
    for(let y = 0; y < canvas.height; y++) {
        let newRed = Math.min(getRed(x, y) + factor, 255);
        let newGreen = Math.min(getGreen(x, y) + factor, 255);
        let newBlue = Math.min(getBlue(x, y) + factor, 255);
        setPixel(imageData, x, y, newRed, newGreen, newBlue, 255);
    }
}
ctx.putImageData(imageData, 0, 0);
});


// Filtro Red
document.querySelector("#btnRed").addEventListener("click", function() {
    for(let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let red = getRed(x,y);
            let newGreen = 0;
            let newBlue = 0;
            setPixel(imageData, x, y, red, newGreen, newBlue, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});

// Filtro Green
document.querySelector("#btnGreen").addEventListener("click", function() {
    for(let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let newRed = 0;
            let green = getGreen(x,y);
            let newBlue = 0;
            setPixel(imageData, x, y, newRed, green, newBlue, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});

// Filtro Blue
document.querySelector("#btnBlue").addEventListener("click", function() {
    for(let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let newRed = 0;
            let newGreen = 0;
            let blue = getBlue(x,y);
            setPixel(imageData, x, y, newRed, newGreen, blue, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});


// Filtro blur
document.querySelector("#btnBlur").addEventListener("click", function() {

    let kernel = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
    let size = Math.sqrt(kernel.length);
    let half = Math.floor(size / 2);
    let width = canvas.width;
    let height = canvas.height;
    let inputData = ctx.getImageData(0, 0, width, height).data;
    let outputData = imageData.data;
    let pixelsAbove;
    let weight;
    let neighborY;
    let neighborX;
    let inputIndex;
    let outputIndex;

    for (let i = 0; i < height; ++i) {
        pixelsAbove = i * width;
        for (let j = 0; j < width; ++j) {
            r = 0;
            g = 0;
            b = 0;

            for (let kernelY = 0; kernelY < size; ++kernelY) {
                for (let kernelX = 0; kernelX < size; ++kernelX) {
                    weight = kernel[kernelY * size + kernelX];
                    neighborY = Math.min(
                        height - 1,
                        Math.max(0, i + kernelY - half)
                    );
                    neighborX = Math.min(
                        width - 1,
                        Math.max(0, j + kernelX - half)
                    );
                    inputIndex = (neighborY * width + neighborX) * 4;
                    r += inputData[inputIndex] * weight;
                    g += inputData[inputIndex + 1] * weight;
                    b += inputData[inputIndex + 2] * weight;
                }
            }
            outputIndex = (pixelsAbove + j) * 4;
            outputData[outputIndex] = r;
            outputData[outputIndex + 1] = g;
            outputData[outputIndex + 2] = b;
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


// Herramientas
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