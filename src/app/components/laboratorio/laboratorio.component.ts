import { Component, OnInit, ViewChild } from '@angular/core';
import { LaboratorioI } from 'src/app/models/laboratorio.interface';
import { FormLaboratorioComponent}from '../form-laboratorio/form-laboratorio.component'
import { laboratorioID, LaboratorioService} from '../../service/laboratorio.service'
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExcelService } from '../../service/ExcelService';
@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.scss']
})
export class LaboratorioComponent implements OnInit {
  DATA: any[] = [];
  laboratorios: any[] = [];
  public load: boolean = false
displayedColumns: string[] = ["glutenHumedo",
  "glutenIndex",
  "granosBrotados",
  "granosDanados",
  "granosPartidos",
  "granosPuntaNegra",
  "humedad",
  "impurezas",
  "indiceCaida",
  "nombreAnalista",
  "nombreResponsable",
  "numMuestra",
  "pesoGrano",
  "pesoHelectolitro",
  "valorSedimento",
  "actions"]
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort)sort: MatSort;
  private paginator: MatPaginator;
  
  @ViewChild(MatSort) set matSort(ms: MatSort){
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
    private laboratorioService: LaboratorioService,
    public dialog:MatDialog,
    private ExcelService: ExcelService
  ) { 
    this.downloadPDF4();
  }

  ngOnInit(): void {
    this.laboratorioService.getAllLaboratorio().subscribe(res => this.dataSource.data = res);
    this.laboratorioService.getAllLaboratorio().subscribe((res2: any[])=>{
      this.laboratorios = res2;
      this.laboratorios.forEach(item =>{
        this.DATA.push(item)
      })
    });
    setTimeout(()=>{
      this.load = true;
    }, 3000);
  }

   public downloadPDF4(): void {
    const DATA = document.getElementById('htmlData4')
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
      docResult.save(`${new Date().toISOString()}_MolinoMallecoLaboratorios.pdf`);
    });
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
  filtrar(event: Event){
    const filtro = (event.target as HTMLInputElement).value;
    this,this.dataSource.filter = filtro.trim().toLowerCase();
  }
  
  onEdit(element){
    this.resetForm();
    this.openModal();
    if (element){
      this.laboratorioService.selected = element;
    }
  }


  
  onDelete(id: string){
    Swal.fire({
      title:'¿Estas Seguro?',
      text:'Elimanaras completamente este informe!',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Si, Quiero Eliminarlo!'
    }).then(result =>{
      if(result.value){
        this.laboratorioService.deleteLaboratorio(id).then(()=>{
          Swal.fire('Borrado!','Se ha Eliminado Correctamente el Informe', 'success');  
        }).catch((error) =>{
          Swal.fire('Error!', 'Ha ocurrido un error y no se podido Eliminar','error');
        })
      }
    })
  
  }


  newLaboratorios():void{
    this.resetForm();
    this.openModal();
  }
  openModal():void{
    const dialogRef = this.dialog.open(FormLaboratorioComponent,{
      disableClose: true
    });
   dialogRef.afterClosed().subscribe(res => {
    console.log(res);
    if(res){
       
     }
   })
}


  resetForm():void{

        this.laboratorioService.selected.glutenHumedo=0;
         this.laboratorioService.selected.glutenIndex=0,
         this.laboratorioService.selected.granosBrotados=0,
         this.laboratorioService.selected.granosDanados=0,
        this.laboratorioService.selected.granosPartidos=0,
        this.laboratorioService.selected.granosPuntaNegra=0,
        this.laboratorioService.selected.humedad=0,
       this.laboratorioService.selected.impurezas=0,
        this.laboratorioService.selected.indiceCaida=0,
         this.laboratorioService.selected.nombreAnalista='',
      this.laboratorioService.selected.nombreResponsable='',
        this.laboratorioService.selected.numMuestra=0,
         this.laboratorioService.selected.pesoGrano=0,
         this.laboratorioService.selected.pesoHelectolitro=0,
        this.laboratorioService.selected.valorSedimento=0
  }


  exportAsXLSX(): void {
    this.ExcelService.exportAsExcelFile(this.DATA, 'Laboratorios_data');
  }
  
}
