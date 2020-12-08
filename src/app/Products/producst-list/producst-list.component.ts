import { Component, OnInit , ViewChild} from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import {MatPaginator} from '@angular/material/paginator';
import {FormAgregarComponent} from '../form/form-agregar/form-agregar.component';
import {ConfirmationDialogComponent} from "../../Clientes/client-details/confirmation-dialog/confirmation-dialog.component";




@Component({
  selector: 'app-producst-list',
  templateUrl: './producst-list.component.html',
  styleUrls: ['./producst-list.component.scss']
})
export class ProducstListComponent implements OnInit {
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
    private dialog: MatDialog){ }
  ngOnInit() {
    this.productsService.getAllProducts().subscribe(res => this.dataSource.data = res);
    
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
    this.productsService.deleteProducts(id);
  }


  newProduct():void{
    this.resetForm();
    this.openModal();
  }
  openModal():void{
    const dialogRef = this.dialog.open(FormComponent,{});
   dialogRef.afterClosed().subscribe(res => {
     console.log(res);
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
          alert("Cliente Eliminado");
        } else {
         
        }
      });
  }
  
}



