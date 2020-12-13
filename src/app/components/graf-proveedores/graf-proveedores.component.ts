import { Component, OnInit } from '@angular/core';
import { CustomersService} from 'src/app/service/customers.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';
import { ChartDataSets, ChartOptions, ChartType,Chart } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-graf-proveedores',
  templateUrl: './graf-proveedores.component.html',
  styleUrls: ['./graf-proveedores.component.scss']
})
export class GrafProveedoresComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  customers:any[] = [];
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
            max : 1000,
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

  constructor(private CustomersService: CustomersService) { }

  ngOnInit(): void {
    this.CustomersService.getAllProveedores().subscribe((res: any[])=>{
      this.DATA.length = 0;
      this.lineChartLabels.length =0;
      this.customers = res;
      console.log(res);
      if(this.customers.indexOf.apply(['tipoProducto'])!= null){
        this.customers.forEach(item => {
          this.lineChartLabels.push(item.tipoProducto);
        });
        if(this.customers.indexOf.apply(['cantidad'])!= null){
          this.customers.forEach(item =>{
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
    });
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
