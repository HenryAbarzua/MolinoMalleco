import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../Client';
import { ClientService } from '../client.service';
import { MatDialog } from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  @Input() client: Client;

  constructor(private clientService: ClientService, public dialog:MatDialog) { }

  ShowDialog(): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Esta Seguro que desea Borrar este Cliente?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.deleteCustomer();
          alert("Cliente Eliminado");
        } else {
         
        }
      });
  }
  ngOnInit(): void {
  }

  updateActivie(isActive: boolean){
      this.clientService
      .updateClient(this.client.key, {active: isActive})
      .catch(err => console.log(err));
  }
  deleteCustomer(){
    this.clientService
      .deleteClient(this.client.key)
      .catch(err => console.log(err));
  }
}
