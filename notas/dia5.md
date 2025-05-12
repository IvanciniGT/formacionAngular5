
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