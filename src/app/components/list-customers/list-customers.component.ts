import { Component, AfterViewInit,ViewChild, Input, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { from } from 'rxjs';
import { Product } from '../.././Products/Product';
import { ProductService } from '../../Products/product.service';
import {CustomerI} from '../../models/customers.interface'
import { CustomersService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})
export class ListCustomersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'city', 'order'];
  dataSource = new MatTableDataSource();


constructor(private customerService: CustomersService){

}
  
  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(res => this.dataSource.data = res);
    
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  
}



export class Articulo {
  constructor(private productService: ProductService) {
  }
}