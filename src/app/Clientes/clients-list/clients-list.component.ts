import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  clients: any;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClientList()
  }
  
  getClientList() {
    this.clientService.getClientList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(clients => {
      this.clients = clients;
    });
  }
 
  deleteClients() {
    this.clientService.deleteAll().catch(err => console.log(err));
  }
 
}






