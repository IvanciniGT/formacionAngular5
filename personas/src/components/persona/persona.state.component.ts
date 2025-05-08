export const ESTADOS ={ // Para los estados siempre usamos sustantivos (si no encontramos el adecuado: PARTICIPIO / GERUNDIO)
  INICIACION: 1,
  EN_ESPERA_DE_DATOS: 2,
  ERROR_CARGA_DATOS: 3,
  DESELECCIONADO: 4,
  SELECCIONADO: 5,
  EN_EDICION: 6,
  EN_ESPERA_DE_GUARDADO: 7,
  ERROR_GUARDADO: 8
}

export interface Transicion { 
  from: number,  
  to: number 
};

export const TRANSICIONES = { // INFINITIVOS (indican una acción)
    MOSTRAR_DATOS_SUMINISTRADOS: {
      from: ESTADOS.INICIACION,
      to: ESTADOS.DESELECCIONADO,
    } as Transicion,
    CARGAR_DATOS: {
      from: ESTADOS.INICIACION,
      to: ESTADOS.EN_ESPERA_DE_DATOS,
    } as Transicion,
    MARCAR_ERROR_EN_CARGA: {
      from: ESTADOS.EN_ESPERA_DE_DATOS,
      to: ESTADOS.ERROR_CARGA_DATOS,
    } as Transicion,
    REINTENTAR_CARGA: {
      from: ESTADOS.ERROR_CARGA_DATOS,
      to: ESTADOS.EN_ESPERA_DE_DATOS,
    },
    MOSTRAR_DATOS_CARGADOS: {
      from: ESTADOS.EN_ESPERA_DE_DATOS,
      to: ESTADOS.DESELECCIONADO,
    },
    DESELECCIONAR: {
      from: ESTADOS.SELECCIONADO,
      to: ESTADOS.DESELECCIONADO,
    },
    SELECCIONAR: {
      from: ESTADOS.DESELECCIONADO,
      to: ESTADOS.SELECCIONADO,
    },
    EDITAR: {
      from: ESTADOS.SELECCIONADO,
      to: ESTADOS.EN_EDICION,
    },
    CANCELAR_EDICION: {
      from: ESTADOS.EN_EDICION,
      to: ESTADOS.SELECCIONADO,
    },
    GUARDAR: {
      from: ESTADOS.EN_EDICION,
      to: ESTADOS.EN_ESPERA_DE_GUARDADO,
    },
    MARCAR_ERROR_EN_GUARDADO: {
      from: ESTADOS.EN_ESPERA_DE_GUARDADO,
      to: ESTADOS.ERROR_GUARDADO,
    },
    REINTENTAR_GUARDADO: {
      from: ESTADOS.ERROR_GUARDADO,
      to: ESTADOS.EN_ESPERA_DE_GUARDADO,
    },
    CONFIRMAR_GUARDADO: {
      from: ESTADOS.EN_ESPERA_DE_GUARDADO,
      to: ESTADOS.SELECCIONADO,
    },
    REEDITAR_DATOS_ERRONEOS: {
      from: ESTADOS.ERROR_GUARDADO,
      to: ESTADOS.EN_EDICION,
    },
    CANCELAR_GUARDADO: {
      from: ESTADOS.ERROR_GUARDADO,
      to: ESTADOS.SELECCIONADO,
    },
  }
  
