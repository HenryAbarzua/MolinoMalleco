import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Client } from './Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private dbPath = '/Clientes';
  clientRef: AngularFireList<Client> = null;
  

  constructor(private db: AngularFireDatabase) { 
    this.clientRef = db.list(this.dbPath);

  }
  createClient(client: Client)
  {
    
      this.clientRef.push(client);
  }
 
  async updateClient(key: string, value: any): Promise<void> {
    try{
      return this.clientRef.update(key, value);}
    catch(error){
      console.log(error);
    }
    
  }
 
  async deleteClient(key: string): Promise<void> {
    try{ return this.clientRef.remove(key);}
    catch(error){
      console.log(error);
    }
   
  }
 
  getClientList(): AngularFireList<Client> {
    return this.clientRef;
  }
 
  deleteAll(): Promise<void> {
  
      return this.clientRef.remove();

    
    }
   
  }


