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
import Swal from 'sweetalert2';
import {ExcelService} from '../../service/ExcelService';

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss']
})

export class ListCustomersComponent implements OnInit {
  DATA: any[] = [];
  customers: any[] = [];
  public load: Boolean = false;
  displayedColumns: string[] = ['nombre', 'region', 'ciudad','tipoProducto','cantidad','actions'];
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

constructor(
  private customerService: CustomersService,
  private dialog: MatDialog,
  private ExcelService: ExcelService){
this.downloadPDF();
}

  ngOnInit() {
    this.customerService.getAllProveedores().subscribe(res => this.dataSource.data = res)
    this.customerService.getAllProveedores().subscribe((res2 : any[])=>{
      this.customers = res2
      this.customers.forEach(item =>{
        this.DATA.push(item)
      })
    });
    setTimeout(()=>{
      this.load = true;
    }, 2000);
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


onEdit(element){
  //this.resetForm();
   //this.openModal();
  if (element){
    this.customerService.selected = element;
 }
 }

 getElement(element){
//   this.resetForm();
//   this.openModalAgregar();
   if (element){
     this.customerService.selected = element;
   }
 }

onDelete(id: string){
  Swal.fire({
    title:'¿Estas Seguro?',
    text:'Elimanaras completamente este Producto!',
    icon:'warning',
    showCancelButton:true,
    confirmButtonColor:'#3085d6',
    cancelButtonColor:'#d33',
    confirmButtonText:'Si, Quiero Eliminarlo!'
  }).then(result =>{
    if(result.value){
      this.customerService.deleteProveedores(id).then(()=>{
        Swal.fire('Borrado!','Se ha Eliminado Correctamente el Producto', 'success');
      }).catch((error) =>{
        Swal.fire('Error!', 'Ha ocurrido un error y no se podido Eliminar','error');
      })
    }
  })

}

 newProduct():void{
//   this.resetForm();
//   this.openModal();
// }
// openModal():void{
//   const dialogRef = this.dialog.open(FormComponent,{
//     data: 'Estas seguro que quieres hacer esto?'
//   });
//  dialogRef.afterClosed().subscribe(res => {
//    console.log(res);
//    if(res){

//    }
//  })
 }
 openModalAgregar():void{
//   const dialogRef = this.dialog.open(FormAgregarComponent,{
//     closeOnNavigation: true
//   });
 }

 resetForm():void{
//   this.customerService.selected.nombre='';
//   this.customerService.selected.cantidad=0;
//   this.customerService.selected.id=null;
// }
// ShowDialog(id): void {
//   this.dialog
//     .open(ConfirmationDialogComponent, {
//       data: `¿Esta Seguro que desea Borrar este Producto?`
//     })
//     .afterClosed()
//     .subscribe((confirmado: Boolean) => {
//       if (confirmado) {
//         this.onDelete(id);
//         alert("Cliente Eliminado");
//       } else {

//       }
//     });
// }
 }
 exportAsXLSX():void{
  this.ExcelService.exportAsExcelFile(this.DATA, 'customer_data');
}

}

export class Articulo {
  constructor(private productService: ProductService) {
  }



}