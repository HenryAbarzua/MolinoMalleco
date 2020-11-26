import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerI} from '../../models/costumer.interface';

export interface CustomerID extends CustomerI{id: string;}
@Injectable({
    providedIn: 'root'
  })
  export class CustomerService {
    private customerCollection: AngularFirestoreCollection<CustomerI>;
    costumers: Observable<CustomerID[]>;

    constructor(private readonly afs: AngularFirestore) {
        this.customerCollection = afs.collection<CustomerI>('costumers');
        this.costumers = this.customerCollection.snapshotChanges().pipe(
            map( actions => actions.map(a => {
                const data = a.payload.doc.data() as CustomerI;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }



    getAllCustomers(){
        return this.costumers;
    }
}