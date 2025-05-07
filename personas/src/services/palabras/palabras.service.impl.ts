
// Angular, si alguien te pide un PalabrasServiceImple, dale una instancia de este objeto UNICA.

import { Injectable } from "@angular/core";
import { SignificadosDeUnaPalabra } from "../../models/significados.model";
import { PalabrasService } from "./palabras.service";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { SignificadosDeUnaPalabraBackend } from "./models/significados.model";
import { SignificadosMapper } from "./mappers/significados.mapper";

// Dicho de otra forma, trata esta clase como si fuera un SINGLETON
@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class PalabrasServiceImpl implements PalabrasService {

    private readonly url = 'http://localhost:3000/palabra/';

    constructor(private readonly clienteHttp: HttpClient, private readonly significadorMapper: SignificadosMapper){}
/*
    // OPCION 1. API fetch standard de JS
    async getSignificados(palabra?: string): Promise<SignificadosDeUnaPalabra> {
        const promesa = new Promise<SignificadosDeUnaPalabra>( (resolve, reject) => {
            fetch(this.url+palabra) // Que se haga la petición GET a nuestro backend
                .then( respuesta => respuesta.json()) // Cuando reciba respuesta que cargue el BODY de la respuesta HTTP como json
                .then( json => resolve(json as SignificadosDeUnaPalabra)) // Que cuando acabe de leer ese body y 
                                                                          // convertirlo a un objeto JS lo devuelva 
                                                                          // Como el objeto SignificadosDeUnaPalabra
                .catch( error => reject(error));    // Si hay un error, rechazamos la promesa (la incumplimos)
        });
        return promesa;
    }   
*/
    // OPCION 2. API fetch de Angular
    getSignificados(palabra?: string): Observable<SignificadosDeUnaPalabra> {
        return this.clienteHttp.get<SignificadosDeUnaPalabraBackend>(this.url + palabra)
                               .pipe(
                                      // Aquí transformamos el objeto SignificadosDeUnaPalabraBackend a SignificadosDeUnaPalabra
                                      // En este caso, como son iguales, no es necesario hacer nada.
                                      // Si fueran diferentes, habría que hacer un map y transformar el objeto.
                                      map( (significado) => this.significadorMapper.significadosBackend2significadosFrontal(significado) as SignificadosDeUnaPalabra)
                               );
    }
}

export const providePalabrasService = {
    provide: PalabrasService,
    useClass: PalabrasServiceImpl
};