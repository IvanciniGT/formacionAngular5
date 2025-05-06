
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