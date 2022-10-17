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
    ctx: CanvasRenderingContext2D;

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

        this.ctx = this.canvas.nativeElement.getContext('2d')!;
    }

    sierpinskiTriangle(d: number) {
        if(d > 10) {
            this.displayError = true;
            return;
        }
        this.reset();
        this.ctx.beginPath();
        this.sierpinski(150, 10, 40, 140, 260, 140, d, this.ctx);
        this.ctx.closePath();
        this.ctx.fillStyle = '#000000';
        this.ctx.fill();
    }

    sierpinski(Ax, Ay, Bx, By, Cx, Cy, d, ctx) {
        if (d > 0) {
            this.sierpinski(Ax, Ay, (Ax + Cx) / 2, (Ay + Cy) / 2, (Ax + Bx) / 2, (Ay + By) / 2, d - 1, ctx);
            this.sierpinski((Ax + Bx) / 2, (Ay + By) / 2, (Bx + Cx) / 2, (By + Cy) / 2, Bx, By, d - 1, ctx);
            this.sierpinski((Ax + Cx) / 2, (Ay + Cy) / 2, (Bx + Cx) / 2, (By + Cy) / 2, Cx, Cy, d - 1, ctx);
        }
        else {
            ctx.moveTo(Ax, Ay);
            ctx.lineTo(Bx, By);
            ctx.lineTo(Cx, Cy);
            ctx.lineTo(Ax, Ay);
        }
    }


    onChange(newValue) {
        this.depth = newValue;
        this.displayError = false;
        this.ctx.clearRect(0, 0, 700, 400);
    }

    reset() {
        this.ctx.beginPath();
        this.ctx.moveTo(150, 10);
        this.ctx.lineTo(40, 140);
        this.ctx.lineTo(260, 140);
        this.ctx.closePath();
        this.ctx.fillStyle = "#FFF8DC";
        this.ctx.fill();
    }
}
