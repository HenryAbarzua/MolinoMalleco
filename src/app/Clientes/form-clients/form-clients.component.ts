import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../service/clients.service';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-form-clients',
  templateUrl: './form-clients.component.html',
  styleUrls: ['./form-clients.component.scss']
})
export class FormClientsComponent implements OnInit {

  constructor(
    public clients: ClientsService,
    private dialogRef: MatDialogRef<FormClientsComponent>
  ) { }

  ngOnInit(): void {
  }

  onSaveForm() {
    if (this.clients.selected.id == null) {
      let newProducts = {
        nombreEmpresa: this.clients.selected.nombreEmpresa,
        rutEmpresa: this.clients.selected.rutEmpresa,
        nombreTitular: this.clients.selected.nombreTitular,
        region: this.clients.selected.region,
        ciudad: this.clients.selected.ciudad,
        tipoRubro: this.clients.selected.tipoRubro
      };
      this.clients.addClients(newProducts);
    } else {
      this.clients.editClients(this.clients.selected);
    }
    this.close();
  }
  close(): void {
    this.dialogRef.close();
  }
}
