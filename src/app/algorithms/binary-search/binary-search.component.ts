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

  elements: number[];
  displayLogic: boolean;
  displayGuess: boolean;
  displayHelp: boolean;
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
    this.elements=[0];
    this.displayGuess = false;
    this.displayLogic = false;
    this.displayHelp = false;
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
    this.nAttemps = 0;
    this.nAttemps++;
    this.rangeArray = this.inputRange.split('-').map(Number);
    if (typeof this.rangeArray[0] ==='number' && typeof this.rangeArray[1] ==='number') {
      this.min = this.rangeArray[0];
      this.max = this.rangeArray[1];
      this.guess = Math.floor((this.min + this.max) / 2);
      this.displayLogic = true;
      this.displayHelp = false;
    } else {
      this.displayHelp = true;
    }
    this.tryGuess(this.min, this.max);
  }

  calculateBinary() {
    if (typeof this.rangeArray[1] === 'number') {
      for (let i = 0; ; i++) {
        if (Math.pow(2, i) > this.rangeArray[1]) {
          this.binary = i;
          return;
        }
      }
    }
  }

  tryGuess(min, max) {
    if (this.elements[0] === 0){
      this.elements = [];
      this.elements[0] = Math.floor((min + max) / 2);
    } else {
    this.guess = Math.floor((min + max) / 2);
    this.elements.push(this.guess);
    }
  }


  calculateHigher() {
    if (this.nAttemps < this.binary) {
      this.nAttemps++;
    }
    this.min = Math.floor((this.min + this.max) / 2) + 1;
    this.tryGuess(this.min, this.max);
  }

  calculateLower() {
    if (this.nAttemps < this.binary) {
      this.nAttemps++;
    }
    this.max = Math.floor((this.min + this.max) / 2) - 1;
    this.tryGuess(this.min, this.max);
  }

  numberGuessed() {
    this.displayGuess = true;
  }

  resetNumber() {
    this.rangeArray = [];
    this.displayLogic = false;
    this.displayGuess = false;
    this.nAttemps = 0;
    this.elements = [0];
  }
}
