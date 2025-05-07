import { Observable } from "rxjs";
import { SignificadosDeUnaPalabra } from "../../models/significados.model";

// Desgraciadamente, tenemos que guarrear en TS para que no nos dé error.
// Hay que montar esto de abajo como una clase abstracta, porque no se puede hacer un DI de una interfaz.
export abstract class PalabrasService {
    //abstract getSignificados(palabra?: string): Promise<SignificadosDeUnaPalabra> ;
    abstract getSignificados(palabra?: string): Observable<SignificadosDeUnaPalabra> ;
}
