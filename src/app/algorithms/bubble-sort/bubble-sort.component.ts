import { Component, Input, OnInit } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.css']
})
export class BubbleSortComponent implements OnInit, SolutionComponent{
  @Input() data: any;

  randomArray: number[];
  negativeArray: number[];
  helperArray: number[];
  interval: number;
  title: string;
  description: string;
  tsCode: string;
  htmlCode: string;
  cssCode: string;
  algorithm: IAlgorithm;

  constructor(private algorithmService: AlgorithmsService) {
    this.randomArray = [];
    this.negativeArray = [];
    this.helperArray = [];
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

  randomBarChart(){
    for (let i=0; i<40; i++){
      this.randomArray[i] = Math.floor(Math.random() * 240) * (Math.round(Math.random()) ? 1 : -1);
    }

    for(let i = 0; i<this.randomArray.length; i++){
      this.helperArray[i] = this.randomArray[i];
    }

    for (let i = 0; i<this.randomArray.length; i++){
      if (this.randomArray[i] < 0) {
        this.negativeArray[i] = this.randomArray[i] * -1;
        this.randomArray[i] = 0;
      } else {
        this.negativeArray[i] = 0;
      }
    }
  }

  swap(arr, xp, yp) {
    let temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
  }

  async bubbleSort(){

    let i, j;
    for (i = 0; i < this.helperArray.length - 1; i++) {
      for (j = 0; j < this.helperArray.length-i-1; j++) {
        if (this.helperArray[j] > this.helperArray[j + 1]) {
          this.swap(this.helperArray, j, j+1);
        }
      }
      await new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, 300)
    );
    this.barChart();
    }
  }

  barChart(){
    for (let i = 0; i<this.helperArray.length; i ++) {
      this.randomArray[i] = this.helperArray[i];
    }

    for (let i = 0; i<this.randomArray.length; i++){
      if (this.randomArray[i] < 0){
        this.negativeArray[i] = this.randomArray[i] * -1;
        this.randomArray[i] = 0;
      } else {
        this.negativeArray[i] = 0;
      }
    }
  }

}
