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
import {MatSort} from '@angular/material/sort';
import {ExcelService} from '../../service/ExcelService'
@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})

export class ListCustomersComponent implements OnInit {
  DATA: any[] = [];
  customers: any[] = [];
  displayedColumns: string[] = ['name', 'city', 'order','cantidad'];
  dataSource = new MatTableDataSource();
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

constructor(private customerService: CustomersService,
                 private ExcelService: ExcelService){
this.downloadPDF();
}

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe((res : any[])=>{
      this.customers = res
      this.customers.forEach(item =>{
        this.DATA.push(item)
      })
    });
    
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
      docResult.save(`${new Date().toISOString()}_MolinoMallecoCustomers.pdf`);
    });
  }
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  
  exportAsXLSX():void{
    this.ExcelService.exportAsExcelFile(this.DATA, 'customer_data');
  }
}



export class Articulo {
  constructor(private productService: ProductService) {
  }

  

}