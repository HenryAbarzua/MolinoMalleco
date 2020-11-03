import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';
import { MatDialog } from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: Product;

  constructor(private productService: ProductService, public dialog:MatDialog) { }

  ShowDialog(): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Esta Seguro que desea Borrar este Producto?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.deleteCustomer();
          alert("Producto Eliminado");
        } else {
         
        }
      });
  }
  ngOnInit(): void {
  }

  updateActivie(isActive: boolean){
      this.productService
      .updateProduct(this.product.key, {active: isActive})
      .catch(err => console.log(err));
  }
  deleteCustomer(){
    this.productService
      .deleteProduct(this.product.key)
      .catch(err => console.log(err));
  }
}
