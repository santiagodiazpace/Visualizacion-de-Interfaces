"use strict";

// Loader
  
let myLoader = document.querySelector("#loader");
let myText = document.querySelector("#text-loader");

function initLoader() {
    setTimeout(function(){ 
        myLoader.classList.remove("loaderVisible");
        myLoader.classList.add("loaderOculto");
        myText.classList.remove("loaderVisible");
        myText.classList.add("loaderOculto");     
      }, 3000);
}

initLoader();


// Countdown

const DATE_TARGET = new Date('11/10/2020 0:01 AM');    //Fecha avant premier               

const SPAN_DAYS = document.querySelector('span#days');
const SPAN_HOURS = document.querySelector('span#hours');
const SPAN_MINUTES = document.querySelector('span#minutes');
const SPAN_SECONDS = document.querySelector('span#seconds');

const MILLISECONDS_OF_A_SECOND = 1000;
const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24

function updateCountdown() {  
    const NOW = new Date()
    const DURATION = DATE_TARGET - NOW;
    const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
    const REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
    const REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
    const REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);

    SPAN_DAYS.innerHTML = REMAINING_DAYS;
    SPAN_HOURS.innerHTML = REMAINING_HOURS;
    SPAN_MINUTES.innerHTML = REMAINING_MINUTES;
    SPAN_SECONDS.innerHTML = REMAINING_SECONDS;
}

updateCountdown();
setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);



// Scroll

window.onscroll=function() {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
    document.querySelector("#millenium").className="millenium-animated";
    document.querySelector("#ship").className="ship-animated";
    } else {
    document.getElementById("avant-premier").className="test2";
    }
}


