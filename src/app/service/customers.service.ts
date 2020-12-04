import { Injectable } from '@angular/core';
import { snapshotChanges } from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import {Observable} from 'rxjs'
import { Action } from 'rxjs/internal/scheduler/Action';
import {map} from 'rxjs/operators'
import { CustomerI}from '../models/customers.interface'

export interface CustomerID extends CustomerI{id: string;}

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
 private customerCollection: AngularFirestoreCollection<CustomerI>
 customers: Observable<CustomerID[]>
  constructor(private readonly afs:AngularFirestore) { 
this.customerCollection = afs.collection<CustomerI>('customers');
this.customers = this.customerCollection.snapshotChanges().pipe(
  map(actions => actions.map(
    a =>{
      const data = a.payload.doc.data() as CustomerI;
      const id = a.payload.doc['id'];
      return {id, ...data};
    }
  ))
);

  }

 

  getAllCustomers(){
    
    return this.customers;
  }
}
