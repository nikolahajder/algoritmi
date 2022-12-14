import { Component, Input, OnInit } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-prime-find',
  templateUrl: './prime-find.component.html',
  styleUrls: ['./prime-find.component.css']
})
export class PrimeFindComponent implements OnInit, SolutionComponent {
  @Input() data: any;

  inputRange: string;
  nPrime: number;
  displaySolution: boolean;
  displayError: boolean;
  primeNumbers: number[];
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
      let start = Date.now();
      for (let i = this.rangeArray[0]; i <= this.rangeArray[1]; i++) {
        if (this.isPrime(i)) {
          this.primeNumbers.push(i);
          this.nPrime++;
        }
      }
      let end = Date.now();
      alert(end - start);
      this.displaySolution = true;
    } else {
      this.displayError = true;
    }
  }

  isPrime(value: number) {
    if (value === 1) {
        return false;
    }
    if (value === 2) {
        return true;
    }
    if (value % 2 === 0) {
        return false;
    }
    for (let i = 3; i <= Math.sqrt(value); i += 2) {
        if (value % i === 0) return false;
    }
    return true;
  }

  onChange(newValue) {
    this.inputRange = newValue;
    this.primeNumbers = [];
    this.displaySolution = false;
    this.displayError = false;
  }

}
