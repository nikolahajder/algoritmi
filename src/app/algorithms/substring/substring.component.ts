import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
    selector: 'app-substring',
    templateUrl: './substring.component.html',
    styleUrls: ['./substring.component.css']
})
export class SubstringComponent implements OnInit, SolutionComponent {
    @Input() data: any;

    first_idx: number;
    second_idx: number;
    firstString: string;
    secondString: string;
    displayAnswer: boolean;
    subsequence: string;
    tempSubstring: string;
    title: string;
    description: string;
    tsCode: string;
    htmlCode: string;
    cssCode: string;
    algorithm: IAlgorithm;

    constructor(private algorithmService: AlgorithmsService) {
        this.first_idx = 0;
        this.second_idx = 0;
        this.firstString = "";
        this.secondString = "";
        this.displayAnswer = false;
        this.subsequence = "";
        this.tempSubstring = "";
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

    onChange(newValue) {
        this.displayAnswer = false;
        this.subsequence = "";
    }

}
