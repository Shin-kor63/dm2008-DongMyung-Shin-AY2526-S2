// DM2008 – Activity 5a
// Simple Colliding Circles

let balls = [];

function setup() {
  createCanvas(400, 400);

  // Step 1: Create two Ball objects
  balls.push(new Ball(100, 200, 2, 3));
  balls.push(new Ball(300, 200, -3, 2));
}

function draw() {
  background(220);

  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].bounceEdges();
    balls[i].show();

    // Step 3: Check collision with the other ball
    for (let j = i + 1; j < balls.length; j++) {
      balls[i].checkCollision(balls[j]);
    }
  }
}

class Ball {
  constructor(x, y, vx, vy) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.r = 30;
  }

  move() {
    this.pos.add(this.vel);
  }

  bounceEdges() {
    // Bounce off left and right
    if (this.pos.x < this.r || this.pos.x > width - this.r) {
      this.vel.x *= -1;
    }
    // Bounce off top and bottom
    if (this.pos.y < this.r || this.pos.y > height - this.r) {
      this.vel.y *= -1;
    }
  }

  show() {
    fill(100, 180, 220);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  // Step 4: Simple distance-based collision
  checkCollision(other) {
    let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);

    // If the distance is less than the sum of radii, they collide
    if (d < this.r + other.r) {
      // Simple bounce: Swap velocities
      let tempVel = this.vel.copy();
      this.vel = other.vel.copy();
      other.vel = tempVel;
      
      // Prevent the balls from getting stuck inside each other
      this.pos.add(this.vel);
      other.pos.add(other.vel);
    }
  }
}