# React

Es un framework? Es una librería.

# Framework

- conjunto de librerías
- conjunto de herramientas
- Sobre todo, la diferencia al usar un framework es que impone una forma de trabajar.


# Qué es Angular?

Framework de inversión de control. TODO???
Angular me da una serie de herramientas, y librerías que me permiten DEFINIR lo que quiero que tenga una aplicación. Posteriormente ANGULAR se encarga de crear/ejecutar la aplicación y de hacer que funcione. Angular es el que impondrá un FLUJO de trabajo a la aplicación (lo que hacemos normalmente en la función main).
De hecho nuestros programas en angular van a tener algo así como una función main??? que tendrá una sola linea de código: ANGULAR! ejecuta mi aplicación.
Quien controla el flujo de mi aplicación es ANGULAR.... y eso va a tener una serie de ventajas ENORMES! (es lo mismo que me pasa en backend con SPRING).
```ts
// main de un proyecto angular
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

El equivalente en Spring:
```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

Para ello, debemos explicar a angular como queremos que sea nuestra aplicación.... y de eso va este curso!


Un framework de desarrollo de apps web.
Funciona por componentes
Lenguaje de programación TS
Test Jasmine/Karma
Decoradores/Directivas
Enrutamiento

---

# Paradigmas de programación

Es un nombre hortera que los desarrolladores le damos a la forma de usar un lenguaje al escribir código... Lo curioso es que en los lenguajes humanos (naturales) también tenemos el mismo concepto. El lenguaje lo puedo usar de muchas formas para explicar el mismo concepto.

> Felipe, pon una silla debajo de la ventana.     Imperativo


Lenguaje imperativo                 Básicamente damos ordenes que el ordenador debe de 
                                    procesar secuancialmente. En ocasiones necesitamos romper esa secuencialidad y para eso existen las típicas estructuras de control de flujo (if, for, while, switch, etc). 
Lenguaje procedural                 Cuando el lenguaje me permite agrupar esas secuencias
                                    de órdenes en un concepto que denominamos función/método/procedimiento/subrutina.
                                    Y además, me permite posteriormente ejecutar esas funciones.
                                    Esto es una evolución de los lenguajes imperativos.
                                    Qué aporta?
                                    - Mejorar la estructura del código, haciendo que sea más legible y mantenible.
                                    - Facilitar la reutilización del código.
Lenguaje orientado a objetos        Todo el lenguaje al final me permite montar programas
                                    que manejan datos. Esos datos tienen un determinado TIPO. Cada lenguaje ofrece una serie de tipos por defecto (number, string, boolean, array, object, etc).
                                    Cuando el lenguaje me permite definir mis propios tipos de datos, con sus características y comportamientos, hablamos de un lenguaje orientado a objetos.

                                                    Caracteriza por             Operaciones
                                      string        sequencia de caracteres     length, substring, indexOf
                                      array         secuencia de datos          length, push, pop, slice
                                      date          dia, mes, año, hora, minutos, segundos
                                                                                caesEnBisiesto, esFinDeSemana
           (ENTIDAD/MODELO)           usuario       nombre, apellidos, edad, dni
                                                                                esMayorDeEdad, esMenorDeEdad
                                      usuariosService  (URL de backend)         crearUsuario, eliminarUsuario

                                      Los datos de un tipo concreto custom los denominamos objetos.

        Tanto typescript como JS soportan orientación a objetos.
        Pero.. la orientación a objetos de TS es más potente que la de JS (incluso diría que la de JAVA).
        TS es una brutalidad de lenguaje.. y de paso muy muy divertido de usar.

Lenguaje funcional                  Cuando el lenguaje me permite que una variable apunte
                                    a una función y posteriormente ejecutar la función desde la variable, entonces digo que estoy usando un paradigma funcional.

# Paradigma declarativo

Estamos hartos de programación imperativa... HARTOS !!!!! Es una castaña del 15!!!!

> Felipe IF algo que no sea silla debajo de la ventana: 
    > Felipe, quítalo de ahí.     Imperativo = MIERDA!!!!
> Felipe, SI(IF) no hay una silla debajo de la ventana: 
    > Felipe if no silla, goto ikea!
    > Felipe, pon una silla debajo de la ventana.     Imperativo = MIERDA!!!!

El problema de usar lenguaje imperativo es que pierdo de vista lo que quiero conseguir... 
Paso a centrarme en cómo conseguirlo.

> Felipe, debajo de la ventana tiene que haber una silla. <<< NO DOY ORDEN. DIGO LO QUE QUIERO!
> Es tu problema conseguirlo! Y DELEGO LA RESPONSABILIDAD DE CONSEGUIRLO A QUIEN CORRESPONDA.

> Solo declaro lo que debe ser. Eso es un lenguaje declarativo.

Todas las herramientas que triunfan hoy en día, lo hacen precisamente por hacer uso de lenguaje declarativo:
- Kubernetes
- Docker
- Terraform
- Ansible
- Spring
- Angular
---

Quiero una aplicación web que:
- Tenga un formulario que me permita buscar palabras en un diccionario de un determinado idioma.
- Quiero que cuando el usuario haga click en el botón buscar, se consulte el diccionario y se muestren por los significados de la palabra.
- Quiero poder editar el significado de la palabra, mediante un segundo formulario.
- Quiero que cuando el usuario haga click en el botón guardar, se guarde el significado editado en el diccionario.

Estoy usando lenguaje imperativo? NO. De hecho eso se parece mucho a definir los requisitos de un proyecto.

Esto además tiene su gracia... Si hubiera definido:
Quiero una aplicación web que:
- Quiero que cuando el usuario haga click en el botón guardar, se guarde el significado editado en el diccionario.
- Quiero que cuando el usuario haga click en el botón buscar, se consulte el diccionario y se muestren por los significados de la palabra.
- Tenga un formulario que me permita buscar palabras en un diccionario de un determinado idioma.
- Quiero poder editar el significado de la palabra, mediante un segundo formulario.
---

# Lenguajes de tipado estático vs dinámico.

TS: Tipado fuerte o estático.
JS: Tipado débil o dinámico.

En JS los datos tienen tipo? Existen tipos de datos? EVIDENTEMENMTE SI!
En todo lenguaje de programación, manejamos datos de distinta naturaleza.
En JS tenemos los tipos: number, string, boolean, object, array, function, null, undefined.

var variable = 'hola';   // 'hola' es un string
var variable = 5;       // 5 es un number
var variable = true;    // true es un boolean

Hay lenguajes que permiten marcar las variables con un TIPO... esto es otra cosa.

```js
let variable = 'hola'; // Estoy asignando la variable al valor hola!
```

En JS, JAVA, TS, PYTHON... y muchos otros el concepto de variable no es el mismo que en C, C++, Fortran, ADA... En cada lenguaje el concepto de variable es diferente.
En estos lenguajes una variable no es un CAJONCITO donde meto algo!
Tiene más que ver con el concepto de puntero en C.

En esa línea de código estoy haciendo 3 cosas:
- Crear un objeto de tipo string en memoria RAM con valor 'hola'
- Crear una variable llamada variable
- Asignamos la variable a ese objeto de tipo string.
   Pensad en la RAM como en un cuaderno de cuadricula. Lo he abierto ... por algún lado... y he escrito 'hola' en una de las casillas... npi de donde.
   Una variable sería como unn postit, que pegamos en el cuaderno al lado del valor 'hola'. En el postit lo que escribo es 'variable'... no 'hola'.

Si despues ejecuto:
```js
variable = 'adios';
```

Lo que pasa: 
- Creo en RAM un nuevo objeto de tipo string con valor 'adios'
  Dónde? Donde estaba hola o en otro sitio? En otro sitio... en este momento en RAM hay 2 strings: 'hola' y 'adios'. Guardados en sitios diferentes de la RAM.
- Lo siguiente es mover el postit que tenía pegado al lado de 'hola' y pegarlo al lado de 'adios'. Asigno la variable al nuevo objeto de tipo string.
Al hacerlo, el dato 'hola' queda 'huérfano' de variable.... y se convierte de esta forma en BASURA (Garbage).... y quizás o no, en algún momento el RECOLECTOR DE BASURA (Garbage Collector) de JS lo elimine de la RAM.

No mezclemos los datos con las variables que apuntan a esos datos.
En todos estos lenguajes (JS, PYTHON...) los datos SI TIENEN TIPO. 
Hay lenguajes que me permiten definir un tipo en las variables... de forma que esas variables solo pueden apuntar a datos de ese tipo o un subtipo.
Entre éstos últimos tenemos: JAVA y TS.
En JAVA y TS, cuando definimos una variable le asignamos un TIPO... a la VARIABLE.

```ts
miVariable:string = 3; // Error de transpilación
```

Ya que me diría el traspilador que no puedo asignar un dato de tipo number a una variable de tipo string.

# Transpilación???

La misma mierda que la compilación.
Llamamos o hablamos de compilar cuando cambiamos de un lenguaje de un determinado nivel de abstracción a otro de un nivel de abstracción diferente.

    Alto nivel       Más bajo nivel
    JAVA        ---> BYTECODE (compilación)
    C           ---> código máquina (compilación)

En el caso que traduzca el código de un alenguaje de un determinado nivel de abstracción a otro de un nivel de abstracción similar, hablamos de transpilación.

    TS --> JS (transpilación)

---

JS es un lenguaje interpretado... y para su ejecución necesita un interprete.
Habitualmente y tradicionalmente, el interprete de JS es el navegador.

En un momento dado, crearon un interprete de JS que me permite ejecutar código JS fuera de un navegador (GOOGLE, NodeJS).

NodeJS es el mundo JS es el equivalente a JVM (JAVA VIRTUAL MACHINE) en el mundo JAVA.

Para ejecutar JS desde linea de comandos (en general desde fuera de un navegador) necesito un interprete    que no corra dentro de un navegador.

---

# Angular funciona con componentes!

Componente? Hoy en día las apps web no las montamos como antes se montaban.
- SPA: Single Page Application (Una app que solo tiene una página html)
  Lo que hacemos es MUTAR el contenido de esa página html.
  Y eso lo hacemos generando trozos de html en el navegador... desde JS.
  Todo el html que se procesa hoy en día en un navegador es generado por el navegador, usando programas JS.
  Hace 25 años... ya hacíamos esto: AJAX
- Web Components es un nuevo estándar del W3C. igual que lo son HTML y CSS.
    Desde hacía años, nos dimos cuenta que nos interesaba crear apps con componentes reutilizables. Las marcas HTML se quedaban pobres. Empiezan a surgir frameworks y librerías (REACT, VUE, ANGULAR) que nos permiten crear componentes reutilizables.
    Más adelante sale un estándar del W3C que estandariza ese concepto que estaba siendo implementado por diferentes librerías y frameworks... cada una a su forma.
    Hoy en día todos los navegadores soportan de forma nativa el concepto de web components.

    Un componente web es una marca HTML personalizada, que yo defino... y que puedo usar en varios proyectos. A esa marca le asocio un comportamiento (JS), renderización (HTML) y estilo (CSS) propios de esa marca.

    <usuario id=21294></usuario>

 Lo que hacemos es explicarle a un navegador que queremos definir nuestra propia marca HTML... le decimos como debe renderizarla, que atributos html admite, que eventos genera, que estilos css se le aplican. Una vez hecho esto, podemos empezar a usar esa marca en cualquier proyecto web.
 
 Una de las cosas que ofrece Angular (no la más importante) es una forma sencilla de crear web components (es decir marcas html personalizadas).

 A la hora de montar un frontal, ya no pienso en páginas html... pienso en componentes web, que vamos reemplazando entre ellos.

 <html>
    <head>
        <title>Mi primera app</title>
    </head>
    <body>
        <formulario-busqueda-palabras></formulario-busqueda-palabras>
    </body>
</html>
    vvvv

 <html>
    <head>
        <title>Mi primera app</title>
    </head>
    <body>
        <!--<formulario-busqueda-palabras></formulario-busqueda-palabras>
        <listado-significados palabra="silla"></listado-significados>--->
        <formulario-edicion-significados palabra="silla"></formulario-edicion-significados>
    </body>
</html>

    vvvvv
<html>

La lógica de renderizado de información, la definimos en JS... y se ejecutará en un navegador.

Antaño:
    USUARIO ---> NAVEGADOR   -------------------> Serv. aplicaciones (weblogic)
                                                   servlet, jsp.. php
                            <-------- html -------
                el navegador procesa el html 
                y lo renderiza

Qué no nos gusta de esa forma de trabajo?
- Petamos el servidor... haciéndole que genere el HTML.
- Qué pasa si queremos otro frontal?
    Hace 20 años, el frontal era un navegador web.
    Hoy en día tenemos muchos frontales... el navegador ni siquiera es el más usado:
    - App iOS
    - App Android
    - Web
    - App desktop
    - Asistente de voz
    - IVR
    - Chatbot
    - Whatsapp
  Y pregunta... a Alexa le importa si algo va en negrita con Arial de 15 pts...
  Ni a un IVR, ni a una app Mobile... todos esos lo que necesitan es el DATO! en un formato neutro. HTML Es un lenguaje de dominio específico para renderizar información en un navegador. Va orientado a la renderización y visualización por un ser humano.
  Necesitamos un lenguaje que nos permita mandar los DATOS... sin información adicional de cómo se deben renderizar: JSON.

Hoy en día:
    USUARIO ---> NAVEGADOR   -------------------> Serv. aplicaciones (tomcat)
                                                   servlet
                            <-------- json -------
                Programas JS procesan el json
                y generan HTML localmente
                que el navegador renderiza
    
    USUARIO ---> AppMobile   -------------------> Serv. aplicaciones (tomcat)
                                                   servlet
                            <-------- json -------
                Programas Swift, Kotlin procesan el json
                y generan pantallas nativas de la app
                que el sistema operativo renderiza
    
    USUARIO ---> IVR   -------------------> Serv. aplicaciones (tomcat)
                                                   servlet
                            <-------- json -------
                Programas IVR procesan el json
                y generan audio
                que el IVR reproduce

Resumen...
Al final, usando ese framework que se llama Angular, lo que vamos a generar es una colección de ficheros JS que un navegador ejecuta para ir generando internamente el HTML que va a renderizar.

Pregunta: PARA QUE OSTIAS QUEREMOS NODE!?!?!?!
No se trata de ejecutar la aplicación (al menos no solo)... la app hay que desarrollarla.
La vamos a desarrollar en qué lenguaje? En typescript.
Y hay que transpilar de ts a js... El transpilador de TS a JS es un programa desarrollador en JS, que corre en local... fuera del navegador (necesito node).
Luego querré ir probando la app. en que servidor web cuelgo los html, js... css, imágenes?
Puedo montar uno fácilmente con JS que corra en local (node).

Mi programa será un conjunto de ficheros ts... que los transpilo a .js... pero al navegador no le mando 700 ficheros .js... le mando un solo fichero js (bundle) que es el resultado empaquetar la transpilación de todos los ficheros ts.
El proceso de empaquetado lo hacemos con un programa desarrollado en JS que corre en local (node).
Angular tiene una utilidad llamada angular-cli (ng) que me permite crear un proyecto angular, y que me permite crear componentes, servicios... al menos un esqueleto de ellos.
Angular CLI es un programa desarrollado en JS que corre en local (node).

Estas cosas son las que me obligan a tener node instalado en mi máquina.
Al final, cuando acabemos el desarrollo, ejecutaremos:
ng build... y generará una carpeta con:
- Un fichero html
- Un fichero js (bundle)
- Un fichero css
- Unas imágenes
- Unas fuentes
- Unas librerías
Esa carpeta la pongo en un servidor web tipo nginx, apache httpd... y la ejecuto en un servidor.. que servirá a un navegador esos ficheros.. entre ellos los js.. y ya el navegador se encargará de ejecutar el js y renderizar el html.

Para el entorno de producción, no hace falta NODE PARA NADA !
No lo quiero ni ver el node en producción!

Qué era node? Intérprete de JS para ejecutar apps JS fuera de un navegador.

---

Cuando instalamos node, nos vienen adicionalmente otros programitas, además de node... entre ellos:
- npm es el maven de js... Y NO ES UN GESTOR DE DEPENDENCIAS JS (igual que maven NO ES UN GESTOR DE DEPENDENCIAS JAVA). O al menos no solo...y de hecho ni siquiera es la característica principal de estas herramientas. Son herramientas de AUTOMATIZACION DE TAREAS... Me permiten automatizar las tareas habituales de un proyecto.
  - Compilarlo / transpilarlo
  - Empaquetarlo
  - Solicitar la ejecución de pruebas
  - Mandar el código a sonarqube o al menos hacerle una revisión de calidad mínima (linter)
  - Y además, gestionar las dependencias del proyecto.
  cuando trabajamos con maven tenemos siempre en el proyecto el fichero pom.xml
  Cuando trabajamos con npm tenemos el fichero package.json (equivalente directo al pom.xml).
  En ese fichero vamos a definir:
  - Las coordenadas del proyecto (nombre, versión)
  - Metadatos: 
    - Descripción
    - Autor
    - Licencia
    - URL del proyecto
  - Scripts de automatización de tareas (npm run build, npm run test, npm run lint)
  - Dependencias del proyecto (librerías que necesita el proyecto para funcionar)
    En el caso de maven, al definir / incluir una dependencia podemos poner un atributo que se llama scope.
    En el package.json no existe el concepto de scope.... lo que hay son 2 tipos de dependencias:
      - Dependencias de producción: son las librerías que necesita el proyecto para funcionar y por ende se empaquetan en el bundle (producto final)
      - Dependencias de desarrollo: son las librerías que necesita el proyecto para desarrollarse y por ende no se empaquetan en el bundle (producto final)
    En general y a diferencia de cuando trabajamos con el pom.xml, no vamos a incluir manualmente las dependencias en el package.json. Lo hacemos mediante un comando: 
      - npm install <nombre-dependencia>
      - npm install -d <nombre-dependencia>
    En maven, las dependencias se descargan a qué carpeta? En un directorio que sea crea maven en nuestra carpeta de usuario llamado .m2/repository
    Ese repositorio es compartido por todos los proyectos que tengamos en la máquina.
    En npm, las dependencias se descargan a un directorio que se llama node_modules. Este directorio es específico de cada proyecto y no es compartido por otros proyectos.
    Esa carpeta NO SUBE NI DE COÑA al repositorio de git.
    Cuando me descargo un proyecto NPM de un repo de git, lo primero que debo ejecutar es:
    - npm install, que me descargará todas las dependencias que necesita el proyecto para funcionar.
- npx. Nos permite ejecutar librerías / dependencias de nuestro proyecto dentro de un entorno node, con acceso al resto de dependencias del proyecto.
  Es algo así como ejecutar un programa con la JVM teniendo el classpath de un proyecto configurado con todas las dependencias del proyecto.
Hay ciertas salvedades ... en esto de las dependencias.
Hay dependencias / utilidades que las instalo de forma global en la máquina.... ya que las usaré para montones de proyectos:
 - tsc: El transpilador de TS a JS
 - angular-cli: El CLI de angular
---


---
Uno de los 5 grandes principios SOLID:
S: SRP: Single Responsibility Principle
  Se suele confundir con el SoC.
  Los tutoriales de Youtube no ayudan un cagao en este sentido . TODOS LO EXPLICAN MAL!
  El principio de responsabilidad única NO DICE que una clase solo puede tener una responsabilidad... el problema es que LO DECIA en la primera versión de este principio.
  (TIO BOB: CLEAN CODE)
  3 libros más tarde... y tropecientas quejas por parte de la comunidad de desarrollo,
  sale una nueva definición de este principio (en el libro de TIO BOB: CLEAN ARCHITECTURE).

   La segunda definición fue: Una clase debe tener un único motivo para cambiar.
   IGUAL DE RUINA... es ambigua!

   La tercera y buena definición de este principio es:
    Una clase debe atender a un único actor.
   Entendiendo como actor a cualquier persona o unidad organizativa que tenga la capacidad de influir en el código.

  QUE NO ES LA ANTIGUA... ni parecida.
O: OCP: Open Closed Principle
L: LSP: Liskov Substitution Principle
I: ISP: Interface Segregation Principle
D: DIP: Dependency Inversion Principle