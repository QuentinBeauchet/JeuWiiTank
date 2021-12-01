import Line from "./Line.js";
import Point from "./Point.js";

export default class Tank{
    constructor(walls){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.r = 5;
        this.v = 3;
        this.dir = new Point(0,0);
        this.walls = walls;
    }

    move(key){
        let newX = this.x;
        let newY = this.y;
        let canMove = false;

        if(key=='ArrowLeft'){
            newX += this.dir.y*this.v;
            newY -= this.dir.x*this.v;
            canMove = this.canMove(new Line(this.center(),new Point(this.x + this.r*(1 + 2*this.dir.y), this.y + this.r*(1 - 2*this.dir.x))));
        }
        if(key=='ArrowRight'){
            newX -= this.dir.y*this.v;
            newY += this.dir.x*this.v;
            canMove = this.canMove(new Line(this.center(),new Point(this.x + this.r*(1 - 2*this.dir.y), this.y + this.r*(1 + 2*this.dir.x))));
        }
        if(key=='ArrowUp'){
            newX += this.dir.x*this.v;
            newY += this.dir.y*this.v;
            canMove = this.canMove(new Line(this.center(),new Point(this.x + this.r*(1 + 2*this.dir.x), this.y + this.r*(1 + 2*this.dir.y))));
        }
        if(key=='ArrowDown'){
            newX -= this.dir.x*this.v;
            newY -= this.dir.y*this.v;
            canMove = this.canMove(new Line(this.center(),new Point(this.x + this.r*(1 - 2*this.dir.x), this.y + this.r*(1 - 2*this.dir.y))));
        }
        if(canMove){
            this.x = newX;
            this.y = newY;
        }
    }

    setDirection(event){
        var rect = canvas.getBoundingClientRect();
        this.dir = new Line(new Point(this.x + this.r,this.y + this.r),new Point(event.clientX - rect.left,event.clientY - rect.top)).normalize()
    }

    getDirection(distance){
        return new Point(this.x + this.r + this.dir.x*distance,this.y + this.r + this.dir.y*distance);
    }

    canMove(line){
        return this.walls.tab.find(wall => wall.intersect(line)) == undefined;
    }

    center(){
        return new Point(this.x + this.r, this.y + this.r);
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.x + this.r, this.y + this.r, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        let center = this.center();
        let direction = this.getDirection(20);
        ctx.moveTo(center.x,center.y);
        ctx.lineTo(direction.x,direction.y);
        ctx.stroke();
    }
}