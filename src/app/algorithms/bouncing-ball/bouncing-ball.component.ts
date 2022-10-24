import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-bouncing-ball',
    templateUrl: './bouncing-ball.component.html',
    styleUrls: ['./bouncing-ball.component.css']
})
export class BouncingBallComponent implements OnInit {


    @ViewChild('myCanvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    dx: number;
    dy: number;
    ballRadius: number;


    constructor() { }

    ngOnInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')!;
        this.x = this.canvas.nativeElement.width / 2;
        this.y = this.canvas.nativeElement.height - 30;
        this.dx = 2;
        this.dy = -2;
        this.ballRadius = 10;
        this.draw();
    }

    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    async draw() {
        this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.drawBall();

        if (this.y + this.dy > this.canvas.nativeElement.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        }

        if (this.x + this.dx > this.canvas.nativeElement.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
        await new Promise<void>((resolve) =>
            setTimeout(() => {
                resolve();
            }, 20)
        );
        this.draw();
    }


}
