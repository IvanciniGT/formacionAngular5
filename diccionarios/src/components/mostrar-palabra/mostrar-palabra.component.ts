

import { Component, Input, OnInit } from '@angular/core';
import { SignificadosDeUnaPalabra } from '../../models/significados.model';
import { PalabrasService } from '../../services/palabras/palabras.service'; 
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'mostrar-palabra',
  templateUrl: './mostrar-palabra.component.html',
  styleUrl: './mostrar-palabra.component.css',
  //imports: [CommonModule], // Dentro de este modulo se declaran entre otras cosas las directivas ngIf y ngFor
  standalone: true, 
})
export class MostrarPalabraComponent implements OnInit {
  
  @Input()
  palabra?:string = undefined;

  significadosDeLaPalabra: SignificadosDeUnaPalabra | undefined = undefined; // Igual que poner el ?

  constructor(private readonly servicioPalabras: PalabrasService) { }

  ngOnInit() {
    this.servicioPalabras.getSignificados(this.palabra).then( 
      (significados) => this.significadosDeLaPalabra = significados 
    );
  }

}
