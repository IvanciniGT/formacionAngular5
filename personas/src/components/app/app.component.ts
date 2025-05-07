import { Component } from '@angular/core';
import { PersonaComponent } from "../persona/persona.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [PersonaComponent],
})
export class AppComponent {
}
