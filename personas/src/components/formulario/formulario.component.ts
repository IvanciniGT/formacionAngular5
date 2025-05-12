import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class FormularioComponent {

  formulario!: FormGroup;
  
  constructor( private readonly formBuilder: FormBuilder ) { 
    this.formulario = this.formBuilder.group({
      //campo: ['VALOR POR DEFECTO', Validaciones]
      nombre:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      apellidos:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      edad:[null, [Validators.required, Validators.min(18), Validators.max(120)] ],
      email:[null, [Validators.required, Validators.email] ],
      conduce:[null, [Validators.required] ],
      vehiculo:[null ],
      dni:[null, [Validators.pattern("^[0-9]{1,8}[A-Za-z]$")] ],
    });
  }

  enviarFormulario(){
    console.log("Enviando formulario",this.formulario.value);
    console.log("Enviando formulario",this.formulario.get('nombre')?.value);
    console.log("Enviando formulario",this.formulario.get('apellidos')?.value);
    console.log("Enviando formulario",this.formulario.get('edad')?.value);
  }

}
