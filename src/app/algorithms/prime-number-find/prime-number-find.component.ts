import { Component, Input, OnInit } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-prime-number-find',
  templateUrl: './prime-number-find.component.html',
  styleUrls: ['./prime-number-find.component.css']
})
export class PrimeNumberFindComponent implements OnInit, SolutionComponent {
  @Input() data: any;

  inputRange: string;
  nPrime: number;
  displaySolution: boolean;
  displayError: boolean;
  primeNumbers: boolean[];
  primeArray: number[];
  rangeArray: number[];
  output: number;
  title: string;
  description: string;
  tsCode: string;
  htmlCode: string;
  cssCode: string;
  algorithm: IAlgorithm;

  constructor(private algorithmService: AlgorithmsService) {
    this.primeNumbers = [];
    this.primeArray = [];
    this.displaySolution = false;
    this.displayError = false;
    this.inputRange = "";
    this.rangeArray = [];
    this.nPrime = 0;
    this.output = 0;
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

  findPrimeNumbers() {
    this.rangeArray = this.inputRange.split('-').map(Number);
    if (typeof this.rangeArray[0] === 'number' && typeof this.rangeArray[1] === 'number') {
      this.primeNumbers = [];
      for (let i = this.rangeArray[0]; i <= this.rangeArray[1]; i++) {
        this.primeNumbers.push(true);
      }
      for(let inc = 2; inc < Math.sqrt(this.rangeArray[1]); inc++) {
        for (let j = inc * inc; j <= this.rangeArray[1]; j+=inc) {
            if (this.primeNumbers[j] === true) this.primeNumbers[j] = false;
        }
      }
      this.displaySolution = true;
      for (let i = 0; i < this.primeNumbers.length; i++) {
        if (this.primeNumbers[i] && i != 0) {
            this.primeArray.push(i);
        }
      }

    } else {
      this.displayError = true;
    }
  }

  onChange(newValue) {
    this.inputRange = newValue;
    this.primeNumbers = [];
    this.displaySolution = false;
    this.displayError = false;
  }

}
