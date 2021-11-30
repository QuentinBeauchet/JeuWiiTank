import Line from "./Line.js";
import Point from "./Point.js";

export default class Tank{
    constructor(walls){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.r = 5;
        this.d = 3;
        this.a = 0;
        this.walls = walls;
    }

    move(key){
        let newX = this.x;
        let newY = this.y;
        let point;

        if(key=='ArrowLeft') this.a -= 0.1;
        if(key=='ArrowRight') this.a += 0.1;

        if(key=='ArrowUp'){
            newX += this.d*Math.cos(this.a);
            newY += this.d*Math.sin(this.a);
            point = this.center();
        }
        if(key=='ArrowDown'){
            newX -= this.d*Math.cos(this.a);
            newY -= this.d*Math.sin(this.a);
            point = this.back();
        }
        if(this.canMove(new Line(point,this.lineOfSight(10)))){
            this.x = newX;
            this.y = newY;
        }
    }

    canMove(line){
        return this.walls.find(wall => wall.intersect(line)) == undefined;
    }

    center(){
        return new Point(this.x + this.r, this.y + this.r);
    }

    back(){
        return new Point(this.x + this.r*(1 - Math.cos(this.a)), this.y + this.r*(1 - Math.sin(this.a)));
    }

    lineOfSight(distance){
        return new Point(this.x + this.r + distance*Math.cos(this.a), this.y + this.r + distance*Math.sin(this.a));
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.x + this.r, this.y + this.r, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.beginPath();
        let center = this.center();
        let lineOfSight = this.lineOfSight(20);
        ctx.moveTo(center.x,center.y);
        ctx.lineTo(lineOfSight.x,lineOfSight.y);
        ctx.stroke();
    }
}