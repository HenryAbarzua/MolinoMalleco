import { Component, OnInit , ViewChild} from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';



@Component({
  selector: 'app-producst-list',
  templateUrl: './producst-list.component.html',
  styleUrls: ['./producst-list.component.scss']
})
export class ProducstListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'cantidad','actions','nuevo'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  
 
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

  
  onDelete(id: string){
    this.productsService.deleteProducts(id);
  }

  openModal():void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data ={
      title:'Modal'
    };
    dialogConfig.autoFocus = true;
    this.dialog.open(FormComponent,dialogConfig);
  }

  resetForm():void{
    this.productsService.selected.nombre='';
    this.productsService.selected.cantidad=0;
    this.productsService.selected.id=null;
  }
}



