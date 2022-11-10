import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

    constructor() {
        this.ballRadius = 10;
        this.inputAngles = "";
        this.angles = [];
        this.paddle = [];
        this.balls = [];
        this.paddleInput = "";
    }

    ngOnInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')!;
        this.clearWhite();
    }

    startBalls() {
        this.drawPaddle();
        this.angles = this.inputAngles.split(',').map(Number);
        for (let i = 0; i < this.angles.length; i++) {
            this.balls.push(new Ball(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2, this.ballRadius, this.angles[i], 1));
        }
        for (let i = 0; i < this.angles.length; i++) {
            this.draw(i);
        }
    }

    drawBall(x: number, y: number) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    clearBall(x: number, y: number) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.ballRadius + 1, 0, Math.PI * 2);
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fill();
        this.ctx.closePath();
    }

    async draw(idx: number) {
        this.drawBall(this.balls[idx].x, this.balls[idx].y);

        if (this.collisionX(this.balls[idx].x + this.balls[idx].dx)) {
            this.balls[idx].changeXDirection();
        }

        if (this.collisionY(this.balls[idx].y + this.balls[idx].dy)) {
            this.balls[idx].changeYDirection();
        }

        if (this.paddleCollisionX(this.balls[idx].x + this.balls[idx].dx, this.balls[idx].y + this.balls[idx].dy)) {
            this.balls[idx].changeXDirection();
        } 
        
        if (this.paddleColisionY(this.balls[idx].y + this.balls[idx].dy, this.balls[idx].x + this.balls[idx].dx)) {
            this.balls[idx].changeYDirection();
        }


        let x = this.balls[idx].x;
        let y = this.balls[idx].y

        this.balls[idx].x += this.balls[idx].dx;
        this.balls[idx].y += this.balls[idx].dy;
        await new Promise<void>((resolve) =>
            setTimeout(() => {
                resolve();
            }, 0)
        );

        this.clearBall(x, y);
        this.draw(idx);
    }

    drawPaddle() {
        this.paddle = this.paddleInput.split(',').map(Number);
        this.ctx.beginPath();
        this.ctx.rect(this.paddle[0], this.paddle[1], this.paddle[2], this.paddle[3]);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    collisionX(nextX: number) {
        if (nextX > this.canvas.nativeElement.width - this.ballRadius || nextX < this.ballRadius) {
            return true;
        } else {
            return false;
        }
    }

    collisionY(nextY: number) {
        if (nextY > this.canvas.nativeElement.height - this.ballRadius || nextY < this.ballRadius) {
            return true;
        } else {
            return false;
        }
    }

    paddleCollisionX(nextX: number, y: number) {
        if (nextX + this.ballRadius> this.paddle[0] && y > this.paddle[1] - 11 && y < this.paddle[1] + this.paddle[3] + 11 && nextX - this.ballRadius < this.paddle[0] + this.paddle[2]) {
            return true;
        } else {
            return false;
        }
    }

    paddleColisionY(nextY: number, x: number) {
        if (nextY + this.ballRadius> this.paddle[1] && x > this.paddle[0] - 11 && x < this.paddle[0] + this.paddle[2] + 11 && nextY -this.ballRadius < this.paddle[1] + this.paddle[3]) {
            return true;
        } else {
            return false;
        }
    }

    clearWhite() {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fill();
        this.ctx.closePath();
    }
}
