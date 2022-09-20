import { Component, Input, OnInit } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-swap-bars',
  templateUrl: './swap-bars.component.html',
  styleUrls: ['./swap-bars.component.css']
})
export class SwapBarsComponent implements OnInit, SolutionComponent {
  @Input() data: any;

  inputArray: string;
  randomArray: number[];
  negativeArray: number[];
  helperArray: number[];
  positionArray: number[];
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
    this.positionArray = [];
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

  randomBarChart() {
    for (let i=0; i<15; i++){
      this.randomArray[i] = Math.floor(Math.random() * 250) * (Math.round(Math.random()) ? 1 : -1);
    }
    console.log(this.randomArray);
    for(let i = 0; i<15; i++){
      this.helperArray[i] = this.randomArray[i];
    }
    console.log(this.helperArray);

    for (let i = 0; i<this.randomArray.length; i++){
      if (this.randomArray[i] < 0){
        this.negativeArray[i] = this.randomArray[i] * -1;
        this.randomArray[i] = 0;
      } else {
        this.negativeArray[i] = 0;
      }
    }
  }

  swapBars(){
    this.positionArray = this.inputArray.split(',').map(Number);
    let a = this.positionArray[0] -1;
    let b = this.positionArray[1] -1;

    console.log(this.helperArray);

    const temp = this.helperArray[a];
    this.helperArray[a] = this.helperArray[b];
    this.helperArray[b] = temp;

    for (let i = 0; i<15; i ++) {
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
