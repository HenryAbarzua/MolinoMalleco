import { Component, AfterViewInit,ViewChild, Input, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { from } from 'rxjs';
import { Product } from '../.././Products/Product';
import { ProductService } from '../../Products/product.service';
import {CustomerI} from '../../models/customers.interface'
import { CustomersService } from 'src/app/service/customers.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})

export class ListCustomersComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'city', 'order'];
  dataSource = new MatTableDataSource();


constructor(private customerService: CustomersService){
this.downloadPDF();
}

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(res => this.dataSource.data = res);
    
  }
  public downloadPDF(): void {
    const DATA = document.getElementById('htmlData')
    const doc = new jsPDF('p', 'pt' , 'a4');
    const options ={
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas)=>{
      const img = canvas.toDataURL('image/PNG');
      const bufferX=15;
      const bufferY=15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() -2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img,'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) =>{
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
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