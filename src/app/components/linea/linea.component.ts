import { Component, OnInit } from '@angular/core';
import {ListCustomersComponent} from '../list-customers/list-customers.component'
import { CustomersService } from 'src/app/service/customers.service';
import {MatTableDataSource} from '@angular/material/table';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chart.js';
@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.scss']
})
export class LineaComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  
  displayedColumns: string[] = ['name', 'city', 'order'];
  dataSource = new MatTableDataSource();
  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    
    this.customerService.getAllCustomers().subscribe(res => this.dataSource.data = res);
    
    
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }

}
