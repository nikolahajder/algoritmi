export class Ball {
    x: number;
    y: number;
    radius: number;
    speed: number;
    dx: number;
    dy: number;
    nextDx: number;
    nextDy: number;

    constructor(x, y, radius, angle, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.calculateDx(angle);
        this.calculateDy(angle);
    }

    calculateDx(angle: number){
        this.dx = this.speed * (Math.cos(this.degreeToRadian(angle)));
        this.nextDx = this.dx;
    }

    calculateDy(angle:number) {
        this.dy = this.speed * Math.sin(this.degreeToRadian(angle)) *-1;
        this.nextDy = this.dy;
    }

    degreeToRadian(degree: number){
        return degree * Math.PI /180;
    }
    
    changeXDirection (){
        this.dx = -this.dx;
        this.nextDx = -this.nextDx;
    }

    changeYDirection(){
        this.dy = -this.dy;
        this.nextDy = -this.nextDy;
    }
}