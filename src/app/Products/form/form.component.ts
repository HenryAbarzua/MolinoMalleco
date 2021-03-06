import { Component, OnInit, Inject } from "@angular/core";
import { ProductsService } from "../../service/products.service";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "formModal",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  isEdit = false;
  read = false;
  constructor(
    public products: ProductsService,
    private dialogRef: MatDialogRef<FormComponent>
  ) {}

  ngOnInit(): void {}

  onSaveForm() {
    if (this.products.selected.id == null) {
      let newProducts = {
        nombre: this.products.selected.nombre,
        cantidad: this.products.selected.cantidad,
      };
      this.products.addProducts(newProducts);
    } else {
      this.products.editProducts(this.products.selected);
    }
    this.close();
  }
  close(): void {
    this.dialogRef.close();
  }
}
