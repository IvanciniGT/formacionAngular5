

import { Component, Input, OnInit } from '@angular/core';
import { SignificadosDeUnaPalabra } from '../../models/significados.model';
import { PalabrasService } from '../../services/palabras/palabras.service'; 
import { first, Observable, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mostrar-palabra',
  templateUrl: './mostrar-palabra.component.html',
  styleUrl: './mostrar-palabra.component.css',
  imports: [CommonModule], // Dentro de este modulo se declaran entre otras cosas las directivas ngIf, ngFor y varios pipes (entre ellos el async)
  standalone: true, 
})
export class MostrarPalabraComponent implements OnInit {
  
  @Input()
  palabra?:string = undefined;

  significadosDeLaPalabra$!: Observable<SignificadosDeUnaPalabra|undefined>; // ! aunque no estoy inicializando la variable, 
  // No te preocupes Angular, que cuando vaya a pedir el valor de esta variable, ya la habré inicializado.

  constructor(private readonly servicioPalabras: PalabrasService) { }

  ngOnInit() {
    // Vamos a forzar a que el observable tenga un valor inicial "undefined" aunque el backend aun no haya respondido.
    
    this.significadosDeLaPalabra$ = this.servicioPalabras.getSignificados(this.palabra).pipe(startWith(undefined));
    // Para probar antes de recibir el valor     .pipe(first());

    //this.servicioPalabras.getSignificados(this.palabra).then(significados => this.significadosDeLaPalabra = significados);

  }

}
