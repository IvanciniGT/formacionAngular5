

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


// Definir un tipo especial para el ID de la persona
export type PersonaId = string;

export interface DatosPersona {
  id: PersonaId;
  nombre: string;
  email: string;
  telefono: string;
}


@Component({
  selector: 'persona',
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css',
  imports: [CommonModule], // Dentro de este modulo se declaran entre otras cosas las directivas ngIf, ngFor y varios pipes (entre ellos el async)
  standalone: true, 
})
export class PersonaComponent implements OnInit {
  

  readonly ESTADOS ={ // Para los estados siempre usamos sustantivos (si no encontramos el adecuado: PARTICIPIO / GERUNDIO)
    INICIACION: 1,
    EN_ESPERA_DE_DATOS: 2,
    ERROR_CARGA_DATOS: 3,
    DESELECCIONADO: 4,
    SELECCIONADO: 5,
    EN_EDICION: 6,
    EN_ESPERA_DE_GUARDADO: 7,
    ERROR_GUARDADO: 8
  }

  readonly TRANSICIONES = { // INFINITIVOS (indican una accion)
    MOSTRAR_DATOS_SUMINISTRADOS: {
      from: this.ESTADOS.INICIACION,
      to: this.ESTADOS.DESELECCIONADO,
    },
    CARGAR_DATOS: {
      from: this.ESTADOS.INICIACION,
      to: this.ESTADOS.EN_ESPERA_DE_DATOS,
    },
    MARCAR_ERROR_EN_CARGA: {
      from: this.ESTADOS.EN_ESPERA_DE_DATOS,
      to: this.ESTADOS.ERROR_CARGA_DATOS,
    },
    REINTENTAR_CARGA: {
      from: this.ESTADOS.ERROR_CARGA_DATOS,
      to: this.ESTADOS.EN_ESPERA_DE_DATOS,
    },
    MOSTRAR_DATOS_CARGADOS: {
      from: this.ESTADOS.EN_ESPERA_DE_DATOS,
      to: this.ESTADOS.DESELECCIONADO,
    },
    DESELECCIONAR: {
      from: this.ESTADOS.SELECCIONADO,
      to: this.ESTADOS.DESELECCIONADO,
    },
    SELECCIONAR: {
      from: this.ESTADOS.DESELECCIONADO,
      to: this.ESTADOS.SELECCIONADO,
    },
    EDITAR: {
      from: this.ESTADOS.SELECCIONADO,
      to: this.ESTADOS.EN_EDICION,
    },
    CANCELAR_EDICION: {
      from: this.ESTADOS.EN_EDICION,
      to: this.ESTADOS.SELECCIONADO,
    },
    GUARDAR: {
      from: this.ESTADOS.EN_EDICION,
      to: this.ESTADOS.EN_ESPERA_DE_GUARDADO,
    },
    MARCAR_ERROR_EN_GUARDADO: {
      from: this.ESTADOS.EN_ESPERA_DE_GUARDADO,
      to: this.ESTADOS.ERROR_GUARDADO,
    },
    REINTENTAR_GUARDADO: {
      from: this.ESTADOS.ERROR_GUARDADO,
      to: this.ESTADOS.EN_ESPERA_DE_GUARDADO,
    },
    CONFIRMAR_GUARDADO: {
      from: this.ESTADOS.EN_ESPERA_DE_GUARDADO,
      to: this.ESTADOS.SELECCIONADO,
    },
    REEDITAR_DATOS_ERRONEOS: {
      from: this.ESTADOS.ERROR_GUARDADO,
      to: this.ESTADOS.EN_EDICION,
    },
    CANCELAR_GUARDADO: {
      from: this.ESTADOS.ERROR_GUARDADO,
      to: this.ESTADOS.SELECCIONADO,
    },
  }
  

  estado: number = this.ESTADOS.INICIACION;
  @Input() datos!: DatosPersona|PersonaId;

  constructor() { }

  ngOnInit() {
    if(this.datos && typeof this.datos === 'string') { // Lo que tengo es el ID
      this.ejecutar(this.TRANSICIONES.CARGAR_DATOS);
    } else { // Es que me han pasado los datos ya.
      this.ejecutar(this.TRANSICIONES.MOSTRAR_DATOS_SUMINISTRADOS);
    }
  }

  ejecutar(transicion: { from: number,  to: number }) {
    // Voy a ver si realmente esa transición puede ejecutarse.
    if(this.estado !== transicion.from) {
      console.error('Transición no válida', this.estado, transicion);
      return;
    }
    this.estado = transicion.to;
    switch (transicion) {
        case this.TRANSICIONES.REINTENTAR_CARGA:
        case this.TRANSICIONES.CARGAR_DATOS:
          // Aqui llamo al Backend
          break;
        case this.TRANSICIONES.REINTENTAR_GUARDADO:
        case this.TRANSICIONES.GUARDAR:
          // Aqui llamo al Backend
          break;
          // llamar al backend
          break;
    }
  }

}
