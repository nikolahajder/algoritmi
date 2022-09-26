import { Component, Input, OnInit } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
  selector: 'app-prime-check',
  templateUrl: './prime-check.component.html',
  styleUrls: ['./prime-check.component.css']
})
export class PrimeCheckComponent implements OnInit, SolutionComponent {
  @Input() data: any;

  value: number;
  output: number;
  isPrime: boolean;
  isNotPrime: boolean;
  isOne: boolean;
  isError: boolean;
  title: string;
  description: string;
  tsCode: string;
  htmlCode: string;
  cssCode: string;
  algorithm: IAlgorithm;

  constructor(private algorithmService: AlgorithmsService) {
    this.isError = false;
    this.isPrime = false;
    this.isOne = false;
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

  primeCheck() {
    if (this.value === 1) {
      this.isOne = true;
      return;
    } else if (this.value > 1) {
      for (let i = 2; i < this.value; i++) {
        if (this.value % i == 0) {
          this.isNotPrime = true;
          this.isError = false;
          this.isPrime = false;
          this.isOne = false;
          break;
        } else {
          this.isPrime = true;
          this.isNotPrime = false;
          this.isOne = false;
          this.isError = false;
        }
      }
    } else {
      this.isError = true;
      this.isPrime = false;
      this.isNotPrime = false;
      this.isOne = false;
    }
  }

  onChange(newValue) {
    this.value = newValue;
    this.isPrime = false;
    this.isNotPrime = false;
    this.isError = false;
    this.isOne = false;
  }

}
