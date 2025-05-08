// Definir un tipo especial para el ID de la persona
export type PersonaId = string;

export interface DatosPersona {
    id: PersonaId;
    nombre: string;
    email: string;
    telefono: string;
    foto: string;
  }

export function esPersonaId(dato: any): dato is PersonaId {
    return typeof dato === 'string';
}