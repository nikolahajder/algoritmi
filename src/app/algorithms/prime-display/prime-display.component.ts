import { Component, Input, OnInit } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-prime-display',
  templateUrl: './prime-display.component.html',
  styleUrls: ['./prime-display.component.css']
})
export class PrimeDisplayComponent implements OnInit, SolutionComponent {
  @Input() data: any;

  value: number;
  nPrime: number;
  displaySolution: boolean;
  displayError: boolean;
  primeNumbers: number[];
  solution: number;
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
    this.nPrime = 0;
    this.value = 0;
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

  findPrimeNumber() {
    if(this.value >= 1) {
    this.displaySolution = true;
    this.primeNumbers = [];
      for (let i = 1; this.primeNumbers.length < this.value; i++) {
        if (this.isPrime(i)) {
          this.primeNumbers.push(i);
          this.nPrime++;
          this.solution = i;
        }
      }
    } else {
      this.displayError = true;
    }
  }

  isPrime(n: number) {
    if (n == 1 || n == 0) return false;

    for (var i = 2; i < n; i++) {
      if (n % i == 0) return false;
    }
    return true;
  }

  onChange(newValue) {
    this.value = newValue;
    this.primeNumbers = [];
    this.displaySolution = false;
    this.displayError = false;
  }

}
