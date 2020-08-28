"use strict";

var cols = 10;
var rows = 10;

let matriz = [];
for (let i = 0; i < cols; i++) {
    matriz[i] = [];
    for (let j = 0; j < rows; j++) {
        matriz[i][j] = Math.random() * 100;        
    }    
}

console.table(matriz);


// a) Retornar elemento de valor máximo de matriz

function elemMayor () {
    let maximo = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (matriz[i][j] > maximo)
            maximo = matriz[i][j];
        }
    }
    console.log("Elemento mayor de la matriz: " + maximo);
}


// b) Retornar valor máximo de las filas pares y mínimo de las impares

function elemFilasParesImpares() {
    for (let i = 0; i < rows; i++) {
        if ( i % 2 == 0) {
            let maximo = Number.NEGATIVE_INFINITY;
            for (let j = 0; j < cols; j++) {
                if (matriz[i][j] > maximo)
                    maximo = matriz[i][j];
            }
        console.log("Elemento mayor de la fila par " + i + " es: " + maximo);
        } else {
            let minimo = Number.POSITIVE_INFINITY;
            for (let j = 0; j < cols; j++) {
                if (matriz[i][j] < minimo)
                    minimo = matriz[i][j];
            }
        console.log("Elemento mínimo de la fila impar " + i + " es: " + minimo);
        }
    }
}


// c) Calcular valor promedio de cada fila y guardar en arreglo

function promFilas() {
    let arrPromedios = [];
    for (let i = 0; i < rows; i++) {
        let sumFila = 0;
        for (let j = 0; j < cols; j++) {
            sumFila += matriz[i][j];
        }
        arrPromedios[i] = sumFila / cols;
        console.log("El valor promedio de fila " + i + " es: " + arrPromedios[i]);
    }
}

elemMayor();
elemFilasParesImpares();
promFilas();