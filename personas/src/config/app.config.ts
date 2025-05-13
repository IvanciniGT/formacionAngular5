import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePersonasService } from '../services/personas/personas.service.impl';
import { provideHttpClient } from '@angular/common/http';
import { providePersonasMapper } from '../services/personas/mappers/personas.mapper.impl';
import { provideState, provideStore } from '@ngrx/store';
import { mensajesReducer } from '../state/mensajes/mensajes.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    providePersonasService,
    providePersonasMapper,
    provideHttpClient(),
    provideStore(), // Activamos redux
    provideState({name: 'mensajes', reducer: mensajesReducer}), // configuramos cada carpeta/grupo en el estado global
  ],
};
