
async function llevarCamisaALaTintoreria(){
    console.log("Generando el ticket");

    const ticket = new Promise(
                                (resolve, reject) => { // Esta es la función que se ejecutará asincrónicamente
                                    try {
                                        setTimeout(()=>{
                                            console.log("Limpiando la camisa.....")
                                            console.log("Camisa lista");
                                                resolve("Camisa limpia")
                                        }, 10000); // Lo que hace es esperar 5 segundos antes de ejecutar ese código
                                    } catch (error) {
                                        console.log("Error al limpiar la camisa");
                                        reject("Error al limpiar la camisa");
                                    }
                                }
                            ); // Y esa tarea queda pendiente de ejecución
    return ticket;
}

console.log("Voy a llevar mi camisa a la tintoreria");
const ticket = llevarCamisaALaTintoreria();
console.log("En la tintorería me dan el ticket" + ticket);
console.log("Voy a pedir que manden la camisa cuando esté lista")
// OPCION 2... gracias a programación funcional
// En este caso, no me quedo a la espera de la camisa... Cuando esté lista, me la mandan por correo... y haré lo que sea que 
// que defina aquí!
ticket.then(
                (camisa)=>{
                    console.log("Ya tengo mi camisa! " + camisa);
                }
            ) // La función que pase aquí dentro se ejecutará cuando la promesa se resuelva (cuando la camisa esté lista)
ticket.catch(
                (error)=>{
                    console.log("Error al limpiar la camisa");
                }
            ) // La función que pase aquí dentro se ejecutará cuando la promesa se resuelva (cuando la camisa esté lista)

console.log("Hago la compra en el supermercado");


// OPCION 1... yo voy a buscar la camisa y me quedo a la espera
//console.log("Voy a buscar mi camisa con el ticket");
//const camisa = await ticket; // Canjea el ticket... presento el ticket y me quedo esperando a mi camisa.
    // Si la camisa está lista cuando tengo que esperar? NADA
    // Si no está lista cuanto tengo que esperar? A que acabe
// Una alternativa a la hora de trabajar con Promesas es usar programación funcional!

