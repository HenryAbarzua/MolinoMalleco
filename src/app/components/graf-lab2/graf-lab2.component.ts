import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graf-lab2',
  templateUrl: './graf-lab2.component.html',
  styleUrls: ['./graf-lab2.component.scss']
})
export class GrafLab2Component implements OnInit {
  public polarAreaChartLabels: Label[] = ['Extra Fuerte', 'Fuerte', 'Intermedio','Debil'];
  public polarAreaChartData: SingleDataSet = [35.0,34.9,29.9,24.9];
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