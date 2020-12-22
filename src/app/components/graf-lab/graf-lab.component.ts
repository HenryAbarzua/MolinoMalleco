import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graf-lab',
  templateUrl: './graf-lab.component.html',
  styleUrls: ['./graf-lab.component.scss']
})
export class GrafLabComponent implements OnInit {
  public polarAreaChartLabels: Label[] = ['Trigo', 'Avena', 'cebada cervecera'];
  public polarAreaChartData: SingleDataSet = [14, 12, 8];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor() { }

  ngOnInit(): void {
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
