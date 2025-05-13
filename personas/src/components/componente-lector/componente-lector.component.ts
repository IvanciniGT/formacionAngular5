import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMensajeActual } from '../../state/mensajes/mensajes.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componente-lector',
  imports: [CommonModule],
  templateUrl: './componente-lector.component.html',
  styleUrl: './componente-lector.component.css',
  standalone: true,

})
export class ComponenteLectorComponent {

  mensaje$?: Observable<string>;

  constructor(private readonly store: Store) {
    this.mensaje$ = this.store.select(selectMensajeActual);
  }
}
