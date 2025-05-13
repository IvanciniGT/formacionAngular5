import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { borrarHistoricoDeMensajes, borrarMensaje, nuevoMensaje, recuperarUltimoMensaje } from '../../state/mensajes/mensajes.actions';

@Component({
  selector: 'app-componente-escritor',
  imports: [],
  templateUrl: './componente-escritor.component.html',
  styleUrl: './componente-escritor.component.css',
  standalone: true,
})
export class ComponenteEscritorComponent {
  constructor(private readonly store: Store) {}

  borrarMensajesCompletos() {
    this.store.dispatch(borrarHistoricoDeMensajes());
  }

  borrarMensaje() {
    this.store.dispatch(borrarMensaje());
  }

  hanEscrito(mensaje: string) {
    this.store.dispatch(nuevoMensaje({mensaje}));
  }

  recuperarUltimo() {
    this.store.dispatch(recuperarUltimoMensaje());
  }

}
