
Pendientes:
- [x] seleccionadoInicial
- [x] Gestión de errores
- [x] Gestión de eventos


- Toda la edición (formularios y llamar al backend para guardar los datos)
- Listado de personas Component
- Alta de persona (Formularios reactivos = MAS COMPLEJO!)

## Comunicación entre componentes

### Forma más BASICA de la comunicación entre componentes

Cuando queremos que un componente padre mande datos a un componente hijo, lo que hacemos es pasarle attributos al hijo.
    INPUTS
Cuando queremos que un componente hijo mande datos a un componente padre, lo que hacemos es pasarle eventos al padre.
    OUTPUTS

SIEMPRE QUE PUEDA USAR ESTO, USO ESTO !
Pero a veces no podemos! Por qué? 
En realidad lo podríamos usar siempre... pero en ocasiones la sobrecarga de trabajo es enorme.

    PADRE
        - HIJO 1
        - HIJO 2
           El hijo 2 quire comunicarse con el hijo1 = FOLLON !

           Me tocaría que hijo2 mandase un evento al padre y el padre le pasara un atributo al hijo1.
Y ahora extrapolar eso:

    TATARABUELO
            HIJO 2
                HIJO 3
                    HIJO 4
                        HIJO 5
        BISABUELO
            ABUELO
                PADRE
                    HIJO 6
                        HIJO 7
                            HIJO 8
                                HIJO 9
                                    HIJO 10
                                        HIJO 11
                                            HIJO 12
Quiero comunicar al hijo12 con el hijo5? LOCURA !

En estos casos, tenemos 2 opciones:
- Usar un servicio
  Los 2 componente hijo15 y hijo 5 agarran el servicio (se lo inyectan) y se comunican a través de él.
  En estos casos, solemos montar una función en el servicio que devuelva un Observable al que los hijos se pueden suscribir.

   PersonasService
        setPersonaSeleccionada(persona: DatosPersona): void {
            // LO QUE SEA AQUI!
        }

        subscribePersonaSeleccionada(): Observable<DatosPersona> {
            // LO QUE SEA AQUI!
        }
- Otra forma es utilizar una librería muy estandar que existe en JS: REDUX <--- ngRx
  Esto es lo más potente que hay en comunicaciones... pero... es más compleja la configuración inicial. 