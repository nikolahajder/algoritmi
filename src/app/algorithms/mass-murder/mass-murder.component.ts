import { Component, Input, OnInit } from '@angular/core';
import { LinkedList } from 'src/app/linked-list';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
    selector: 'app-mass-murder',
    templateUrl: './mass-murder.component.html',
    styleUrls: ['./mass-murder.component.css']
})
export class MassMurderComponent implements OnInit, SolutionComponent {
    @Input() data: any;

    personNumber: number;
    personList: LinkedList;
    personAlive: number;
    displaySolution: boolean;
    displayError: boolean;
    title: string;
    description: string;
    tsCode: string;
    htmlCode: string;
    cssCode: string;
    algorithm: IAlgorithm;

    constructor(private algorithmService: AlgorithmsService) {
        this.displaySolution = false;
        this.displayError = false;
        this.personList = new LinkedList();
        this.personNumber = 0;
        this.personAlive = 0;
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

    lastManStanding(){
        let i;
        for (i = 1; i <= this.personNumber; i++) {
            this.personList.add(i);
        }
        this.personList.link();
        this.personAlive = this.personList.murderPeople();
        this.displaySolution = true;
    }

    onChange(newValue) {
        this.personNumber = newValue;
        this.displaySolution = false;
        this.personList = new LinkedList();
    }

}
