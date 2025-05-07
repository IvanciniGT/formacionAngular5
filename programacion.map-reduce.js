
// La programación map-reduce es un modelo de programación (una forma de plantear un algoritmo)
// para trabajar con colecciones de datos, basado en programación FUNCIONAL.

const lista = [1,2,3,4,5];

// GEnerar una lista con el doble de los números
// Programación imperativa:

const listaDoble = [];
for (let i = 0; i < lista.length; i++) {
    listaDoble.push(lista[i] * 2);
}

const funcion1 = elemento => elemento * 2;  // DECLARANDO UNA FUNCIÓN, una función que recibe un dato y devuelve el mismo dato multiplicado por 2.
// De que otra forma podría hacerlo???
const funcion11 = (elemento) => {
                                    return elemento * 2;
                                };
function doble(dato) {
    return dato * 2;
}
const function2 = doble;

function LOQUESEA(elemento) {
    return elemento > 5;
}

// // Con programación map-reduce:
const listaDoble2 = lista.map(elemento => elemento * 2)
                         .filter(elemento => elemento > 5)
                         .map(elemento => elemento * 3)
                         .map(elemento => elemento -5)
                         .filter(LOQUESEA);

console.log(listaDoble); // [2, 4, 6, 8, 10]
console.log(listaDoble2); // [2, 4, 6, 8, 10]

