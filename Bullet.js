import Line from "./Line.js";
import Point from "./Point.js";

export default class Bullet{
    constructor(x,y,dir,walls){
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.walls = walls;
        this.r = 5;
        this.rebound = 0;
    }

    move(){
        let newX = this.x;
        let newY = this.y;
        let intersect;
        let center = new Point(this.x + this.r, this.y + this.r);

        newX += this.dir.x;
        newY += this.dir.y;
        intersect = this.canMove(new Line(center,new Point(this.x + this.r*(1 + 2*this.dir.x), this.y + this.r*(1 + 2*this.dir.y))));
        
        if(intersect){
            if(intersect.p1.y - intersect.p2.y==0){
                this.dir.y *= -1;
            }
            else{
                this.dir.x *= -1;
            }
            this.rebound++;
        }
        else{
            this.x = newX;
            this.y = newY;
        }
    }

    canMove(line){
        return this.walls.tab.find(wall => wall.intersect(line));
    }

    update(){
        this.move();
        this.draw();
    }

    draw(){
        ctx.beginPath();
        if(this.rebound==0) ctx.fillStyle = "yellow";
        if(this.rebound==1) ctx.fillStyle = "orange";
        if(this.rebound==2) ctx.fillStyle = "red";
        ctx.arc(this.x + this.r, this.y + this.r, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}