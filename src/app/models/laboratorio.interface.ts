import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface LaboratorioI {
    glutenHumedo: number;
    glutenIndex: number;
    granosBrotados:number;
    granosDanados:number;
    granosPartidos:number;
    granosPuntaNegra:number;
    humedad:number;
    impurezas:number;
    indiceCaida:number;
    nombreAnalista:string;
    nombreResponsable:string;
    numMuestra:number;
    pesoGrano:number;
    pesoHelectolitro:number;
    valorSedimento:number;
}