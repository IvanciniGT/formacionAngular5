
// Angular, si alguien te pide un PersonasServiceImple, dale una instancia de este objeto UNICA.

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { PersonasService } from "./personas.service";
import { PersonasMapper } from "./mappers/personas.mapper";
import { DatosPersona } from "../../models/persona.model";
import { DatosPersonaSegunElBackend } from "./models/persona.model";

// Dicho de otra forma, trata esta clase como si fuera un SINGLETON
@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class PersonasServiceImpl implements PersonasService {

    private readonly url = 'http://localhost:3000/palabra/';

    constructor(private readonly clienteHttp: HttpClient, private readonly mapper: PersonasMapper){}

    getPersona(personaId?: string): Observable<DatosPersona> {
        return this.clienteHttp.get<DatosPersonaSegunElBackend>(this.url+personaId) 
                               .pipe(
                                      map( (persona) => this.mapper.personaBackend2persona(persona) as DatosPersona)
                               );
    }
}

export const providePersonasService = {
    provide: PersonasService,
    useClass: PersonasServiceImpl
};