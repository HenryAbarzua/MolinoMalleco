import { Component, OnInit,Inject,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../Product';
import { ProductService } from '../../product.service';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() product: Product;

  constructor(private productService: ProductService,
    public dialog: MatDialogRef<ConfirmationDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public mensaje: string) 
    { }

    cerrarDialogo(): void {
      this.dialog.close(false);
    }
    confirmado(): void {
      
      this.dialog.close(true);
      
    }
    

  ngOnInit() {
  }

}