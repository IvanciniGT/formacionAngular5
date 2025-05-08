

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersona, esPersonaId, PersonaId } from '../../models/persona.model';
import { ESTADOS, Transicion, TRANSICIONES } from './persona.state.component';

@Component({
  selector: 'persona',
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css',
  imports: [CommonModule], // Dentro de este modulo se declaran entre otras cosas las directivas ngIf, ngFor y varios pipes (entre ellos el async)
  standalone: true, 
})
export class PersonaComponent implements OnInit {
  
  readonly ESTADOS = ESTADOS; // Para poder usarlo en el HTML

  estado: number = ESTADOS.INICIACION;
  @Input() datos!: DatosPersona|PersonaId;

  constructor() { }

  ngOnInit() {
    this.intentarEjecutar(TRANSICIONES.MOSTRAR_DATOS_SUMINISTRADOS) || this.ejecutar(TRANSICIONES.CARGAR_DATOS);
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
  }

  private guardarDatos() {
  }

}
