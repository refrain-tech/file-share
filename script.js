'use strict';

class Gravity {
  #rad2deg = rad => rad * Math.PI / 180;
  
  pow = 0;
  rad = 0;
  vel = 0;
  
  constructor (pow, rad, vel) {
    this.pow = pow;
    this.rad = rad;
    this.vel = vel;
  }
}

class Point {
  color = 'red';
  gravity = null;
  x = 0;
  y = 0;
  
  constructor (x, y, color, gravity) {
    this.color = color;
    this.gravity = gravity;
    this.x = x;
    this.y = y;
  }
  
  synthesis (target) {
    const {gravity: {
      pow: g1_pow, rad: g1_rad, vel: g1_vel
    }, x: x1, y: y1} = this;
    const {gravity: {
      pow: g2_pow, rad: g2_rad, vel: g2_vel
    }, x: x2, y: y2} = target;
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    const g_rad = Math.atan(dy, dx);
    const g_pow = g2_pow / (dx ** 2 + dy ** 2) ** 0.5;
    
    const x = g1_vel * Math.cos(g1_rad) + g_pow * Math.cos(g_rad);
    const y = g1_vel * Math.sin(g1_rad) + g_pow * Math.sin(g_rad);
    
    const rad = Math.atan(y, x);
    const vel = (x ** 2 + y ** 2) ** 0.5;
    
    this.rad = rad;
    this.vel = vel;
    this.x += Math.cos(rad) * vel;
    this.y += Math.sin(rad) * vel;
  }
}




const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const points = [];
const colors = ['red', 'green', 'blue', 'magenta', 'yellow', 'cyan'];

const rand = max => Math.random() * max;

main();

function main () {
  for (let i = 0; i < 100; i ++) {
    points[i] = create();
  }
  points[0] = new Point(canvas.width / 2, canvas.height / 2, 'black', new Gravity(10, 0, 0));
  requestAnimationFrame(render);
  // canvas.onclick = render;
}


function render () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
  points.forEach(({color, gravity: {pow, rad}, x, y}, i) => {
    pow *= (i? 10: 10);
    context.fillStyle = color;
    context.fillRect(x - pow / 2, y - pow / 2, pow, pow);
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 10 * pow * Math.cos(rad), y + 10 * pow * Math.sin(rad));
    context.closePath();
    context.stroke();
  });
  const temp = [...points];
  points.forEach((point, i) => {
    if (i) point.synthesis(points[0]);
    /*temp.filter(p => p !== point).forEach(target => {
      point.synthesis(target);
    });
    /*point.x %= canvas.width;
    point.y %= canvas.height;*/
    if (point.x < 0 || point.x >= canvas.width ||
        point.y < 0 || point.y >= canvas.height) {
      points[i] = create();
    }
  });
  points[0].x = canvas.width / 2;
  points[0].y = canvas.height / 2;
  requestAnimationFrame(render);
}

function create () {
  let rad = rand(2) * Math.PI;
  const x = canvas.width / 2 + Math.cos(rad) * rand(canvas.width / 2);
  const y = canvas.height / 2 + Math.sin(rad) * rand(canvas.height / 2);
  rad += Math.PI / 2;
  const gravity = new Gravity(rand(0.1), rad, rand(10));
  const point = new Point(x, y, colors[rand(colors.length) | 0], gravity);
  return point;
}