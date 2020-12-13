import { Component, ViewChild, OnInit } from '@angular/core';
import { ClientsService } from '../../service/clients.service';
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {FormClientsComponent} from '../form-clients/form-clients.component';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  public load: Boolean = false;
  displayedColumns: string[] = ['nombreEmpresa', 'rutEmpresa','nombreTitular','region','ciudad','tipoRubro','actions'];
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
    private clientService: ClientsService, 
    public dialog:MatDialog
    ) { 
      this.downloadPDF();
    }


  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(res => this.dataSource.data = res);
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
      this.clientService.selected = element;
    }
  }

  
  onDelete(id: string){
    Swal.fire({
      title:'¿Estas Seguro?',
      text:'Elimanaras completamente este Cliente!',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Si, Quiero Eliminarlo!'
    }).then(result =>{
      if(result.value){
        this.clientService.deleteClients(id).then(()=>{
          Swal.fire('Borrado!','Se ha Eliminado Correctamente el Cliente', 'success');  
        }).catch((error) =>{
          Swal.fire('Error!', 'Ha ocurrido un error y no se podido Eliminar','error');
        })
      }
    })
  
  }


  newClients():void{
    this.resetForm();
    this.openModal();
  }
  openModal():void{
    const dialogRef = this.dialog.open(FormClientsComponent,{
      disableClose: true
    });
   dialogRef.afterClosed().subscribe(res => {
    console.log(res);
    if(res){
       
     }
   })
}


  resetForm():void{
    this.clientService.selected.nombreEmpresa='';
    this.clientService.selected.rutEmpresa='';
    this.clientService.selected.nombreTitular='';
    this.clientService.selected.region='';
    this.clientService.selected.ciudad='';
    this.clientService.selected.tipoRubro='';
    this.clientService.selected.id=null;
  }



  
}