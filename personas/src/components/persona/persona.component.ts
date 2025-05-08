

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersona, esPersonaId, PersonaId } from '../../models/persona.model';
import { ESTADOS, Transicion, TRANSICIONES } from './persona.state.component';
import { PersonasService } from '../../services/personas/personas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'persona',
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css',
  imports: [CommonModule], // Dentro de este modulo se declaran entre otras cosas las directivas ngIf, ngFor y varios pipes (entre ellos el async)
  standalone: true, 
})
export class PersonaComponent implements OnInit, OnDestroy {
  
  readonly ESTADOS = ESTADOS; // Para poder usarlo en el HTML

  subscripcionCargaDatos?: Subscription;

  estado: number = ESTADOS.INICIACION;
  @Input() datos!: DatosPersona|PersonaId;
  @Input() datosPersona!: DatosPersona;

  constructor(private readonly servicioPersonas: PersonasService) { }

  ngOnInit() {
    this.intentarEjecutar(TRANSICIONES.MOSTRAR_DATOS_SUMINISTRADOS) || this.ejecutar(TRANSICIONES.CARGAR_DATOS);
  }

  ngOnDestroy() {
      this.subscripcionCargaDatos?.unsubscribe();
  }

  private intentarEjecutar(transicion: Transicion):boolean {
    return this.ejecutar(transicion, false);
  }

  private ejecutar(transicion: Transicion, generarErrorSiNoEsPosible: boolean = true):boolean {
    try{
      const estoyEnUnEstadoCompatibleConLaTransicion = this.estado === transicion.from;
      this.comprobarGuarda(estoyEnUnEstadoCompatibleConLaTransicion, "Estado de origen no válido");

      switch (transicion) {
          case TRANSICIONES.CARGAR_DATOS:
            const tenemosElIdDeLaPersona = this.datos !== undefined && esPersonaId(this.datos);
            this.comprobarGuarda( tenemosElIdDeLaPersona, "No se puede cargar los datos, ya que no tenemos el ID de la persona");
            this.cargarDatos();
            break;

          case TRANSICIONES.MOSTRAR_DATOS_SUMINISTRADOS:
            const tenemosLosDatosDeLaPersona = this.datos !== undefined && !esPersonaId(this.datos);
            this.comprobarGuarda( tenemosLosDatosDeLaPersona, "No se puede mostrar los datos, ya que no tenemos los datos de la persona");
            this.datosPersona=this.datos as DatosPersona;
            break;
      }
  
      this.estado = transicion.to;
      return true;
    } catch (error) {
        if(generarErrorSiNoEsPosible) 
            console.error(error, this.estado, transicion);
        return false;
    }
  }

  private comprobarGuarda( guarda: boolean, mensajeError: string = 'Transición no válida'){
    if(!guarda ) throw Error(mensajeError);
  }

  private cargarDatos() {
    this.subscripcionCargaDatos = this.servicioPersonas.getPersona(this.datos as PersonaId).subscribe({
      next: (datosPersona: DatosPersona) => { 
        this.datosPersona = datosPersona;
      },
      error: (error) => {
        // Error 400 ---> No se encuentra la persona (REINTENTO? NO)
        // Error 500 ---> Error en el servidor (REINTENTO? SI)
        this.ejecutar(TRANSICIONES.MARCAR_ERROR_EN_CARGA);
      },
      complete: () => {
        this.ejecutar(TRANSICIONES.MOSTRAR_DATOS_CARGADOS);
      }
    });
  }

  private guardarDatos() {
  }

}
