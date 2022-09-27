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
        if (this.value > 0) {

            if (!this.isPrimeNum(this.value)) {
                this.isNotPrime = true;
                this.isError = false;
                this.isPrime = false;
            } else {
                this.isPrime = true;
                this.isNotPrime = false;
                this.isError = false;
            }
        } else {
            this.isError = true;
            this.isPrime = false;
            this.isNotPrime = false;
        }
    }

    onChange(newValue) {
        this.value = newValue;
        this.isPrime = false;
        this.isNotPrime = false;
        this.isError = false;
    }

    isPrimeNum(value: number) {
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

}
