import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ProductsI }from '../models/products.interface'

export interface ProductsID extends ProductsI{id: string;}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 private productsCollection: AngularFirestoreCollection<ProductsI>
 products: Observable<ProductsID[]>
public selected = {
    id:null,
    nombre:'',
    cantidad:null
};


  constructor(private readonly afs:AngularFirestore) { 
this.productsCollection = afs.collection<ProductsI>('products');
this.products = this.productsCollection.snapshotChanges().pipe(
  map(actions => actions.map(
    a =>{
      const data = a.payload.doc.data() as ProductsI;
      const id = a.payload.doc['id'];
      return {id, ...data};
    }
  ))
);
  }

  getAllProducts(){
    return this.products;
  }

  editProducts(products:ProductsID){
    return this.productsCollection.doc(products.id).update(products);
  }

  deleteProducts(id: string){
      return this.productsCollection.doc(id).delete();
  }

  addProducts(products: ProductsI){
    return this.productsCollection.add(products);
  }

}