

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersona } from '../../models/persona.model';
export type Modo = 'compacto'|'extensible'|'extendido';

@Component({
  selector: 'listado-personas',
  templateUrl: './listado-personas.component.html',
  styleUrl: './listado-personas.component.css',
  imports: [CommonModule], // Dentro de este modulo se declaran entre otras cosas las directivas ngIf, ngFor y varios pipes (entre ellos el async)
  standalone: true, 
})
export class ListadoPersonasComponent implements OnInit {
  
  readonly ESTADOS = { 
    NINGUNO_SELECCIONADO: 1,
    ALGUNOS_SELECCIONADOS: 2,
    TODOS_SELECCIONADOS: 3,
  }

  @Input() seleccionable = false;
  @Input() buscador: boolean = false;
  @Input() personas!: DatosPersona[];
  personasAMostrar!: DatosPersona[];
  personasSeleccionadas: DatosPersona[] = [];
  filtroActivo!: string;
  estadoActual: number = this.ESTADOS.NINGUNO_SELECCIONADO;

  constructor() { }

  ngOnInit() {
    this.determinarLasPersonasAMostrar(''); // Es decir, rellenar la variable personasAMostrar
  }

  // Cada vez que se escriba una letra en el formulario del buscador, llamaremos a una función:
  determinarLasPersonasAMostrar(nuevoFiltro:string){
    this.filtroActivo = nuevoFiltro;
    // TODO: Copiamos del array personas al array personasAMostrar, las personas que cumplan con el filtro
  }

  nuevaPersonaSeleccionada(persona: DatosPersona){ 
    this.asegurarSeleccionabilidad();
    // TODO: Añadir la persona al array de seleccionadas si es que no lo está ya
    this.establecerEstadoDeSeleccion();
  }

  nuevaPersonaDeseleccionada(persona: DatosPersona){ 
    this.asegurarSeleccionabilidad();
    // TODO: Eliminar la persona del array de seleccionadas si es que está allí
    this.establecerEstadoDeSeleccion();
  }

  seleccionarTodasLasPersonas(){
    this.asegurarSeleccionabilidad();
    this.personasSeleccionadas = this.personasAMostrar;
    this.establecerEstadoDeSeleccion();
  }

  deseleccionarTodasLasPersonas(){
    this.asegurarSeleccionabilidad();
    this.personasSeleccionadas = [];
    this.establecerEstadoDeSeleccion();
  }

  asegurarSeleccionabilidad(){
    if(!this.seleccionable){
      throw new Error('El componente no es seleccionable');
    }
  }

  establecerEstadoDeSeleccion(){
    switch (this.personasSeleccionadas.length) {
      case 0:
        this.estadoActual = this.ESTADOS.NINGUNO_SELECCIONADO;
        break;
      case this.personasAMostrar.length:
        this.estadoActual = this.ESTADOS.TODOS_SELECCIONADOS;
        break;
      default:
        this.estadoActual = this.ESTADOS.ALGUNOS_SELECCIONADOS;
    }
  }

}
