import { DatosPersona } from "../../../models/persona.model";
import { DatosPersonaSegunElBackend } from "../models/persona.model";

export abstract class PersonasMapper{
    abstract personaBackend2persona(personaBackend: DatosPersonaSegunElBackend): DatosPersona;
}