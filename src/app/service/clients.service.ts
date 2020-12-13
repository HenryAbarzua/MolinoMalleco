import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ClientsI } from "../models/clients.interface";

export interface ClientsID extends ClientsI {
  id: string;
}

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  private clientsCollection: AngularFirestoreCollection<ClientsI>;
  clients: Observable<ClientsID[]>;
  public selected = {
    id: null,
    nombreEmpresa: '',
    rutEmpresa:'',
    nombreTitular:'',
    region:'',
    ciudad:'',
    tipoRubro:''
    
  };

  constructor(private readonly afs: AngularFirestore) {
    this.clientsCollection = afs.collection<ClientsI>("clients");
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as ClientsI;
          const id = a.payload.doc["id"];
          return { id, ...data };
        })
      )
    );
  }

  getAllClients() {
    return this.clients;
  }

  editClients(clients: ClientsID) {
    return this.clientsCollection.doc(clients.id).update(clients);
  }

  deleteClients(id: string) {
    return this.clientsCollection.doc(id).delete();
  }

  addClients(clients: ClientsI) {
    return this.clientsCollection.add(clients);
  }
}
