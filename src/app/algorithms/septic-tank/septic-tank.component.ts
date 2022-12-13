import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-septic-tank',
    templateUrl: './septic-tank.component.html',
    styleUrls: ['./septic-tank.component.css']
})
export class SepticTankComponent implements OnInit {

    @ViewChild('myCanvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    barRadiuses: number[];
    displayAnswer: boolean;

    radius: number;
    spaceBeetwen: number;
    numberOfBars: number;

    constructor() {
        this.radius = 0;
        this.spaceBeetwen = 0;
        this.numberOfBars = 0;
        this.barRadiuses = [];
        this.displayAnswer = false;
    }

    ngOnInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')!;
        this.x = this.canvas.nativeElement.width / 2;
        this.y = this.canvas.nativeElement.height / 2;
    }

    drawCircle() {
        this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius - 2, 0, Math.PI * 2);
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fill();
        this.ctx.closePath();
        this.drawBars();
    }

    drawBars() {
        this.drawDiameters();
        this.calculateRadiuses();
        this.drawHorizontalBars();
        this.drawVerticalBars();
        this.displayAnswer = true;
    }

    calculateNumberOfBars() {
        if (this.spaceBeetwen === null || this.spaceBeetwen >= this.radius * 2 || this.spaceBeetwen <= 0) return;
        this.numberOfBars = -1;
        let n = 0;
        while (n < this.radius) {
            this.numberOfBars += 1;
            n += this.spaceBeetwen;
        }
    }

    calculateRadiuses() {
        let n = this.spaceBeetwen;
        this.calculateNumberOfBars();
        this.barRadiuses = [];
        for (let i = 0; i < this.numberOfBars; i++) {
            this.barRadiuses.push(Math.round(Math.sqrt(Math.pow(this.radius, 2) - Math.pow(n, 2))));
            n += this.spaceBeetwen;
        }
    }

    drawDiameters() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - this.radius, this.y);
        this.ctx.lineTo(this.x + this.radius, this.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y - this.radius);
        this.ctx.lineTo(this.x, this.y + this.radius);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawHorizontalBars(){
        let n = this.spaceBeetwen;
        for (let i = 0; i <= this.numberOfBars; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x - this.barRadiuses[i], this.y - n);
            this.ctx.lineTo(this.x + this.barRadiuses[i], this.y - n);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.beginPath();
            this.ctx.moveTo(this.x - this.barRadiuses[i], this.y+n);
            this.ctx.lineTo(this.x + this.barRadiuses[i], this.y+n);
            this.ctx.stroke();
            this.ctx.closePath();
            n+=this.spaceBeetwen;
        }
    }

    drawVerticalBars(){
        let n = this.spaceBeetwen;
        for (let i = 0; i <= this.numberOfBars; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x - n, this.y - this.barRadiuses[i]);
            this.ctx.lineTo(this.x - n, this.y + this.barRadiuses[i]);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.beginPath();
            this.ctx.moveTo(this.x + n, this.y - this.barRadiuses[i]);
            this.ctx.lineTo(this.x + n, this.y  + this.barRadiuses[i]);
            this.ctx.stroke();
            this.ctx.closePath();
            n+=this.spaceBeetwen;
        }
    }

}
