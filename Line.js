import Point from "./Point.js";

export default class Line{
    constructor(p1,p2){
        this.p1 = p1;
        this.p2 = p2;
    }

    collision(A,B,C){
        return (C.y-A.y) * (B.x-A.x) > (B.y-A.y) * (C.x-A.x);
    }

    intersect(line){
        return this.collision(this.p1,line.p1,line.p2) != this.collision(this.p2,line.p1,line.p2) && this.collision(this.p1,this.p2,line.p1) != this.collision(this.p1,this.p2,line.p2);
    }

    normalize(){
        let substitution = new Point(this.p2.x - this.p1.x,this.p2.y - this.p1.y);
        let magnitude = Math.sqrt(substitution.x**2 + substitution.y**2);
        return new Point(substitution.x/magnitude,substitution.y/magnitude);
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.p1.x,this.p1.y);
        ctx.lineTo(this.p2.x,this.p2.y);
        ctx.stroke();
    }
}