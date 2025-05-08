

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersona, esPersonaId, PersonaId } from '../../models/persona.model';
import { ESTADOS, Transicion, TRANSICIONES } from './persona.state.component';
import { PersonasService } from '../../services/personas/personas.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export type Modo = 'compacto'|'extensible'|'extendido';

const PERIODO_ENTRE_REINTENTOS_CARGA = 5000; // 5 segundos

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
  estaExtendido: boolean = false;
  errorEnCargaDatos?: string;
  reintentoDeCargaTimer?: ReturnType<typeof setTimeout>;

  @Input() datos!: DatosPersona|PersonaId;
  @Input() datosPersona!: DatosPersona;
  @Input() modo: Modo = 'compacto';
  @Input() extendidoInicialmente = false;
  @Input() seleccionable = false;
  @Input() seleccionadoInicialmente = false;

  @Output() seleccionado = new EventEmitter<DatosPersona>();
  @Output() deseleccionado = new EventEmitter<DatosPersona>();

  constructor(private readonly servicioPersonas: PersonasService) { }

  ngOnInit() {
    this.establecerValorInicialDelModo();
    if(this.intentarEjecutar(TRANSICIONES.MOSTRAR_DATOS_SUMINISTRADOS) ){
      this.mirarSiHayQueSeleccionarInicialmente();
    }else{
      this.ejecutar(TRANSICIONES.CARGAR_DATOS);
    }
  }

  ngOnDestroy() {
      this.desuscribirDeCargaDatos();
      clearTimeout(this.reintentoDeCargaTimer);
  }

  private desuscribirDeCargaDatos() {
    if(this.subscripcionCargaDatos){
      this.subscripcionCargaDatos.unsubscribe();
      this.subscripcionCargaDatos = undefined;
    }
  }

  private establecerValorInicialDelModo() {
    switch (this.modo) {
      case 'compacto':
        this.estaExtendido = false;
        break;
      case 'extensible':
        this.estaExtendido = this.extendidoInicialmente;
        break;
      case 'extendido':
        this.estaExtendido = true;
        break;
    }
  }

  isExtensible():boolean{
    return this.modo === 'extensible';
  }
  
  toogleModo(){
    if(!this.isExtensible()){
      console.error("No se puede cambiar el modo, ya que no es extensible");
      return;
    }
    this.estaExtendido = !this.estaExtendido;
  }

  toogleSeleccionado(){
    if(this.estado === ESTADOS.SELECCIONADO){
      this.ejecutar(TRANSICIONES.DESELECCIONAR);
    } else if(this.estado === ESTADOS.DESELECCIONADO){
      this.ejecutar(TRANSICIONES.SELECCIONAR);
    } 
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

            case TRANSICIONES.SELECCIONAR:
              this.comprobarGuarda(this.seleccionable, "No se puede seleccionar o deseleccionar, ya que no es seleccionable");
              this.seleccionado.emit(this.datosPersona);
              break;
            case TRANSICIONES.DESELECCIONAR:
              this.comprobarGuarda(this.seleccionable, "No se puede seleccionar o deseleccionar, ya que no es seleccionable");
              this.deseleccionado.emit(this.datosPersona);
              break;
            case TRANSICIONES.REINTENTAR_CARGA:
              console.log("Reintentando cargar los datos");
              this.cargarDatos();
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
    this.desuscribirDeCargaDatos(); // Debido a los potenciales reintentos
    this.subscripcionCargaDatos = this.servicioPersonas.getPersona(this.datos as PersonaId).subscribe({
      next: (datosPersona: DatosPersona) => { 
        this.datosPersona = datosPersona;
      },
      error: (error: HttpErrorResponse) => {
        this.ejecutar(TRANSICIONES.MARCAR_ERROR_EN_CARGA);
        if(error.status >= 400 && error.status < 500){ // Error 400 ---> No se encuentra la persona (REINTENTO? NO)
          this.errorEnCargaDatos = "Error con la persona solicitada. No se puede mostrar la información.";
        } else { // Error 500 ---> Error en el servidor (REINTENTO? SI)
          this.errorEnCargaDatos = "Error en el servidor, vamos a reintentarlo en unos segundos";
          this.programarReintentoCargaDatos();
        }
      },
      complete: () => {
        this.ejecutar(TRANSICIONES.MOSTRAR_DATOS_CARGADOS);
        this.mirarSiHayQueSeleccionarInicialmente();
      }
    });
  }

  private programarReintentoCargaDatos() {
    this.reintentoDeCargaTimer = setTimeout(() => {
      this.cargarDatos();
    }, PERIODO_ENTRE_REINTENTOS_CARGA);
  }

  private mirarSiHayQueSeleccionarInicialmente() {
    if(this.seleccionable && this.seleccionadoInicialmente){
      this.ejecutar(TRANSICIONES.SELECCIONAR);
    }
  }

  private guardarDatos() {
  }

}
