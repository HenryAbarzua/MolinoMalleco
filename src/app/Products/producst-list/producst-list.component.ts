import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-producst-list',
  templateUrl: './producst-list.component.html',
  styleUrls: ['./producst-list.component.scss']
})
export class ProducstListComponent implements OnInit {

  products: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductList()
  }

  getProductList() {
    this.productService.getProductList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(products => {
      this.products = products;
    });
  }
 
  deleteProducts() {
    this.productService.deleteAll().catch(err => console.log(err));
  }
 
}






