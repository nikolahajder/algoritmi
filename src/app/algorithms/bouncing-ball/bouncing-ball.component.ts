import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TimeScale } from 'chart.js';
import { Ball } from '../ball';

@Component({
    selector: 'app-bouncing-ball',
    templateUrl: './bouncing-ball.component.html',
    styleUrls: ['./bouncing-ball.component.css']
})
export class BouncingBallComponent implements OnInit {


    @ViewChild('myCanvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;

    balls: Ball[];
    inputAngles: string;
    angles: number[];
    hypotenuse: number;
    ballRadius: number;
    paddleInput: string;
    paddle: number[];
    paddleX: boolean;
    paddleY: boolean;
    background: string;

    constructor() {
        this.ballRadius = 10;
        this.inputAngles = "33,44,55";
        this.angles = [];
        this.paddle = [];
        this.balls = [];
        this.paddleInput = "150,150,150,150";
        this.paddleX = false;
        this.paddleY = false;
        this.background = "#FFFFFF";
    }

    ngOnInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')!;
        this.clearWhite();
    }

    startBalls() {
        this.drawPaddle();
        this.angles = this.inputAngles.split(',').map(Number);
        for (let i = 0; i < this.angles.length; i++) {
            this.balls.push(new Ball(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, this.ballRadius, this.angles[i], 0.5));
        }
        for (let i = 0; i < this.angles.length; i++) {
            this.moveBall(i);
        }
    }

    drawBall(x: number, y: number) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    async moveBall(idx: number) {
        while (true) {
            this.clearBall(this.balls[idx].x, this.balls[idx].y);
            this.checkCollision(idx);
            
            this.balls[idx].x += this.balls[idx].nextDx;
            this.balls[idx].y += this.balls[idx].nextDy;

            this.drawBall(this.balls[idx].x, this.balls[idx].y);
            
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 0)
            );
            
            this.balls[idx].nextDx = this.balls[idx].dx;
            this.balls[idx].nextDy = this.balls[idx].dy;
        }
    }

    checkCollision(idx: number) {
        let gapX = this.collisionX(this.balls[idx].x + this.balls[idx].nextDx, this.balls[idx].y + this.balls[idx].nextDy, this.balls[idx].dx);
        let gapY = this.collisionY(this.balls[idx].y + this.balls[idx].nextDy, this.balls[idx].x + this.balls[idx].nextDx, this.balls[idx].dy);

        if (gapX !== 100) {
            if (gapX === 0) {
                this.balls[idx].changeXDirection();
            } else {
                this.balls[idx].nextDx = gapX;
            }
        }

        if (gapY !== 100) {
            if (gapY === 0) {
                this.balls[idx].changeYDirection();
            } else {
                this.balls[idx].nextDy = gapY;
            }
        }
    }

    collisionX(nextX: number, y: number, dx: number) {
        if (nextX > this.canvas.nativeElement.width - this.ballRadius) {
            return this.canvas.nativeElement.width - (nextX - dx) - this.ballRadius;
        } else if (nextX < this.ballRadius) {
            return -(nextX - dx - this.ballRadius);
        } else if (nextX > this.paddle[0] - this.ballRadius && y > this.paddle[1] - this.ballRadius/2 && y < this.paddle[1] + this.paddle[3] + this.ballRadius/2 && nextX < this.paddle[0] + this.paddle[2]/2 && dx > 0) {
            return this.paddle[0] - (nextX - dx) - this.ballRadius;
        } else if (nextX < this.paddle[0] + this.paddle[2] + this.ballRadius && y > this.paddle[1] - this.ballRadius/2 && y < this.paddle[1] + this.paddle[3] + this.ballRadius/2 && nextX > this.paddle[0] + this.paddle[2]/2 && dx < 0) {
            return -(nextX - dx - this.ballRadius) + this.paddle[0] + this.paddle[2];
        }
        return 100;
    }

    collisionY(nextY: number, x: number, dy: number) {
        if (nextY > this.canvas.nativeElement.height - this.ballRadius) {
            return this.canvas.nativeElement.height - (nextY - dy) - this.ballRadius;
        } else if (nextY < this.ballRadius) {
            return -(nextY - dy - this.ballRadius);
        } else if (nextY > this.paddle[1] - this.ballRadius && x > this.paddle[0] - this.ballRadius/2 && x < this.paddle[0] + this.paddle[2] + this.ballRadius/2 && nextY < this.paddle[1] + this.paddle[3]/2 && dy > 0) {
            return this.paddle[1] - (nextY - dy) - this.ballRadius;
        } else if (nextY < this.paddle[1] + this.paddle[3] + this.ballRadius && x > this.paddle[0] - this.ballRadius/2 && x  < this.paddle[0] + this.paddle[2] + this.ballRadius/2 && nextY > this.paddle[1] + this.paddle[3]/2 && dy < 0) {
            return -(nextY - dy - this.ballRadius) + this.paddle[1] + this.paddle[3];
        }
        return 100;
    }

    drawPaddle() {
        this.paddle = this.paddleInput.split(',').map(Number);
        this.ctx.beginPath();
        this.ctx.rect(this.paddle[0], this.paddle[1], this.paddle[2], this.paddle[3]);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    clearWhite() {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.ctx.fillStyle = this.background;
        this.ctx.fill();
        this.ctx.closePath();
    }

    clearBall(x: number, y: number) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.ballRadius + 0.7, 0, Math.PI * 2);
        this.ctx.fillStyle = this.background;
        this.ctx.fill();
        this.ctx.closePath();
        this.drawPaddle();
    }
}
