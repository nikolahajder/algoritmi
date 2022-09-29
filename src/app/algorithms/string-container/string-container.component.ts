import { Component, Input, OnInit } from '@angular/core';
import { find } from 'rxjs';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
    selector: 'app-string-container',
    templateUrl: './string-container.component.html',
    styleUrls: ['./string-container.component.css']
})
export class StringContainerComponent implements OnInit, SolutionComponent {
    @Input() data: any;

    firstString: string;
    secondString: string;
    displayAnswer: boolean;
    contains: boolean;
    title: string;
    description: string;
    tsCode: string;
    htmlCode: string;
    cssCode: string;
    algorithm: IAlgorithm;

    constructor(private algorithmService: AlgorithmsService) {
        this.firstString = "";
        this.secondString = "";
        this.displayAnswer = false;
        this.contains = false;
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

    findIdx(idx: number) {
        let i = idx;
        for (i = idx; i < this.secondString.length;) {
            if (this.firstString[0] === this.secondString[i]) {
                break;
            } else {
                i++;
            }
        }
        return i;
    }

    checkContain(start_idx: number) {
        for (let i = 0; i < this.firstString.length;) {
            if (this.firstString[i] === this.secondString[start_idx]) {
                start_idx++;
                i++;
            } else {
                return false;
            }
        }
        return true;
    }

    stringContainsCheck() {
        let start_idx = 0;
        let nAttempts = 0;

        while(this.contains === false && nAttempts <= this.secondString.length) {
            start_idx=this.findIdx(start_idx);
            this.contains = this.checkContain(start_idx);
            nAttempts++;
            start_idx++;
        }

        this.displayAnswer = true;

    }

    onChange(newValue) {
        this.displayAnswer = false;
        this.contains = false;
    }

}
