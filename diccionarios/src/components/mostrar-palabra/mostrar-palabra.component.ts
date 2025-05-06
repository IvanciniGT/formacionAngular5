

import { Component, Input, OnInit } from '@angular/core';
import { SignificadosDeUnaPalabra } from '../../models/significados.model';
import { PalabrasService } from '../../services/palabras/palabras.service'; 

@Component({
  selector: 'mostrar-palabra',
  templateUrl: './mostrar-palabra.component.html',
  styleUrl: './mostrar-palabra.component.css',
  standalone: true, 
})
export class MostrarPalabraComponent implements OnInit {
  
  @Input()
  palabra?:string = undefined;

  significados: SignificadosDeUnaPalabra | undefined = undefined; // Igual que poner el ?

  constructor(private readonly servicioPalabras: PalabrasService) { }

  ngOnInit() {
    this.significados = this.servicioPalabras.getSignificados(this.palabra);
  }

}
