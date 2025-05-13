import { createReducer, on } from "@ngrx/store";
import { MensajesInitialState, MensajesState } from "./mensajes.state";
import { nuevoMensaje, borrarMensaje, borrarHistoricoDeMensajes as borrarTodoLoRelativoAMensajes, recuperarUltimoMensaje } from "./mensajes.actions";

export const mensajesReducer = createReducer(
    // Estado inicial
    MensajesInitialState,
    // El trámite de cada acción que he definido
    on(nuevoMensaje,  (state: MensajesState, { mensaje }) => {
        // Estas funciones reciben el estado que hay ahora mismo (las variables de esta carpeta/grupo (mensajes) y sus valores actuales = state
        // Debemos devolver UN NUEVO STATE con los valores que me interesen reasignados
        // REDUX obliga a que el estado sea inmutable, por lo que no puedo modificar el state directamente
        return {
            ...state, // Copio el estado actual
            mensajeActual: mensaje, // Y sobreescribo los datos que me interesen
            historicoDeMensajes: [...state.historicoDeMensajes, mensaje] // Y añado el nuevo mensaje al histórico
        } as MensajesState;
    }),
    on(borrarMensaje, (state: MensajesState             ) => {
        return {
            ...state,
            mensajeActual: ''
        } as MensajesState;
    }),
    on(borrarTodoLoRelativoAMensajes, (state: MensajesState) => {
        return {
            ...state,
            historicoDeMensajes: [],
            mensajeActual: ''
        } as MensajesState;
    }),
    on(recuperarUltimoMensaje, (state: MensajesState) => {
        let ultimoMensaje ='';
        if(state.historicoDeMensajes.length > 0) {
            ultimoMensaje = state.historicoDeMensajes[state.historicoDeMensajes.length - 1];
        }
        return {
            ...state,
            mensajeActual: ultimoMensaje
        } as MensajesState;
    })
);