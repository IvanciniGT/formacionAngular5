

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'persona',
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css',
  imports: [CommonModule], // Dentro de este modulo se declaran entre otras cosas las directivas ngIf, ngFor y varios pipes (entre ellos el async)
  standalone: true, 
})
export class PersonaComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {

  }

}
