"use strict";

let imageData;

let canvas = document.querySelector("#myCanvas");
let input = document.querySelector("#myInput");
let context = canvas.getContext('2d');

context.fillStyle = "#FFFFFF"; // canvas fondo color blanco
context.fillRect(0, 0, canvas.width, canvas.height);

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
            
            efectoGris();

            // draw the modified image
            context.putImageData(imageData, 0, 0);
        }
    }
}


function efectoGris() {
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
}

