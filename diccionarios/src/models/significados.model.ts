/*
export interface Significado {
    definicion: string;
    ejemplo: string;
    modificadores?: string[];
}

export interface SignificadosDeUnaPalabra {
    significados: Array<Significado>;
}
*/

export interface SignificadosDeUnaPalabra {
    significados: Array<{
        definicion: string;
        ejemplo: string;
        modificadores?: string[];
    }>;
}

/*
const datos = {
    "id": "perro",
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
 } as SignificadosDeUnaPalabra;
 // En JS y TS se aplica el concepto de DUCK TYPING.
 // Si camina como pato, grazna como pato y tiene plumas como pato, para mi, a todos efectos es un pato.
 */