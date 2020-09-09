"use strict";

let imageData;
let canvas = document.querySelector("#myCanvas");
let input = document.querySelector("#myInput");
let context = canvas.getContext('2d');
context.fillStyle = "#FFFFFF"; // canvas fondo color blanco
context.fillRect(0, 0, canvas.width, canvas.height);

newCanvas();

function newCanvas() {
  
    // Cargar imagen
    input.onchange = e => {

        // getting a hold of the file reference
        let file = e.target.files[0];

        // setting up the reader
        let reader = new FileReader();
        reader.readAsDataURL(file); // this is reading as data url

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            let content = readerEvent.target.result; // this is the content!

            let image = new Image();

            image.src = content;

            image.onload = function () {
                let imageAspectRatio = (1.0 * this.height) / this.width;
                let imageScaledWidth = canvas.width;
                let imageScaledHeight = canvas.width * imageAspectRatio;

                // draw image on canvas
                context.drawImage(this, 0, 0);

                // get imageData from content of canvas
                imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

                // draw the modified image
                context.putImageData(imageData, 0, 0);
            }
        }
    }
}



let btnNew = document.querySelector("#btnNewCanvas");
btnNew.addEventListener("click",newCanvas);


function aplicarFiltroGris() {
    let pixels = imageData.data;
    let numPixels = (imageData.width * imageData.height);

    for ( let i = 0; i < numPixels; i++ ) {
        let r = pixels[ i * 4 ];
        let g = pixels[ i * 4 + 1 ];
        let b = pixels[ i * 4 + 2 ];

        let gris = ( r + g + b ) / 3;

        pixels[ i * 4 ] = gris;
        pixels[ i * 4 + 1 ] = gris;
        pixels[ i * 4 + 2 ] = gris;
    }
    context.putImageData(imageData, 0, 0);
}

let btnGrises = document.querySelector("#btnGris");
btnGrises.addEventListener("click",aplicarFiltroGris);


function aplicarFiltroInvertir() {
    let pixels = imageData.data;
    let numPixels = (imageData.width * imageData.height);

    for ( let i = 0; i < numPixels; i++ ) {
        let r = pixels[ i * 4 ];
        let g = pixels[ i * 4 + 1 ];
        let b = pixels[ i * 4 + 2 ];
 
        pixels[ i * 4 ] = 255 - r;
        pixels[ i * 4 + 1 ] = 255 - g;
        pixels[ i * 4 + 2 ] = 255 - b;
    }
}

function aplicarFiltroSepia() {
    let pixels = imageData.data;
    let numPixels = imageData.width * imageData.height;

    for ( var i = 0; i < numPixels; i++ ) {
        let r = pixels[ i * 4 ];
        let g = pixels[ i * 4 + 1 ];
        let b = pixels[ i * 4 + 2 ];

        pixels[ i * 4 ] = 255 - r;
        pixels[ i * 4 + 1 ] = 255 - g;
        pixels[ i * 4 + 2 ] = 255 - b;

        pixels[ i * 4 ] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
        pixels[ i * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        pixels[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }
}

function aplicarFiltroContraste() {
    let pixels = imageData.data;
    let numPixels = imageData.width * imageData.height;
    let contraste = 100; // Valor por defecto
    let factor = ( 259 * ( contraste + 255 ) ) / ( 255 * ( 259 - contraste ) );

    for ( var i = 0; i < numPixels; i++ ) {
        var r = pixels[ i * 4 ];
        var g = pixels[ i * 4 + 1 ];
        var b = pixels[ i * 4 + 2 ];

        pixels[ i * 4 ] = factor * ( r - 128 ) + 128;
        pixels[ i * 4 + 1 ] = factor * ( g - 128 ) + 128;
        pixels[ i * 4 + 2 ] = factor * ( b - 128 ) + 128;
    }
}


function descargarImagen() {
    let download = document.querySelector("#btnDownload");
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}
