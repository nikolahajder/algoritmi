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
  negativeArray: number[];
  title: string;
  description: string;
  tsCode: string;
  htmlCode: string;
  cssCode: string;
  algorithm: IAlgorithm;

  constructor(private algorithmService: AlgorithmsService) {
    this.numbersArray = [];
    this.negativeArray = [];
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
    for (let i = 0; i<this.numbersArray.length; i++){
      if (this.numbersArray[i] < 0){
        this.negativeArray[i] = this.numbersArray[i] * -1;
        this.numbersArray[i] = 0;
      } else {
        this.negativeArray[i] = 0;
      }
    }
  }

  randomBarChart() {
    for (let i=0; i<15; i++){
      this.numbersArray[i] = Math.floor(Math.random() * 300) * (Math.round(Math.random()) ? 1 : -1);
    }
    for (let i = 0; i<this.numbersArray.length; i++){
      if (this.numbersArray[i] < 0){
        this.negativeArray[i] = this.numbersArray[i] * -1;
        this.numbersArray[i] = 0;
      } else {
        this.negativeArray[i] = 0;
      }
    }

  }
}
