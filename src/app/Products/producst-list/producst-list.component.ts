import { Component, OnInit , ViewChild} from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import {MatPaginator} from '@angular/material/paginator';
import {FormAgregarComponent} from '../form/form-agregar/form-agregar.component';
import {ConfirmationDialogComponent} from "../../Clientes/client-details/confirmation-dialog/confirmation-dialog.component";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';




@Component({
  selector: 'app-producst-list',
  templateUrl: './producst-list.component.html',
  styleUrls: ['./producst-list.component.scss']
})
export class ProducstListComponent implements OnInit {
  public load: Boolean = false;
  displayedColumns: string[] = ['nombre', 'cantidad','actions','nuevo'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  private paginator: MatPaginator;
  

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
    private productsService: ProductsService,
    private dialog: MatDialog
    ){ 
      this.downloadPDF(); 
    }
  ngOnInit() {
    this.productsService.getAllProducts().subscribe(res => this.dataSource.data = res);
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
      docResult.save(`${new Date().toISOString()}_MolinoMallecoProduct.pdf`);
    });
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  
  
  onEdit(element){
    this.resetForm();
    this.openModal();
    if (element){
      this.productsService.selected = element;
    }
  }

  getElement(element){
    this.resetForm();
    this.openModalAgregar();
    if (element){
      this.productsService.selected = element;
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
        this.productsService.deleteProducts(id).then(()=>{
          Swal.fire('Borrado!','Se ha Eliminado Correctamente el Producto', 'success');  
        }).catch((error) =>{
          Swal.fire('Error!', 'Ha ocurrido un error y no se podido Eliminar','error');
        })
      }
    })
  
  }


  newProduct():void{
    this.resetForm();
    this.openModal();
  }
  openModal():void{
    const dialogRef = this.dialog.open(FormComponent,{
      data: 'Estas seguro que quieres hacer esto?'
    });
   dialogRef.afterClosed().subscribe(res => {
     console.log(res);
     if(res){
       
     }
   })
}
//TODO crear nuevo modal
  openModalAgregar():void{
    const dialogRef = this.dialog.open(FormAgregarComponent,{ 
      closeOnNavigation: true
    });
  }

  resetForm():void{
    this.productsService.selected.nombre='';
    this.productsService.selected.cantidad=0;
    this.productsService.selected.id=null;
  }

  ShowDialog(id): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Esta Seguro que desea Borrar este Producto?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.onDelete(id);
          alert("Producto Eliminado");
        } else {
         
        }
      });
  }


  
}



