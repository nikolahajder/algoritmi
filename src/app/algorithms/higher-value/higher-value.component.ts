import { Component, OnInit, Input } from '@angular/core';
import { AlgorithmsService } from '../algorithms.service';
import { IAlgorithm } from '../algorithms';
import { ManagerService } from '../manager.service';
import { SolutionComponent } from 'src/app/solution.component';

@Component({
    selector: 'app-higher-value',
    templateUrl: './higher-value.component.html',
    styleUrls: ['./higher-value.component.css']
})
export class HigherValueComponent implements OnInit, SolutionComponent{
    @Input() data: any;

    valueA: number;
    valueB: number;
    title: string;
    description: string;
    tsCode: string;
    htmlCode: string;
    cssCode: string;
    algorithm: IAlgorithm;

    constructor(private algorithmService: AlgorithmsService,
                private managerService: ManagerService) {
        this.valueA = 0;
        this.valueB = 0;
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

    outputA() {
        this.valueA = (this.valueA + this.valueB) / 2;
        this.valueB = this.valueA - Math.abs(this.valueA - this.valueB);
        this.valueA = this.valueB - 2 * (this.valueB - this.valueA);
    }

}