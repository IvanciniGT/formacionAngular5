
# Listado de Personas editable

<listado-personas....>

## Componente Persona

<persona 
    id="192938392" 
    datos="MODELO" 
    modo="compacto|extensible|extendido" 
    editable="true" 
    seleccionable="true" 
    seleccionado="true" 
    estiloBase="css_class"

    onSeleccionado="llamar a una función que haga algo"
    onDeseleccionado="llamar a una función que haga algo"
    onEdicion="llamar a una función que haga algo"
    onEdicionFinalizada="llamar a una función que haga algo"
    onEdicionCancelada="llamar a una función que haga algo"
/>

## A nivel del archivo persona.component.ts qué variables me interesa definir

Qué datos necesito controlar en cada momento de cada componente persona?

//enEdicion:boolean
//estoySeleccionado:boolean

estado: 1|2|3
estoyCompacto: boolean

### MAQUINA DE ESTADOS asociada al componente

ESTADOS:
        1                   2                   3
   DESELECCIONADO <---> SELECCIONADO <---> EN EDICION
       ^                                      |
       |                                      |
       +--------------------------------------+
                      
TRANSICIONES: (a su vez corresponden con acciones que voy a realizar) <---- SEA UNA FUNCION EN EL TS.
                                        EVENTO(OUTPUT)
    1 -> 2: Seleccionar la persona                  onSeleccionado
              GUARDA: solo si seleccionable=true
    2 -> 1: Deseleccionar la persona                onDeseleccionado
    2 -> 3: Iniciar la Editar la persona            onEdicion
              GUARDA: solo si editable=true
    3 -> 2: Finalizar la edición bien               onEdicionFinalizada
    3 -> 2: Cancelar la edición                     onEdicionCancelada
    3 -> 1: Finalizar la edición y deseleccionar    onEdicionFinalizada y onDeseleccionado

   Pregunta... se debe cumplir alguna condición para poder ejecutar la transición 1->2? GUARDA

<button onClick="llamar a una función que guarde!">Guardar</button>

App de solicitud de vacaciones:

En la ficha de una solicitud de vacaciones:
- Solicitante
- Aprobador
- Usuario conectado actualmente

    SOLICITANTE:

    +--------+--------------------------+
    |        |                          |
    | O   O  | Nombre: Felipe           |
    |   o    | Email:                   |
    |  ____  | Teléfono: 948783494      |
    |        |                          |
    +--------+--------------------------+

<persona atts>
    vvvv

```html
<div id="persona" class="extendido">
    <img src="https://www.gravatar.com/avatar/192938392" alt="Avatar" id="foto"/>
    <div id="nombre">Felipe Ruiz</div>
    <div id="email">felipe.ruiz@correo.es</div>
    <div id="telefono">948783494</div>
</div>


<div id="persona" class="compacto">
    <img src="https://www.gravatar.com/avatar/192938392" alt="Avatar" id="foto"/>
    <div id="nombre">Felipe Ruiz</div>
</div>

```


    APROBADOR:

    +--------+--------------------------+
    |        |                          |
    | O   O  | Nombre:                  |
    |   o    | Email:                   |
    |  ____  | Teléfono:                |
    |        |                          |
    +--------+--------------------------+


App de gestión de expedientes de algo...
- Creador del expediente
- RevisoreS del expediente

    +--------+--------------------------+
    |        |                          |
    | O   O  | Nombre:                  |
    |   o    | Email:                   |
    |  ____  | Teléfono:                |
    |        |                          |
    +--------+--------------------------+


    +--------------------------+---+
    | 😀  Federico Ruiz        | V |
    +--------------------------+---+



    Creador del expediente                                  Revisores del expediente
    +--------------------------+---+                        +------------------------------+
    | 😀  Federico Ruiz        | V |                        | 😀  Menchu Ruiz              |
    +--------------------------+---+                        +------------------------------+  
                                                            | 😐  Luis Ruiz                |
                                                            +------------------------------+
                                                            | 🙁  Fermín Ruiz              |
                                                            +------------------------------+
                                                          [Seleccionar todos] [Borrar] [Recordar]


---

# POR DONDE SIGO?

- [ ] Definir el modelo de persona de frontal
- [ ] Definir el modelo de persona de backend
- [ ] Crear el servicio de personas para que trabaje con el backend
- [ ] Añadir datos falsos de personas a json-server

- [ ] Crear un css
- [ ] Mejorar el html
- [ ] Definir la lógica del componente

