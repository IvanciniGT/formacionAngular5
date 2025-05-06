
# Angular

Es un framework de inversión de control.
Esto significa que Angular es quien ejecuta la aplicación... y quien aporta el flujo de la misma.
Nosotros hablamos con Angular en lenguaje declarativo.

Imperativo:
> Felipe pon una silla debajo de la ventana

Declarativo:
> Felipe, debajo de la ventana debe haber una silla

# WebComponents

Un estandar del W3C para permitirme definir marcas html personalizadas:
- Con lógica de negocio
- Con estilos
- Con renderizado

Con esa marca tendré unas comunicaciones.
Cuando quiero mandarle algo a la marca, lo hago a través de atributos.
Cuando la marca quiere mandarme algo a mi, lo hace a través de eventos.


```html     
                                   Atributo que me permite a MI COMUNICARME CON LA MARCA... en este caso indicarle los estilos
                                    vvvvv
    <button onClick="handleClick()" style="font-size: 20px">
            ^^^^^^^
            EVENTO (el botón ME COMUNICA que le han hecho click)
```

Angular me facilita la creación de WebComponents.

Los componentes web se rigen por un ciclo de vida.
1. Alguien usa / escribe una marca html <miComponente titulo="Mi titulo"></miComponente>
2. Entonces Angular crea una instancia de la clase que define el componente:
       const instancia = new MiComponente();  /// Se invoca al constructor de la clase
3. Angular asocia los valores de los Inputs a esa instancia, obtenidos de los atributos de la marca html
       instancia.titulo = "Mi titulo"
// La realidad es que aquí hay otra cosita que aún no he contado...
4. Angular invoca el método ngOnInit() de la clase, que es el primer método del ciclo de vida del componente.   
       instancia.ngOnInit(); // Esto se ejecuta 1 vez   // La usamos para cargas de datos...inicializaciones
5. Se renderiza el html del componente y se inyecta al DOM de la página
6. Angular invoca a la función ngAfterViewInit() de la clase, que es el segundo método del ciclo de vida del componente.
       instancia.ngAfterViewInit(); // Se ejecuta 1 vez. La usamos cuando necesitamos obtener referencias a los elementos html del componente que están pinchados al DOM
// Por aquí pasan más cosas.
7. Cuando el componente se va a eliminar del DOM, Angular invoca al método ngOnDestroy() de la clase.
       instancia.ngOnDestroy(); // Se ejecuta 1 vez. La usamos para liberar recursos, como por ejemplo suscripciones a eventos

---

# SOLID

Son unos principios de desarollo de software, que juntó el TIO BOB (Robert C. Martin - unclebob.com).
Los ha ido actualizando en diversas charlas y libros: CLEAN CODE, CLEAN ARCHITECTURE, etc.

No son los únicos principios que tenemos en este mundo del desarrollo de software, pero son los más conocidos y utilizados.

S - SRP: Single Responsibility Principle
         Una clase de un producto de software debe atender a un único actor (tipo de perfil que puede influir es su definición)
O - OCP: Open/Closed Principle
L - LSP: Liskov Substitution Principle
I - ISP: Interface Segregation Principle
D - DIP: Dependency Inversion Principle
         Un componente del sistema no puede depender de implementaciones concretas de otro componente... sino que ambos deben depender de abstracciones (clases abstractas o INTERFACES)

                                                           clase
            MOSTRAR-PALABRA-COMPONENT   --- USA ---->    PALABRAS-SERVICE    ( Si palabrasService es una clase concreta rompe el principio de inversión de dependencias)

            El componente mostro-PALABRA-COMPONENT DEPENDE de PALABRAS-SERVICE

        A ninguna clase le pueden llegar FLECHAS. De las clases solo pueden salir flechas.

            MOSTRAR-PALABRA-COMPONENT   --- USA ---->    PALABRAS-SERVICE-INTERFAZ  <------ PALABRAS-SERVICE-IMPLEMENTACION    
                clase                                         interfaz                            clase

Para asegurarnos de eso, hemos venido usando muchas estrategias (PATRONES DE DISEÑO), a lo largo de los años:
- Modelo Factory
- Inyección de dependencias (PATRON DE DISEÑO):
   Una clase no debe crear instancias de los objetos que necesita, sino que le deben ser suministrados.

```ts
    import { PalabrasService } from "../services/palabras.service";
    //import { PalabrasServiceImpl } from "../services/palabras.service.impl"; // Y ESTA LINEA ES QUE LA ROMPE EL PPO DIP
    class MostrarPalabraComponent{

        private palabrasService: PalabrasService;
        constructor(palabrasService: PalabrasService){ // Inyección de dependencias
            this.palabrasService = palabrasService //= new PalabrasServiceImpl();
        }
        ngOnInit(){
            const significados = this.palabrasService.getSignificados(palabra);
        }

    }
```

Angular, por ser un framework de inversión de control, es quien llama al constructor de la clase.
En ese momento puede mirar (revisar) que datos hacen falta en el constructor y pasarlos.

Desde luego alguien tiene que hacer:
```ts
    const palabrasService = new PalabrasServiceImpl(); // Pero esto queremos que angular lo haga una única vez...
    // Que guarde esa instancia en cache.. y que si alguien en el futuro vuelve a necesitar una instancia de esta clase, que 
    // le pase la misma instancia que ya tiene guardada en cache.
    const mostrarPalabraComponent = new MostrarPalabraComponent(palabrasService);
    mostrarPalabraComponent.palabra = "felipe";
    mostrarPalabraComponent.ngOnInit();
```

Angular me pone a huevo el usar un patrón de diseño de inyección de dependencias, y de paso cumplir con el principio de inversión de dependencias.
Y por ende crear un producto de software que sea fácil de mantener y evolucionar.
Y ESTA ES LA CLAVE DE ANGULAR !!!!

Eso si... a Angular habrá que decirle qué clase concreta queremos que inyecte cuando alguien pida una interfaz concreta.
Eso lo hacemos en el fichero app.config.ts


Además hay otros principios:
- SoC: Separation of Concerns
- DRY: Don't Repeat Yourself
- KISS: Keep It Simple, Stupid
- YAGNI: You Aren't Gonna Need It

CUIDADO, con el significado de la palabra principio!

En ciencias exactas, la palabra principio se usa como sinónimo de LEY. Son verdades UNIVERSALES. 
Eso aplica en matemáticas, física, química, ciencias de la computación, etc.

Pero nosotros no estamos en esas guerras... lo que hacemos es Ingeniería de software.
Y en ingeniería, igual que en las ciencias sociales, la palabra principio se usa refiriéndose a una NORMA MORAL... que ni mucho menos es de obligado cumplimiento. Me puedo adherir a ellas o no.

Lo que estos principios (SOLID) me garantizan, es que si cumplo con ellos, mi código será más fácil de mantener, más fácil de entender y más fácil de evolucionar.

Yo puedo respetar o no esos principios, pero si lo hago, mi código será más fácil de entender y de mantener.

Y ESO ES LA CLAVE DEL MUNDO DEL DESARROLLO DE SOFTWARE. Y lo que diferencia a un junior de un senior.

Que un código funciones es lo mínimo que se le pide. Se da por descontado.
Un producto de software: UN PRODUCTO DE SOFTWARE POR DEFINICIÓN ES UN PRODUCTO SUJETO A CAMBIOS Y MANTENIMIENTO.
El problema viene cuando he hecho un programa de MIERDA y sube a producción, y la empresa adquiere una hipoteca con ese programa.
En el futuro SEGURO (POR DEFINICION) que habrá que hacer cambios y mntos en ese programa. Y si aquello no es fácil, la empresa se puede ir a la ruina más absoluta!

        ESCRIBIMOS CÓDIGO <> PRUEBAS -> OK -> REFACTORIZACION <> PRUEBAS   -> OK -> ENTREGA !
        <-------- 50% del trabajo ------->    <-------- 50% del trabajo ------->
               8 horas de trabajo                    8 horas de trabajo

---

# JSON

JavaScript Object Notation.
Formato con el que en JAVASCRIPT definimos / representamos datos (objetos)... de todo tipo.
Básicamente cualquier dato que se pueda representar en JS, después del igual de una variable, es JSON

```json
const numero = 3;
```

```json
const texto = 'hola';
```

```json
const logico = true;
```

```json
const objeto = {
    "nombre": "felipe",
    "edad": 45,
    "casado": true,
    "hijos": [
        {
            "nombre": "felipe",
            "edad": 20
        },
        {
            "nombre": "marta",
            "edad": 18
        }
    ]
};
```

```json
const array = [
    {
        "nombre": "felipe",
        "edad": 45
    },
    {
        "nombre": "marta",
        "edad": 18
    }
];
```


---
