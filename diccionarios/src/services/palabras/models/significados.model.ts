
export interface SignificadosDeUnaPalabraBackend {
    significados: Array<{
        definicion: string;
        ejemplos: string[];
        modificadores?: string[];
    }>;
}