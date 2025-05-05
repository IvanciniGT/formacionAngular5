import { Component } from '@angular/core';
import { MostrarPalabraComponent } from "../mostrar-palabra/mostrar-palabra.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [MostrarPalabraComponent],
})
export class AppComponent {
}
