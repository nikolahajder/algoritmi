import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-game-of-life',
    templateUrl: './game-of-life.component.html',
    styleUrls: ['./game-of-life.component.css']
})
export class GameOfLifeComponent implements OnInit {

    grid: number[];
    next: number[];
    cols: number;
    rows: number;
    resolution: number;

    @ViewChild('canvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;

    constructor() {
    }

    ngOnInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')!;
        this.canvas.nativeElement.addEventListener('click', function () { }, false);
        this.resolution = 5;
        this.cols = this.canvas.nativeElement.width / this.resolution;
        this.rows = this.canvas.nativeElement.height / this.resolution;
        this.grid = this.make2DArray(this.cols, this.rows);
    }

    make2DArray(cols, rows) {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }

    async setup() {

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j] = Math.floor(Math.random() * 2);
            }
        }
        for (let i = 0; i < 1000; i++) {
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 20)
            );
            this.draw();
            console.log(i);
        }
    }

    draw() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                let x = i * this.resolution;
                let y = j * this.resolution;
                if (this.grid[i][j] === 0) {
                    //this.ctx.stroke();
                    this.ctx.fillStyle = "black";
                    this.ctx.fill();
                } else {
                    //this.ctx.stroke();
                    this.ctx.fillStyle = "white";
                    this.ctx.fill();
                }
                this.ctx.beginPath();
                this.ctx.rect(x, y, this.resolution - 0.5, this.resolution - 0.5);
                //this.ctx.stroke();
            }
        }

        let next = this.make2DArray(this.cols, this.rows);
        let neighbors: number, state: number;
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                state = this.grid[i][j];

                //count live neighbors
                neighbors = this.countNeighbors(this.grid, i, j);

                if (state === 0 && neighbors === 3) {
                    next[i][j] = 1
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            }
        }
        this.grid = next;
    }

    countNeighbors(grid, x, y) {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                //fora za ivice
                let col = (x + i + this.cols) % this.cols;
                let row = (y + j + this.rows) % this.rows;

                sum += grid[col][row];
            }
        }
        sum -= grid[x][y];
        return sum;
    }
    
}
