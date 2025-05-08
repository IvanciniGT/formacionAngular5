import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePersonasService } from '../services/personas/personas.service.impl';
import { provideHttpClient } from '@angular/common/http';
import { providePersonasMapper } from '../services/personas/mappers/personas.mapper.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    providePersonasService,
    providePersonasMapper,
    provideHttpClient(),
  ],
};
