
# Programita web

Mostrar un formulario para buscar los significados de las palabras en un diccionario.

Después consultará a un backend para obtener los significado de la palabra y lo mostrará en pantalla.

    FRONTAL         --->        API REST(HTTP)       <---              BACKEND

    ---> URL: http://localhost:puerto/api/v1/palabra/{palabra}
         VERBO: GET

         Payload... que mandamos en el body? Nada
         Que recibimos en el body?
         {
            "palabra": "perro",
            "significados": [
                {
                    "definicion": "Animal de compañía cuadrúpedo",
                    "ejemplo": "El perro de Lucas se llama Toby"
                },
                {
                    "definicion": "Persona muy vaga",
                    "modificadores": ["fig"],
                    "ejemplo": "Estás hecho un perro"
                }
            ]
         }



http://localhost:puerto/api/v1/palabra/perro
                            ^^
                            MAJOR
                            vv
http://localhost:puerto/api/v2/palabra/perro

# Versionado semántico

v1.2.3

                CUANDO SE INCREMENTAN?
1 MAJOR         Cuando hay un breaking change: Cambio que no respeta retro-compatibilidad
                  -> Haber quitado cualquier cosa del api
                  + Opcionalmente Nuevas funcionalidades
                  + Opcionalmente Arreglos de bugs
                  + Opcionalmente pueden venir funcionalidades obsoletas
2 MINOR         Nueva funcionalidad
                Marcar una funcionalidad como Obsoleta (Deprecated)
                    + Opcionalmente pueden venir bugs arreglados
3 PATCH         Arreglos de bugs
