import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../service/customers.service';
import {MAT_DIALOG_DATA,MatDialogRef,MatDialog,} from "@angular/material/dialog";

@Component({
  selector: 'app-form-proveedores',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponentProveedores implements OnInit {

  constructor(
    public proveedores: CustomersService,
    private dialogRef: MatDialogRef<FormComponentProveedores>
  ) { }

  ngOnInit(): void {
  }

  onSaveForm() {
    if (this.proveedores.selected.id == null) {
      let newProducts = {
        nombre: this.proveedores.selected.nombre,
        cantidad: this.proveedores.selected.cantidad,
        ciudad: this.proveedores.selected.ciudad,
        tipoProducto: this.proveedores.selected.tipoProducto,
        region: this.proveedores.selected.region,
      };
      this.proveedores.addProveedores(newProducts);
    } else {
      this.proveedores.editProveedores(this.proveedores.selected);
    }
    this.close();
  }
  close(): void {
    this.dialogRef.close();
  }
}
