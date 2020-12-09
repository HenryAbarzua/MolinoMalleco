import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../../service/products.service";
import {MAT_DIALOG_DATA,MatDialogRef,MatDialog,} from "@angular/material/dialog";

@Component({
  selector: 'app-form-agregar',
  templateUrl: './form-agregar.component.html',
  styleUrls: ['./form-agregar.component.scss']
})
export class FormAgregarComponent implements OnInit {
  cantidad: number = 0;

  constructor(
    public products: ProductsService,
    private dialogRef: MatDialogRef<FormAgregarComponent>
  ) { }

  ngOnInit(): void {
  }

  onSaveForm() {
    if (this.products.selected.id == null) {
      let newProducts = {
        nombre: this.products.selected.nombre,
        cantidad: this.products.selected.cantidad,
      };
      this.products.addProducts(newProducts);
    } else {
      let num = parseInt(this.products.selected.cantidad.toString()) + this.cantidad
      this.products.selected.cantidad = num
      this.products.editProducts(this.products.selected);
    }
    this.close();
  }
  close(): void {
    this.dialogRef.close();
  }
}
