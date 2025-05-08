import { Injectable } from "@angular/core";
import { PersonasMapper } from "./personas.mapper";
import { DatosPersonaSegunElBackend } from "../models/persona.model";
import { DatosPersona } from "../../../models/persona.model";

@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
class PersonasMapperV1Impl extends PersonasMapper {
    personaBackend2persona(datosPersona: DatosPersonaSegunElBackend): DatosPersona {
        return datosPersona;
    }
}

export const providePersonasMapper = {
    provide: PersonasMapper,
    useClass: PersonasMapperV1Impl
};
