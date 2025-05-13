import { Component } from '@angular/core';
import { PersonaComponent } from "../persona/persona.component";
import { DatosPersona } from '../../models/persona.model';
import { ListadoPersonasComponent } from "../listado-personas/listado-personas.component";
import { FormularioComponent } from "../formulario/formulario.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [PersonaComponent, ListadoPersonasComponent, FormularioComponent],
})
export class AppComponent {

  revisoresDelExpediente: DatosPersona[];

  constructor(){
    // En la realidad, tendría otro componente que hiciera una llamada a un BACKEND ESPECIFICO de la app que esté montando para traer estos datos.
    this.revisoresDelExpediente = [
      {
          "id": "1",
          "nombre": "Menchu",
          "foto": "https://media.gettyimages.com/id/2153366177/es/foto/guatemalan-nobel-peace-prize-laureate-rigoberta-menchu-gestures-during-the-xix-meeting-of.jpg?s=2048x2048&w=gi&k=20&c=PgTWUFnIy68kq8-fQQW1OZNizbES-OSoVmKBnNu93sA=",
          "telefono": "666 666 666",
          "email": "menchu@example.com"
      },
      {
          "id": "2",
          "nombre": "Javier",
          "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxIvPX4QM3R_jz0BLZ8tikBYkoVJ5hCD9jmQ&s'",
          "telefono": "666 666 666",
          "email": "javier@example.com"
      },
      {
          "id": "3",
          "nombre": "Federico",
          "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxIvPX4QM3R_jz0BLZ8tikBYkoVJ5hCD9jmQ&s'",
          "telefono": "666 666 666",  
          "email": "federico@example.com"
      }   
  ];
  }

  hanDeseleccionadoAAlguien($event: DatosPersona) {
    //console.log('Desmarcado', $event);
  }
  hanSeleccionaAAlguien($event: DatosPersona) {
    //console.log('Marcado', $event);
  }
}
