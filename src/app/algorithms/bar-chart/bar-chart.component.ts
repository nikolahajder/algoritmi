import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, Color } from 'chart.js';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, SolutionComponent {
  @Input() data: any;

  inputArray: string;
  numbersArray: number[];
  title: string;
  description: string;
  tsCode: string;
  htmlCode: string;
  cssCode: string;
  algorithm: IAlgorithm;
  barChartData: ChartConfiguration<'bar'>['data'];
  barChartLegend = true;
  barChartPlugins = [];

  constructor(private algorithmService: AlgorithmsService) {
    this.inputArray = "";
    this.title = "";
    this.description = "";
    this.tsCode = "";
    this.htmlCode = "";
    this.cssCode = "";
    this.algorithm = {
      id: 0,
      title: '',
      description: '',
      paths: {
        TypeScript: '',
        HTML: '',
        CSS: ''
      }
    };
  }

  ngOnInit(): void {
    this.algorithmService.showCode(this.algorithm.paths.TypeScript).then((value) => {
      this.tsCode = value;
    })

    this.algorithmService.showCode(this.algorithm.paths.HTML).then((value) => {
      this.htmlCode = value;
    })

    this.algorithmService.showCode(this.algorithm.paths.CSS).then((value) => {
      this.cssCode = value;
    })
  }

  createBarChart() {
    this.numbersArray = this.inputArray.split(',').map(Number);
    this.barChartData = {
      labels: this.numbersArray,
      datasets: [
        { data: this.numbersArray, label: "Number value",
          backgroundColor: ["#9C27B0"]
      }
      ]
    };
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
}
