import { Component, OnInit, Input } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-sort-bars',
  templateUrl: './sort-bars.component.html',
  styleUrls: ['./sort-bars.component.css']
})
export class SortBarsComponent implements OnInit, SolutionComponent {
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
    for (let i=0; i<15; i++){
      this.randomArray[i] = Math.floor(Math.random() * 250) * (Math.round(Math.random()) ? 1 : -1);
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

  async insertionSort(){

    let i, key, j;
    for(i = 1; i < this.helperArray.length; i++) {
      key = this.helperArray[i];
      j = i - 1;

      while (j >= 0 && this.helperArray[j] > key){
        this.helperArray[j + 1] = this.helperArray[j];
        j = j - 1;
        await new Promise<void>((resolve) =>
        setTimeout(() => {
          resolve();
        }, 600)
      );
      }
      this.helperArray[j + 1] = key;
      await new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, 600)
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
