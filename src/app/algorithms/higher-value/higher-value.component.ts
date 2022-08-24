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
    _filetext: string;
    tsURL: string;

    constructor(private algorithmService: AlgorithmsService) {
        this.valueA = 0;
        this.valueB = 0;
        this._filetext = "";
        this.tsURL = '/higher-value/higher-value.component.ts';
    }

    ngOnInit(): void {
        this.algorithmService.showCode(this.tsURL).then((value) => {
            this._filetext = value;
        })
    }

    outputA() {
        this.valueA = (this.valueA + this.valueB) / 2;
        this.valueB = this.valueA - Math.abs(this.valueA - this.valueB);
        this.valueA = this.valueB - 2 * (this.valueB - this.valueA);
    }

}
