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

    inputAngles: string;
    angles: number[];
    hypotenuse: number;
    ballRadius: number;


    constructor() {
        this.hypotenuse = 5;
        this.ballRadius = 10;
        this.inputAngles = "";
        this.angles = [];
    }

    ngOnInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d')!;
    }

    calculateDx(angle: number){
        let dx = this.hypotenuse * (Math.cos(this.degreeToRadian(angle)));
        return dx;
    }

    calculateDy(angle:number) {
        let dy = this.hypotenuse * Math.sin(this.degreeToRadian(angle));
        return dy * -1;
    }

    startBalls(){
        this.angles = this.inputAngles.split(',').map(Number);
        console.log(this.angles);
        for (let i = 0; i < this.angles.length; i++) {
            this.draw(this.calculateDx(this.angles[i]), this.calculateDy(this.angles[i]), this.canvas.nativeElement.width/2, this.canvas.nativeElement.height/2);
        }
     }

    drawBall(x:number, y: number) {
        this.ctx.clearRect(x - 10, y - 10, 20, 20);
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    }

    async draw(dx:number, dy:number, x: number, y: number) {
        this.ctx.clearRect(x - 20, y - 20 , 40, 40);
        this.drawBall(x, y);

        if (y + dy > this.canvas.nativeElement.height - this.ballRadius || y + dy < this.ballRadius) {
            dy = -dy;
        }

        if (x + dx > this.canvas.nativeElement.width - this.ballRadius || x + dx < this.ballRadius) {
            dx = -dx;
        }

        x += dx;
        y += dy;
        await new Promise<void>((resolve) =>
            setTimeout(() => {
                resolve();
            }, 1)
        );
        this.ctx.clearRect(x - 10, y - 10, 20, 20);
        this.draw(dx, dy, x, y);
    }

    degreeToRadian(degree: number){
        return degree * Math.PI /180;
    }

}
