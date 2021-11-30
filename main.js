import Tank from "./Tank.js";
import Line from "./Line.js";
import Point from "./Point.js";

let tank, walls;

function setup(){
    walls = [];
    walls.push(new Line(new Point(300,30),new Point(400,300)));
    tank = new Tank(walls);

    window.addEventListener("keydown",event => tank.move(event.key));
    
    setInterval(() => loop(),10);
}

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tank.draw();
    walls.forEach(wall => wall.draw());
}

setup();