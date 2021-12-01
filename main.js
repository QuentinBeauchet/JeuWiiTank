import Tank from "./Tank.js";
import Line from "./Line.js";
import Point from "./Point.js";
import Bullet from "./Bullet.js";

let tank, walls, bullets;

function setup(){
    walls = {tab : []};
    var rect = canvas.getBoundingClientRect();
    walls.tab.push(new Line(new Point(100,100),new Point(rect.right - 100,100)));
    walls.tab.push(new Line(new Point(100,100),new Point(100,rect.bottom - 100)));
    walls.tab.push(new Line(new Point(100,rect.bottom - 100),new Point(rect.right - 100,rect.bottom - 100)));
    walls.tab.push(new Line(new Point(rect.right - 100,100),new Point(rect.right -100,rect.bottom - 100)));

    walls.tab.push(new Line(new Point(300,30),new Point(400,300)));

    bullets = [];
    tank = new Tank(walls);

    window.addEventListener("keydown",event => tank.move(event.key));
    canvas.addEventListener("mousemove",event => tank.setDirection(event));
    canvas.addEventListener("mousedown",() => bullets.push(new Bullet(tank.x,tank.y,tank.dir,walls)));
    setInterval(() => loop(),10);
}

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tank.draw();
    walls.tab.forEach(wall => wall.draw());
    bullets.forEach(bullet => bullet.update());
    bullets = bullets.filter(bullet => bullet.rebound!=3);
}

setup();