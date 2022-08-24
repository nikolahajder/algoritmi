import { Component, OnInit } from '@angular/core';
import { AlgorithmsService } from '../algorithms.service';

@Component({
    selector: 'app-higher-value',
    templateUrl: './higher-value.component.html',
    styleUrls: ['./higher-value.component.css']
})
export class HigherValueComponent implements OnInit {

    valueA: number;
    valueB: number;
    tsCode: string;
    htmlCode: string;
    cssCode: string;
    tsURL: string;
    htmlURL: string;
    cssURL: string;

    constructor(private algorithmService: AlgorithmsService) {
        this.valueA = 0;
        this.valueB = 0;
        this.tsCode = "";
        this.htmlCode = "";
        this.cssCode = "";
        this.tsURL = '/higher-value/higher-value.component.ts';
        this.htmlURL = '/higher-value/higher-value.component.html';
        this.cssURL = '/higher-value/higher-value.component.css';
    }

    ngOnInit(): void {
        this.algorithmService.showCode(this.tsURL).then((value) => {
            this.tsCode = value;
        })

        this.algorithmService.showCode(this.htmlURL).then((value) => {
            this.htmlCode = value;
        })

        this.algorithmService.showCode(this.cssURL).then((value) => {
            this.cssCode = value;
        })
    }

    outputA() {
        this.valueA = (this.valueA + this.valueB) / 2;
        this.valueB = this.valueA - Math.abs(this.valueA - this.valueB);
        this.valueA = this.valueB - 2 * (this.valueB - this.valueA);
    }

}
