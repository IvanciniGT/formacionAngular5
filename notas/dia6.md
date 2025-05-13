# Validación DNI

23000000T
23000000t
23000000 T
23000000-T
02300000T
23.000.000T
23.000.000-t



230.00.000%t

NUMERO SEPARADOR LETRA
NUMERO
  NUMERO SIN PUNTOS: [0-9]{1,8}
  NUMERO CON PUNTOS:
   23.000.000 T:      [0-9]{1,2}(\.[0-9]{3}){2}
   230.000 T          [0-9]{1,3}\.[0-9]{3}

SEPARADOR: [ -]?
LETRA: [A-Za-z]


^((([0-9]{1,8})|([0-9]{1,2}(\.[0-9]{3}){2})|([0-9]{1,3}\.[0-9]{3}))([ -]?)([A-Za-z]))$

regex101

# REDUX (ngRx)

Nos permite definir algo asi como un OBJETO JS GLOBAL
Objeto JS: 
{
  "nombre": "Juan",
  "edad": 30,
  "ciudad": "Madrid"
}
Dicho de otra forma, me permite definir una serie de variables globales: nombre, edad y ciudad
Esas variables están disponibles a lo largo de toda la aplicación

La forma que m ofrece redux de gestionar esas "variables globales es extremadamente potente"


                   ESTADO GLOBAL (variables globales)
                   Están compartimentadas, las tenemos en grupos:
                   - informacionDelUsuarioActual
                   - expedienteActual
                   - configuracionDeLaAplicacion
                   - erroresQueSeHanProducido
                   - notificaciones

El tema es que nadie puede editar esas variables.
Lo único que podemos haces es:
- Subscribirnos a los cambios de esas variables
- Solicitar la ejecución de acciones (que cambien esas variables)


      Acciones       Reductor(por carpeta)         ESTADO GLOBAL
      accion1           Ejecuta las acciones         carpeta1:      <<------- Podemos subscribirnos a las carpetas/datos
      accion2           provocando cambios en           dato1:       
                        el estado global                dato2: 

      ^^^^
    Solicito que se ejecute una accion