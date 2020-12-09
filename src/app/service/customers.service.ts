import { Injectable } from '@angular/core'
import { snapshotChanges } from '@angular/fire/database'
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import {Observable} from 'rxjs'
import { Action } from 'rxjs/internal/scheduler/Action'
import {map} from 'rxjs/operators'
import { CustomerI}from '../models/customers.interface'

export interface CustomerID extends CustomerI{
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
 private customerCollection: AngularFirestoreCollection<CustomerI>
 customers: Observable<CustomerID[]>
 public selected = {
  id: null,
  nombre: "",
  region: "",
  ciudad: "",
  tipoProducto: "",
  cantidad: 0,
};
  constructor(private readonly db:AngularFirestore) { 
this.customerCollection = db.collection<CustomerI>('proveedores');
this.customers = this.customerCollection.snapshotChanges().pipe(
  map(actions => actions.map(
    a =>{
      const data = a.payload.doc.data() as CustomerI;
      const cantidad = a.payload.doc.data().cantidad;
      const id = a.payload.doc.id;
      return {id, cantidad, ...data};
    }
  ))
);
}
  getAllProveedores(){
    return this.customers; 
  }
  
  getCantidad(){
    return this.db.collection('customers').doc('cantidad')
  }
  editProveedores(proveedores: CustomerID) {
    return this.customerCollection.doc(proveedores.id).update(proveedores);
  }
  deleteProveedores(id: string) {
    return this.customerCollection.doc(id).delete();
  }
  addProveedores(proveedores: CustomerI) {
    return this.customerCollection.add(proveedores);
  }

}
