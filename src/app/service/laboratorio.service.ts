import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LaboratorioI} from '../models/laboratorio.interface'
import {map} from 'rxjs/operators'

export interface laboratorioID extends LaboratorioI{
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {

  private laboratorioCollection: AngularFirestoreCollection<LaboratorioI>
  laboratorio: Observable<laboratorioID[]>
  public selected ={
    id: null,
    glutenHumedo: 0,
    glutenIndex: 0,
    granosBrotados:0,
    granosDanados:0,
    granosPartidos:0,
    granosPuntaNegra:0,
    humedad:0,
    impurezas:0,
    indiceCaida:0,
    nombreAnalista:"",
    nombreResponsable:"",
    numMuestra:0,
    pesoGrano:0,
    pesoHelectolitro:0,
    valorSedimento:0
    
    
  };
 
  constructor(private readonly db:AngularFirestore) { 
    this.laboratorioCollection = db.collection<LaboratorioI>('laboratorio');
    this.laboratorio = this.laboratorioCollection.snapshotChanges().pipe(
      map(actions => actions.map(
        a => {
          const data = a.payload.doc.data() as LaboratorioI;
          const id =a.payload.doc["id"];
          return{id, ...data};
        }
      ))
    );
  }
  getAllLaboratorio(){
    return this.laboratorio;
  }
  editLaboratorio(laboratorio: laboratorioID){
    return this.laboratorioCollection.doc(laboratorio.id).update(laboratorio);
  }
  deleteLaboratorio(id: string){
    return this.laboratorioCollection.doc(id).delete();

  }
  addLaboratorio(laboratorio: LaboratorioI){
    return this.laboratorioCollection.add(laboratorio);
  }
}
