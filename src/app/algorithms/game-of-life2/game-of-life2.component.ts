import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-game-of-life2',
    templateUrl: './game-of-life2.component.html',
    styleUrls: ['./game-of-life2.component.css']
})
export class GameOfLife2Component implements OnInit {

    population: boolean;
    buttonClicked: boolean;
    stop: boolean;
    grid: number[];
    next: number[];
    cols: number;
    rows: number;
    resolution: number;

    constructor() {
    }

    ngOnInit(): void {
        this.stop = false;
        this.population = false;
        this.buttonClicked = false;
        this.cols = 30;
        this.rows = 55;
        this.grid = this.make2DArray(this.cols, this.rows);
        this.emptyGrid();
    }

    make2DArray(cols, rows) {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }

    async setup() {
        this.buttonClicked = true;
        let i = 0;
        while (this.stop === false && this.population === true) {
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 45)
            );
            this.gameOfLife();
            console.log(i);
            i++
            this.checkPopulation();
        }
        this.buttonClicked = false;
    }

    gameOfLife() {
        this.next = this.make2DArray(this.cols, this.rows);
        let neighbors: number, state: number;
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                state = this.grid[i][j];

                //count live neighbors
                neighbors = this.countNeighbors(this.grid, i, j);

                if (state === 0 && neighbors === 3) {
                    this.next[i][j] = 1
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    this.next[i][j] = 0;
                } else {
                    this.next[i][j] = state;
                }
            }
        }
        this.grid = this.next;
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

    onClick(row, col) {
        if(this.grid[col][row] === 0){
        this.grid[col][row] = 1;
        } else {
            this.grid[col][row] = 0;
        }

    }

    randomGame() {
        this.population = true;
        this.stop = false;
        if (this.buttonClicked === false) {
            for (let i = 0; i < this.cols; i++) {
                for (let j = 0; j < this.rows; j++) {
                    this.grid[i][j] = Math.floor(Math.random() * 2);
                }
            }
            this.setup();
        } else {
            return;
        }
    }

    startGame(){
        this.population = true;
        this.stop = false;
        if (this.buttonClicked === false) {
            this.setup();
        } else {
            return;
        }
    }

    resetGame() {
        this.stop = true;
        this.emptyGrid();
    }

    checkPopulation(){
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.grid[i][j] === 1) {
                    this.population = true;
                    return;
                }
            }
        }
        this.population = false;
        this.resetGame();
    }

    emptyGrid(){
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j] = 0;
            }
        }
    }
}
