
function saluda(nombre){
    console.log(`Hola ${nombre}`);
}

saluda("Juan");

// PROGRAMACIÓN FUNCIONAL
let miVariable = saluda; // Que una variable apunte a una función
miVariable("Pedro");     // Ejecutar la función a través de la variable
// El tema no es lo que es la programación funcional, sino lo que me permite... 
// o lo que puedo llegar a hacer una vez que el lenguaje soporta esta característica


// Funciones que aceptan funciones como argumentos

function generar_saludo_informal(nombre){
    return `Hola ${nombre}`;
}

function generar_saludo_formal(nombre){
    return `Buenos días ${nombre}`;
}

function imprimir_saludo(nombre, funcion_generadora_de_saludo){
    console.log(funcion_generadora_de_saludo(nombre));
}

imprimir_saludo("Juan", generar_saludo_informal);
imprimir_saludo("Pedro", generar_saludo_formal);
// O locuras mayores, como crear una función que devuelva otra función
// EL MUNDO JS está lleno de esto... no es posible escribir código JAVASCRIPT (NI TS) sin
// dominar la programación funcional

// Y por qué? Porque habitualmente el mundo JS se usa para crear frontales...
// Y la programación de frontales es MUY DIFERENTE de la programación de backends
// Es una programación que reacciona a eventos, en la mayor parte de los casos de forma asíncrona... cosa que no ocurre en los backends.
// La programación de backend es mayoritariamente síncrona, y la programación de frontales es mayoritariamente asíncrona
// Y vamos a necesitar suministrar código que se ejecute después de que se haya ejecutado otro código... y cosas así...
// Y eso es lo que nos permite la programación funcional