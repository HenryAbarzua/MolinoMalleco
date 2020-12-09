import { Component, OnInit,ViewChild } from '@angular/core';
import {ListCustomersComponent} from '../list-customers/list-customers.component'
import { CustomersService } from 'src/app/service/customers.service';
import { ChartDataSets, ChartOptions, ChartType,Chart } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'

@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.scss']
})
export class LineaComponent implements OnInit {

  customers:any[] = [];
  cantidad: any;
  name: any;
  DATA: any[] = [];
  public lineChartData: ChartDataSets[] = [{data: this.DATA, label:'Cantidad'}]
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
            max : 300,
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

  

  constructor(private db:AngularFirestore,private customerService: CustomersService) {
  
  }

  ngOnInit(): void {
    this.customerService.getAllProveedores().subscribe((res: any[])=>{
      this.customers = res;
        console.log(res)
    if(this.customers.indexOf.apply(['name']) != null){
      this.customers.forEach(item => {
        this.lineChartLabels.push(item.name);
      });
      if(this.customers.indexOf.apply(['cantidad'])!= null){
      this.customers.forEach(item => {
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