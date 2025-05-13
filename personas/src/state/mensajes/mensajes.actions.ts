import { createAction, props } from "@ngrx/store";


export const nuevoMensaje = createAction('[Mensajes] Nuevo Mensaje', props<{ mensaje: string }>());

export const borrarMensaje = createAction('[Mensajes] Borrar Mensaje');

export const borrarHistoricoDeMensajes = createAction('[Mensajes] Borrar Historico de Mensajes');

export const recuperarUltimoMensaje = createAction('[Mensajes] Recuperar Ultimo Mensaje');