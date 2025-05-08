import { Component } from '@angular/core';
import { PersonaComponent } from "../persona/persona.component";
import { DatosPersona } from '../../models/persona.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [PersonaComponent],
})
export class AppComponent {

  hanDeseleccionadoAAlguien($event: DatosPersona) {
    console.log('Desmarcado', $event);
  }
  hanSeleccionaAAlguien($event: DatosPersona) {
    console.log('Marcado', $event);
  }
}
