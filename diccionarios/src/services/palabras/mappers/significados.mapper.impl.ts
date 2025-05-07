import { Injectable } from "@angular/core";
import { SignificadosDeUnaPalabra } from "../../../models/significados.model";
import { SignificadosDeUnaPalabraBackend } from "../models/significados.model";
import { SignificadosMapper } from "./significados.mapper";
@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
class SignificadosMapperV1Impl implements SignificadosMapper {
    significadosBackend2significadosFrontal(significadosBackend: SignificadosDeUnaPalabraBackend): SignificadosDeUnaPalabra {
        return {
            significados: significadosBackend.significados.map( 

                (significado: {
                    definicion: string,
                    modificadores?: string[],
                    ejemplos: string[]
                })  =>
                    ({
                        definicion: significado.definicion,
                        modificadores: significado.modificadores,
                        ejemplo: significado.ejemplos.join(". ")
                    })
            )
        };
    }
}

export const provideSignificadorMapper = {
    provide: SignificadosMapper,
    useClass: SignificadosMapperV1Impl
};

/*
    significados: Array<{
        definicion: string;
        ejemplos: string[];
        modificadores?: string[];
    }>;
    
{
    "id": "melón",
    "significados": [
        {
            "definicion": "Fruta dulce y jugosa del melonero",
            "ejemplos": ["Me encanta comer melón en verano","sakljhasdkjhadskjlh"]
        },
        {
            "definicion": "Persona con pocas luces",
            "modificadores": ["fig"],
            "ejemplos": ["Eres un melón, no te enteras de nada"]
        }
    ]
}
    vvvvvvvvv
{
    "significados": [
        {
            "definicion": "Fruta dulce y jugosa del melonero",
            "ejemplo": "Me encanta comer melón en verano. sakljhasdkjhadskjlh"
        },
        {
            "definicion": "Persona con pocas luces",
            "modificadores": ["fig"],
            "ejemplo": "Eres un melón, no te enteras de nada"
        }
    ]
}


    
    */