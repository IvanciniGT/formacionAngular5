import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MensajesState } from "./mensajes.state";

export const selectMensajesState = createFeatureSelector<MensajesState>('mensajes');

export const selectMensajeActual = createSelector(selectMensajesState, (state) => state.mensajeActual);

export const selectHistoricoDeMensajes = createSelector(selectMensajesState, (state) => state.historicoDeMensajes);


// Lo que definimos aquí es lo que me va a permitir vincular propiedades de mis componentes a las variables que tengo definidas dentro de este grupo/estado global