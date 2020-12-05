import { Component, OnInit , ViewChild} from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-producst-list',
  templateUrl: './producst-list.component.html',
  styleUrls: ['./producst-list.component.scss']
})
export class ProducstListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'cantidad','actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  constructor(private productsService: ProductsService){

  }
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
    this.productsService.selected = element;
  }
  onDelete(id: string){
    this.productsService.deleteProducts(id);
  }
}



