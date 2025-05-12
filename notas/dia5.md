
# Listado de personas Component

<listado-personas   seleccionable="true" 
                    borrable="true" 
                    editable="true"
                    buscador="true"
                    nuevo="true"
                    
                    
                    eventos:
                    (seleccionado)
                    (deseleccionado)
                    (borrado)
                    (nuevo)
                    (editado)>

</listado-personas>

## A nivel de UI

App de gestión de expedientes.
Paso1. Doy de alta el expediente
Paso2, le asigno unos revisores:
    El sistema me saca un listado con todos los posibles revisores.. de los que yo elegiré unos cuantos.
 
    Revisores del expediente:
    Nombre: [                   ] Buscador/Filtro
    [Añadir nueva persona] ---> FORMULARIO COMPLETO
    +------------------------------+
    | 😀  Menchu Ruiz              | SELECCIONABLE
    +------------------------------+  
    | 😐  Luis Ruiz                |
    +------------------------------+
    | 🙁  Fermín Ruiz              |
    +------------------------------+
    [Seleccionar todos] [Borrar]
    [Deseleccionar(seleccionados)]

# V1 del componente:

## Listado de personas Component

<listado-personas   seleccionable="true" 
                    buscador="true"
                    personas="[]"         20 personas
>

</listado-personas>

## ESTADOS

### Selección

TODOS_SELECCIONADOS <---> ALGUNOS_SELECCIONADO <--> NINGUNO_SELECCIONADO 
    ^                                                    ^
    |                                                    |
    +----------------------------------------------------+

Siempre sacaremos por pantalla el resultado de aplicar el filtro sobre el listado inicial.
A nivel del componente, vamos a tener 2 variables:

    @Input() personas: DatosPersona[] = [];     // Estas son las que me dan
                |
                Aplicando filtro
                |
                V
    personasMostradas: DatosPersona[] = [];     // Estas son las que en momento dado, estamos viendo por pantalla

    string filtroAplicado: string = ''; 
    
    //Y más adelante será 'F'
    // Mi función de filtro lo que hará es copiar (referenciar) del array inicial al array de mostradas aquellos que cumplan la condición:
    CUANDO SACO A UNA PERSONA POR PANTALLA? Cuando no hay filtro o si hay filtro, que el nombre de la persona contenga las letra.
         filtroAplicado.length() === 0 || persona.nombre.toLowerCase().includes(filtroAplicado.toLowerCase())
                                    // LO QUE QUERAMOS (MARCADO POR REQUISITOS)
                                     .startsWith(filtroAplicado.toLowerCase())

    Si a las personas les aplico ese filtro, y el filtro actual es ""

---

# Formularios

## Método 1.

Identificar (añadir un identificador) a los input de los formularios en angular con el #id... y a nivel del 
html usar su .value para obtener el valor.
    <input type="text" #nombre>
    <input type="text" #apellidos>
    <input type="text" #dni>

    <button (click)="guardar(nombre.value, apellidos.value, dni.value)">Guardar</button>

Esto sirve para casos muy sencillos... y lo bueno es que es muy sencillo de configurar/programar.

## Método 2. COMPONENT PROPERTIES BINDING. Este era el más usado (HOY EN DESUSO)

Lo cual no significa que no tenga su sitio.

    <input type="text" [(ngModel)]="persona.nombre">
    <input type="text" [(ngModel)]="persona.apellidos">
    <input type="text" [(ngModel)]="persona.dni">

    <button (click)="guardar()">Guardar</button>


## Método 3. Formularios Reactivos... Lo más de lo más. 

Nos dan mucha funcionalidad / Potencia, pero son algo más complejos de programar.
Qué ventaja tengo con éstos?

- Crear un formulario, no es solo generar inputs... capturar sus datos y mandarlos a algún sitio...
- Hay otra tarea clave: VALIDACIONES DE LOS DATOS !
No aplica a todos los formularios... pero si a muchos..
Y el tema es que las validaciones son algo complejo...
Cuándo quiero que se apliquen?
- Cuando pulso en guardar? Quizás si el formulario no es válido ni siquiera quiero habilitar el botón de guardar.
- Cuando pierdo el foco de un input? Podría ser...
- Mejor aún, en cuantito va cambiando su valor.
  Según voy escribiendo quiero que me diga si el valor que estoy introduciendo es válido o no = GUAY !

Estos formularios me permiten ir ejecutando validaciones asíncronas de los datos, según se van escribiendo.
Angular me regala algunas validaciones comunes:
- required
- minLength
- maxLength
- pattern regex
- min
- max
- email

Además me permite meter mis propias validaciones customizadas.

Para usarlo, necesitamos hacer MUCHAS COSAS:
- Configurar en angular el módulo de formularios reactivos.
- En el componente donde vayamos a crear un formulario reactivo, tenemos que solicitar a angular (Inyección de dependencias) un constructor de formularios reactivos.
- Usando ese constructor de formularios reactivos, definir la ESTRUCTURA (no renderización... eso sigue igual en el HTML) de nuestro formulario: Campos, Tipos de datos, validaciones.
- En el HTML vinculamos los elementos del DOM (INPUTS) a los campos del formulario reactivo.
- Además, en el HTML podemos introducir mensajes de validación que se activen según el estado del formulario/campo.
En todo momento podré preguntar si el formulario es válido o no, y si un campo es válido o no.

Angular permite definir validaciones NO SOLO A NIVEL DE CAMPO... Sino también a nivel de formulario.
- Quiero un campo numérico positivo             Validación a nivel de campo
- Quiero otro campo numérico positivo           Validación a nivel de campo
- La suma de los 2 no debe ser mayor que 100    Validación a nivel de formulario

Otra cosa genial es la capacidad de generar formularios dinámicos.... por ejemplo... Un usuario, cuántas direcciones puede tener asociadas? (WEB TELEPI, BURGUER KING, AMAZON...)