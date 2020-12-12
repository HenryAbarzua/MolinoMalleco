import { Component, OnInit } from '@angular/core';
import {CustomersService} from '../../../service/customers.service';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-form-agregar-proveedor',
  templateUrl: './form-agregar-proveedor.component.html',
  styleUrls: ['./form-agregar-proveedor.component.scss']
})
export class FormAgregarProveedorComponent implements OnInit {
  cantidad: number = 0;
  constructor(
    public proveedores: CustomersService,
    private dialogRef: MatDialogRef<FormAgregarProveedorComponent>
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
      let num = parseInt(this.proveedores.selected.cantidad.toString()) + this.cantidad
      this.proveedores.selected.cantidad = num
      this.proveedores.editProveedores(this.proveedores.selected);
    }
    this.close();
  }
  close(): void {
    this.dialogRef.close();
  }
}
