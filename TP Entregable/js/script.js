"use strict";


let canvas = document.querySelector("#myCanvas");
let input = document.querySelector("#myInput");
let context = canvas.getContext('2d');

context.fillStyle = "#024359"; // canvas background color
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
            let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
            
            // draw the modified image
            context.putImageData(imageData, 0, 0);
        }
    }
}

