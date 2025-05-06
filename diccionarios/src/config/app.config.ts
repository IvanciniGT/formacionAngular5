import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePalabrasService } from '../services/palabras/palabras.service.impl';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // Aquí le diremos a angular que cuando alguien pida un PalabrasService, que le dé una instancia de PalabrasServiceImpl
    providePalabrasService,
    provideHttpClient(),
  ],
};
