
# Listado de Personas editable

```html
<listado-personas....>
```
## Componente Persona

```html
<persona 
    id="192938392" \
    datos="MODELO" / O me daban una o me daban la otra. En ocasiones lo único que tendrá quien use este componente es el id de la persona y el resto de datos los tendré (YO COMPONENTE) que pedir al servidor. En otras ocasiones me pasaban el modelo completo de la persona y yo solo lo muestro.
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
```

## A nivel del archivo persona.component.ts qué variables me interesa definir

Qué datos necesito controlar en cada momento de cada componente persona?

- ~~enEdicion:boolean~~
- ~~estoySeleccionado:boolean~~

- estado: 1|2|3
- estoyCompacto: boolean

### MAQUINA DE ESTADOS asociada al componente

ESTADOS:


INICIAL ---> (si ya tengo los datos) --->   DESELECCIONADO
    |                                             ^
    +------> (si no tengo los datos) --->   EN_ESPERA_DE_DATOS_DEL_SERVICIO
                                                  v            ^ (relanzar la petición cada X tiempo)
                                            ERROR_COMUNICACION_SERVIDOR_AL_CARGAR


                                +---------- ERROR_COMUNICACION_SERVIDOR_AL_GUARDAR (intentar relanzar el proceso de guardar)
                                |                   ^   v
                                |                   ^   v
                                |           EN_ESPERA_DE_OK_DE_GUARDADO 4
        1                    2  v                 3  ^
   DESELECCIONADO <---> SELECCIONADO <---> EN EDICION
       ^                                      |
       |                                      |
       +--------------------------------------+

```mermaid
stateDiagram-v2
    DIRECTION TB
    [*] --> INICIACION
    INICIACION --> DESELECCIONADO: Si tengo datos
    INICIACION --> EN_ESPERA_DE_DATOS: Si no tengo datos
    EN_ESPERA_DE_DATOS --> ERROR_CARGA_DATOS: Si el backend no contesta
    ERROR_CARGA_DATOS --> EN_ESPERA_DE_DATOS: Si reintento a los X segundos
    EN_ESPERA_DE_DATOS --> DESELECCIONADO: Si el backend contesta<br> y manda datos
    DESELECCIONADO --> SELECCIONADO: Si selecciono<br>(y es posible seleccionar)
    SELECCIONADO --> DESELECCIONADO: Si deselecciono
    SELECCIONADO --> EN_EDICION: Si edito<br>(y es posible editar)
    EN_EDICION --> SELECCIONADO: Si cancelo la edición
    EN_EDICION --> EN_ESPERA_DE_GUARDADO: Si guardo
    EN_ESPERA_DE_GUARDADO --> ERROR_GUARDADO: Si el backend no contesta
    ERROR_GUARDADO --> EN_ESPERA_DE_GUARDADO: Si reintento a los X segundos
    EN_ESPERA_DE_GUARDADO --> SELECCIONADO: Si el backend contesta<br> y me confirma
    ERROR_GUARDADO --> SELECCIONADO: Si se cancela la edición<br> y se deselecciona
    ERROR_GUARDADO --> EN_EDICION: Si el servidor contesta<br>que hay un dato erróneo
```
    Si meto como teléfono: FEDERICO
    En el front meteré una validación de cortesía
    En el back harán la misma validación que yo? O NO... Siempre una mejor ... al menos igual
        Ese teléfono ya existe en la BBDD. No cuela


TRANSICIONES: (a su vez corresponden con acciones que voy a realizar) <---- SEA UNA FUNCION EN EL TS.
                                        EVENTO(OUTPUT)
    1 -> 2: Seleccionar la persona                  onSeleccionado
              GUARDA: solo si seleccionable=true
    2 -> 1: Deseleccionar la persona                onDeseleccionado
    2 -> 3: Iniciar la Editar la persona            onEdicion
              GUARDA: solo si editable=true
    3 -> 4: Finalizar la edición bien               onEdicionFinalizada
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

<persona id="19019812823"/> <!-- en este caso, quiero que el componente solicite los datos de la persona al backend (servicio mediante)-->

<expediente id="123456789"></expediente> <!-- en este caso, quiero que el componente solicite los datos del expediente al backend (servicio mediante). Este componente recibe los datos del expediente.. entre los que se encuentran los datos de la personas creadora y los revisores 

Pero quizas ese componente... en su html (el del componente expediente)
```html
<h2>
    Creador:
</h2>
<persona datos="DATOS_DEL_CREADOR_YA_RECIBIDOS_DEL_BACKEND"></persona>
<h2>
    Revisores:
</h2>
<ul>
    <persona datos="DATOS_DEL_REVISOR1_YA_RECIBIDOS_DEL_BACKEND"></persona>
    <persona datos="DATOS_DEL_REVISOR2_YA_RECIBIDOS_DEL_BACKEND"></persona>
    <persona datos="DATOS_DEL_REVISOR3_YA_RECIBIDOS_DEL_BACKEND"></persona>
</ul>
```
---

# POR DONDE SIGO?

- [ ] Definir el modelo de persona de frontal
- [ ] Definir el modelo de persona de backend
- [ ] Crear el servicio de personas para que trabaje con el backend
- [ ] Añadir datos falsos de personas a json-server

- [x] Crear un css
- [ ] Mejorar el html
- [ ] Definir la lógica del componente

---

--------FRONTEND---------------    -----------------------BACKEND--------------------------------
FORMULARIO
componente WEB  ---> Servicio -----> ControladorRESTv1 ---> Servicio   ---> Repositorio   ----> BBDD
  ^^^                 ^^^^                  ^^^^                ^^^^            ^^^^^           ^^^
  Captura           Comunicar con      Expone un servicio       Define         Gestionar la    Garantizar la 
  de datos          back               mediante un              Logica         persistencia    integridad de los datos
                                       servicio               de negocio
 ^
Validación de                                                   Validación de                   Validación obligatoria!
cortesía                                                        cortesía


@Component          @Injectable       @RestController         @Service        @Repository

Captura un DNI
Fecha de nacimiento
   10-10-1980
   10-10-2038

REQUISITO: Si solo tuviera un sitio donde validar el DNI: BBDD
