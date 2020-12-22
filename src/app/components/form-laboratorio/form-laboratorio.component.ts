import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { LaboratorioService} from "../../service/laboratorio.service"
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
@Component({
  selector: 'app-form-laboratorio',
  templateUrl: './form-laboratorio.component.html',
  styleUrls: ['./form-laboratorio.component.scss']
})
export class FormLaboratorioComponent implements OnInit {
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
    }

    return '';
  }

  constructor(
    public laboratorios: LaboratorioService,
    private dialogRef: MatDialogRef<FormLaboratorioComponent>
  ) { }

  ngOnInit(): void {
  }
  onSaveForm(){
    if(this.laboratorios.selected.id == null){
      let newLaboratorios = {
        glutenHumedo: this.laboratorios.selected.glutenHumedo,
        glutenIndex: this.laboratorios.selected.glutenIndex,
        granosBrotados: this.laboratorios.selected.granosBrotados,
        granosDanados: this.laboratorios.selected.granosDanados,
        granosPartidos: this.laboratorios.selected.granosPartidos,
        granosPuntaNegra: this.laboratorios.selected.granosPuntaNegra,
        humedad: this.laboratorios.selected.humedad,
        impurezas: this.laboratorios.selected.impurezas,
        indiceCaida: this.laboratorios.selected.indiceCaida,
        nombreAnalista: this.laboratorios.selected.nombreAnalista,
        nombreResponsable: this.laboratorios.selected.nombreResponsable,
        numMuestra: this.laboratorios.selected.numMuestra,
        pesoGrano: this.laboratorios.selected.pesoGrano,
        pesoHelectolitro: this.laboratorios.selected.pesoHelectolitro,
        valorSedimento: this.laboratorios.selected.valorSedimento,
      };
      this.laboratorios.addLaboratorio(newLaboratorios);
    }else{
      this.laboratorios.editLaboratorio(this.laboratorios.selected);
    }
    this.close()
  }
close(): void{
  this.dialogRef.close();
}
}
