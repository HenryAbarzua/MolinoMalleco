import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: Product;

  constructor(private productService: ProductService) { }

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
