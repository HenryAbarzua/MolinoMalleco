import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';
  productRef: AngularFireList<Product> = null;
  

  constructor(private db: AngularFireDatabase) { 
    this.productRef = db.list(this.dbPath);

  }
  createProduct(product: Product)
  {
    
      this.productRef.push(product);
  }
 
  async updateProduct(key: string, value: any): Promise<void> {
    try{
      return this.productRef.update(key, value);}
    catch(error){
      console.log(error);
    }
    
  }
 
  async deleteProduct(key: string): Promise<void> {
    try{ return this.productRef.remove(key);}
    catch(error){
      console.log(error);
    }
   
  }
 
  getProductList(): AngularFireList<Product> {
    return this.productRef;
  }
 
  deleteAll(): Promise<void> {
  
      return this.productRef.remove();

    
    }
   
  }


