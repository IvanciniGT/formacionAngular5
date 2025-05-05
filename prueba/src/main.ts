import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './config/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  // Lo que hace esto es pedirle a angular que explique al navegador
  // cómo debe procesar la marca <federico></federico>
  // Una vez explicado esto, el navegador será capaz de renderizar
  // esa marca... y veremos en pantalla:
  // <h1>Mi primer componente FEDERICO!!!</h1>, en color ROJO !
