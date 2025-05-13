import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

const LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE"; // 23 letras
const PATRON_DNI = "^\\s*((([0-9]{1,8})|([0-9]{1,2}(\\.[0-9]{3}){2})|([0-9]{1,3}\\.[0-9]{3}))([ -]?)([A-Za-z]))\\s*$";

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class FormularioComponent {

  formulario!: FormGroup;
  direcciones!: FormArray;
  
  constructor( private readonly formBuilder: FormBuilder ) { 
    this.direcciones = this.formBuilder.array([]);

    this.formulario = this.formBuilder.group({
      //campo: ['VALOR POR DEFECTO', Validaciones]
      nombre:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      apellidos:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      edad:[null, [Validators.required, Validators.min(18), Validators.max(120)] ],
      email:[null, [Validators.required, Validators.email] ],
      conduce:[null, [Validators.required] ],
      vehiculo:[null ],
      dni:[null, [Validators.pattern(PATRON_DNI)], FormularioComponent.dniValido],
      direcciones: this.direcciones
    });
  }

  agregarDireccion(){
    const nuevaDireccion = this.formBuilder.group({
      calle: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      numero: [null, [Validators.required, Validators.min(1), Validators.max(9999)] ],
      piso: [null],
      puerta: [null],
      cp: [null, [Validators.required, Validators.pattern("^[0-9]{5}$")]],
      poblacion: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
    });
    this.direcciones.push(nuevaDireccion);
  }

  eliminarDireccion(indice:number){
    this.direcciones.removeAt(indice);
  }


  enviarFormulario(){
    const datosParaEnviar = {...this.formulario.value, dni: FormularioComponent.normalizarDNI(this.formulario.value.dni)};
    console.log("Enviando formulario", datosParaEnviar);
  }

  static dniValido(campoDeFormularioConDNI: AbstractControl): Observable<ValidationErrors | null> {
    const valorActualDelDNI = campoDeFormularioConDNI.value;
    const valido = FormularioComponent.validarDNI(valorActualDelDNI);
    if(valido) return of(null);
    else return of({dniInvalido: true});
  }

  static validarDNI(dni:string):boolean {
    try{
      const dniNormalizado = FormularioComponent.normalizarDNI(dni);
      const letraSuministrada = dniNormalizado.charAt(dniNormalizado.length - 1).toUpperCase();
      const parteNumericaComoTexto = dniNormalizado.substring(0, dniNormalizado.length - 1);
      const numeroSuministrado = parseInt(parteNumericaComoTexto);
      const resto = numeroSuministrado % 23;
      const letraCalculada = LETRAS_DNI.charAt(resto);
      return letraSuministrada === letraCalculada;
    }catch(e){
      return false;
    }
  }

  static normalizarDNI(dni:string):string {
    if(!dni || !dni.match(PATRON_DNI)) return dni;
    return dni.trim().replaceAll(".","").replace("-","").replace(" ","").toUpperCase();
  }

}
