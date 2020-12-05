import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(public products: ProductsService) { }

  ngOnInit(): void {
  }

  onSaveForm(){
    this.products.editProducts(this.products.selected);
  }
}
