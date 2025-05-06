import { Component, Input, OnInit } from '@angular/core';

// Angular, quiero tener mi marca html personalizada <mostrar-palabra></mostrar-palabra>
// quiero que cuando se use esa marca, se renderice según el html que yo le diga
// y que además, se le apliquen los estilos que yo te digo ahí abajo
// Típico de lenguaje declarativo es la ausencia de verbos.
// Típico de lenguaje imperativo es la presencia de verbos
@Component({
  selector: 'mostrar-palabra',
  templateUrl: './mostrar-palabra.component.html',
  styleUrl: './mostrar-palabra.component.css',
  standalone: true, // Esto hace que este componente sea totalmente independiente
  // De cualquier otro componente que haya... y de librerías externas...
  // Definirá sus propias dependencias/librerías
  // De hecho ésto es el estándar de Angular a partir de la versión 16
})
export class MostrarPalabraComponent implements OnInit {
  // En versiones antiguas de angular, para usar (sobreescribir el método ngOnInit) 
  // había que implementar la interfaz OnInit
  // En versiones más modernas de angular, ya no es necesario implementar la interfaz
  // AUNQUE SIGUE SIENDO UNA BUENA PRÁCTICA

  // Angular, quiero que mi marca html personalizada <mostrar-palabra></mostrar-palabra> tenga un atributo
  // llamado palabra, que pueda recibir un string
  @Input() // Un input es un atributo html personalizado
  palabra?:string = undefined;
  // El ? seria lo mismo que poner un palabra:string|undefined = undefined;

  // Los Inputs se cargan después de haberse invocado el constructor
  // Un componente web tiene un ciclo de vida asociado.
  // Cuando se usa una marca html gestionada por un componente web (personalizada)
  // lo primero que hace el navegador es invocar el constructor del componente asociado 
  // a esa marca html custom.
  // new MostrarPalabraComponent(); y eso invoca al constructor, igual que en JAVA
  // toda clase tiene un constructor
  // Después de llamar a ese constructor, angular rellena las variables que están marcadas 
  // como @Input, con los valores que le pasamos desde el html
  // Esas variables son variables de instancia... igual que en java
  // Esas variables se pueden usar en este fichero (dentro de la clase... con this.palabra, igual que en java)
  // Y también en el html
  // Es más, si el valor de una de esas variables cambiase en el futuro, 
  // el html se refrescaría automáticamente.. PERO ESO YA LO VEREMOS !
  constructor() {
    console.log("Constructor de MostrarPalabraComponent");
    console.log("Aqui todavía no tenemos el valor de la palabra: " + this.palabra);
  }
  // Después, angular invoca al método ngOnInit... que podemos definir si queremos en cualquier componente

  ngOnInit() {
    console.log("ngOnInit de MostrarPalabraComponent");
    console.log("Aqui ya tenemos el valor de la palabra: " + this.palabra);
    // Este es el sitio donde cargar los datos.. o hacer las acciones paralelas que necesite.
    // Pero NI DE COÑA vamos a hacer aquí una petición HTTP.
    // Si lo hacemos estaríamos cagándonos en el principio SOC: Separation of Concerns
    // Separación de preocupaciones
    // El objetivo de esta clase (componente) es mostrar una palabra y sus significados
    // Y una clase debería atender a una única preocupación
    // Llamar al backend suena como una preocupación diferente
    // Es mejor delegar esa preocupación a otro elemento/objeto (un servicio)
    // Y SI... en los frontales TAMBIÉN MONTAMOS SERVICIOS
    // Aquí vamos a necesitar llamar a un Servicio: PalabrasService
    // Cuya responsabilidad/preocupación será hacer peticiones a un backend acerca de palabras.
    // const servicio=new PalabrasService(); 
    // Con este código nos estamos cagando en otro ppo: Principio de Inversión de la Dependencia
    // Una clase no debe crear instancias de los objetos que necesita (ya que entonces generaría una dependencia rígida con ese clase... y si el día de mañana cambia la clase, habría que tocar este fichero) = MONOLITO DE MIERDA!!!
    // Para evitarlo, hay que hacer lo que sea...
    // Una alternativa es usar un PATRON DE DISEÑO: INYECCIÓN DE DEPENDENCIAS
    // En lugar de crear objetos en una clase, que le sean suministrados.
    // Pregunta, quién crea la instancia de esta clase? ANGULAR
    // Ya que angular es un framework de inversión de control, angular es quien va ejecutando el código.
    // Angular es quien invoca al constructor... y Angular puede mirar los argumentos que el constructor necesita
    // Y pasárselos.
    // Esto mismo en JAVA lo hace SPRING (que es un framework de inversión de control)
    // Gracias a que es Angular quien va ejecutando el código, tenemos la oportunidad de delegarle a Angular 
    // la responsabilidad de crear/inyectar los objetos que necesitemos
    // Angular es un framework que nos regala la inyección de dependencias (ESTA ES LA MAYOR GRACIA DE ANGULAR... 
    // y no el trabajar con componentes... eso ya lo hacen otros 500 frameworks y librerías)
    //const significados = servicio.getSignificados(this.palabra);
  }

  // Después de ejecutar el método ngOnInit, angular renderiza el html
  // Y volverá a renderizarlo cada vez que cambie el valor de la variable palabra
}
