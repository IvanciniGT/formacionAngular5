

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersona } from '../../models/persona.model';
import { PersonaComponent } from "../persona/persona.component";
export type Modo = 'compacto'|'extensible'|'extendido';

@Component({
  selector: 'listado-personas',
  templateUrl: './listado-personas.component.html',
  styleUrl: './listado-personas.component.css',
  imports: [CommonModule, PersonaComponent], // Dentro de este modulo se declaran entre otras cosas las directivas ngIf, ngFor y varios pipes (entre ellos el async)
  standalone: true, 
})
export class ListadoPersonasComponent implements OnInit, OnDestroy {
  
  readonly ESTADOS = { 
    NINGUNO_SELECCIONADO: 1,
    ALGUNOS_SELECCIONADOS: 2,
    TODOS_SELECCIONADOS: 3,
  }

  @Input() seleccionable = false;
  @Input() buscador = false;
  @Input() personas!: DatosPersona[];
  personasAMostrar!: DatosPersona[];
  personasSeleccionadas: DatosPersona[] = [];
  filtroActivo!: string;
  estadoActual: number = this.ESTADOS.NINGUNO_SELECCIONADO;
  filtroProgramado?: ReturnType<typeof setTimeout>;

  constructor() { }

  ngOnInit() {
    this.determinarLasPersonasAMostrar(''); // Es decir, rellenar la variable personasAMostrar
  }

  ngOnDestroy(){
    this.desprogramarFiltro();
  }

  async programarFiltro(nuevoFiltro:string){
    // Si hubiera ya un filtro programado, lo desprogramo... lo elimino
    this.desprogramarFiltro();
    this.filtroProgramado = setTimeout( () => this.determinarLasPersonasAMostrar(nuevoFiltro), 300);
  }

  private desprogramarFiltro(){
    if (this.filtroProgramado) {
      clearTimeout(this.filtroProgramado);
      this.filtroProgramado = undefined;
    }
  }

  // Cada vez que se escriba una letra en el formulario del buscador, llamaremos a una función:
  determinarLasPersonasAMostrar(nuevoFiltro:string){
    if(this.filtroActivo === nuevoFiltro.toLowerCase()) return;
    this.filtroActivo = nuevoFiltro.toLowerCase();
    if(!this.buscador && nuevoFiltro !== ''){ // BUG
      throw new Error('El buscador no está habilitado... no se puede usar esta función');
    } else if(nuevoFiltro === ''){ // No hay que aplicar nada
      this.personasAMostrar = this.personas;
    } else {
      /*
      // Lenguaje imperativo
      this.personasAMostrar = [];
      for (const persona of this.personas) {
        if (persona.nombre.toLowerCase().includes(this.filtroActivo)){
          this.personasAMostrar.push(persona);
        }
      }*/
      // Lenguaje funcional
      this.personasAMostrar = this.personas.filter(
        persona => persona.nombre.toLowerCase().includes(this.filtroActivo)
      );
    }
  }

  nuevaPersonaSeleccionada(persona: DatosPersona){ 
    this.asegurarSeleccionabilidad();
    if (!this.personasSeleccionadas.includes(persona)) {
      this.personasSeleccionadas.push(persona);
    } 
    this.establecerEstadoDeSeleccion();
  }

  nuevaPersonaDeseleccionada(persona: DatosPersona){ 
    this.asegurarSeleccionabilidad();
    const posicionEnElArrayDeSeleccionadas = this.personasSeleccionadas.indexOf(persona);
    if(posicionEnElArrayDeSeleccionadas !== -1){
      this.personasSeleccionadas.splice(posicionEnElArrayDeSeleccionadas, 1);
      this.establecerEstadoDeSeleccion();
    } 
  }

  seleccionarTodasLasPersonas(){
    this.asegurarSeleccionabilidad();
    this.personasSeleccionadas = [...this.personasAMostrar];
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
