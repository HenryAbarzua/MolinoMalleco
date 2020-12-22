import { Component, OnInit } from '@angular/core';
import {ProducstListComponent} from '../../Products/producst-list/producst-list.component'
import { ProductsService } from 'src/app/service/products.service';
import { ChartDataSets, ChartOptions, ChartType,Chart } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';
@Component({
  selector: 'app-graf-prod',
  templateUrl: './graf-prod.component.html',
  styleUrls: ['./graf-prod.component.scss']
})
export class GrafProdComponent implements OnInit {

 
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  products:any[] = [];
  cantidad: any;
  name: any;
  DATA: any[] = [];
  public lineChartData: ChartDataSets[] = [{data: this.DATA, label:'Cantidad(Kg)'}]
  public lineChartLabels: Label[] = [];
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          ticks: {
            max : 2000,
            min : 0,
          }
        }
      ]
    },
    plugins:{
      datalabels:{
        display:'true',
        anchor:'end',
        align:'top',
        color:'#222',
        font:{
          family:'FontAwesome',
          size:14,
          
        },

      },
      
    }
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: '#72BF5D',
      borderColor: 'green',
      pointBackgroundColor: 'red',
      pointBorderColor: 'red',
      pointHoverBackgroundColor: 'black',
      pointHoverBorderColor: 'red' 
    }
    ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'bar';
  public lineChartPlugins = [];


  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((res: any[])=>{
      this.DATA.length = 0;
      this.lineChartLabels.length = 0;
      this.products = res;
        console.log(res)
    if(this.products.indexOf.apply(['nombre']) != null){
      this.products.forEach(item => {
        this.lineChartLabels.push(item.nombre);
      });
      if(this.products.indexOf.apply(['cantidad'])!= null){
      this.products.forEach(item => {
        this.DATA.push(item.cantidad);
      });
    }else{
      this.lineChartLabels.push("Sin ingresos");
      console.log('no carga ingresos')
    }
    }else{
      this.DATA.push(0)
      console.log('no cargan datos desde la tabla')
    }
    
  }
      );
      
    
  
}
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}
}