import { SignificadosDeUnaPalabra } from "../../../models/significados.model";
import { SignificadosDeUnaPalabraBackend } from "../models/significados.model";

export abstract class SignificadosMapper{
    abstract significadosBackend2significadosFrontal(significadosBackend: SignificadosDeUnaPalabraBackend): SignificadosDeUnaPalabra ;
}