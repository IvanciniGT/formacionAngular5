export interface MensajesState {
    mensajeActual: string;
    historicoDeMensajes: string[];
}

export const MensajesInitialState: MensajesState = {
    mensajeActual: 'Soy el mensaje por defecto',
    historicoDeMensajes: []
};