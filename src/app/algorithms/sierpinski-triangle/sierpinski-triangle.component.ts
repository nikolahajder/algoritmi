import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SolutionComponent } from 'src/app/solution.component';
import { IAlgorithm } from '../algorithms';
import { AlgorithmsService } from '../algorithms.service';

@Component({
    selector: 'app-sierpinski-triangle',
    templateUrl: './sierpinski-triangle.component.html',
    styleUrls: ['./sierpinski-triangle.component.css']
})
export class SierpinskiTriangleComponent implements OnInit, SolutionComponent {
    @Input() data: any;

    @ViewChild('canvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D | null;

    depth: number;
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
        this.depth = 0;
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

    sierpinskiTriangle() {
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.displaySolution = true;
    }


    onChange(newValue) {
        this.depth = newValue;
        this.displaySolution = false;
    }

}
