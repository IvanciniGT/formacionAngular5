
// Angular, si alguien te pide un PalabrasServiceImple, dale una instancia de este objeto UNICA.

import { Injectable } from "@angular/core";
import { SignificadosDeUnaPalabra } from "../../models/significados.model";
import { PalabrasService } from "./palabras.service";

// Dicho de otra forma, trata esta clase como si fuera un SINGLETON
@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class PalabrasServiceImpl implements PalabrasService {
    getSignificados(palabra?: string): SignificadosDeUnaPalabra | undefined {
        // TODO
        return undefined;
    }
}

export const providePalabrasService = {
    provide: PalabrasService,
    useClass: PalabrasServiceImpl
};