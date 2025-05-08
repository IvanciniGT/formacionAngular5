import { Observable } from "rxjs";
import { DatosPersona } from "../../models/persona.model";

// Desgraciadamente, tenemos que guarrear en TS para que no nos dé error.
// Hay que montar esto de abajo como una clase abstracta, porque no se puede hacer un DI de una interfaz.
export abstract class PersonasService {
    //abstract getSignificados(palabra?: string): Promise<SignificadosDeUnaPalabra> ;
    abstract getPersona(personaId: string): Observable<DatosPersona> ;
}
