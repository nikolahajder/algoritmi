import { Component, Input, OnInit } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-binary-search',
  templateUrl: './binary-search.component.html',
  styleUrls: ['./binary-search.component.css']
})
export class BinarySearchComponent implements OnInit, SolutionComponent {
  @Input() data: any;

  nAttemps: number;
  min: number;
  max: number;
  inputRange: string;
  rangeArray: number[];
  binary: number;
  guess: number;
  title: string;
  description: string;
  tsCode: string;
  htmlCode: string;
  cssCode: string;
  algorithm: IAlgorithm;

  constructor(private algorithmService: AlgorithmsService) {
    this.inputRange = "";
    this.nAttemps = 0;
    this.binary = 0;
    this.guess = 0;
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

  binarySearch() {
    this.nAttemps++;
    this.rangeArray = this.inputRange.split('-').map(Number);
    this.min = this.rangeArray[0];
    this.max = this.rangeArray[1];
    this.tryGuess(this.min, this.max);
  }

  calculateBinary() {
    for (let i = 0;; i++) {
      if (Math.pow(2, i) > this.rangeArray[1]){
        this.binary = i;
        return;
      }
    }
  }

  tryGuess(min, max){
    this.guess = Math.floor((min + max)/2);
  }


  calculateHigher() {
    this.nAttemps++;
    this.min = Math.floor((this.min + this.max)/2) + 1;
    this.tryGuess(this.min, this.max);
  }

  calculateLower(){
    this.nAttemps++;
    this.max = Math.floor((this.min + this.max)/2) - 1;
    this.tryGuess(this.min, this.max);
  }
}
