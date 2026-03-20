// DM2008 — Mini Project
// PONG (Starter Scaffold)

// Notes for students:
// 1) Add paddle controls (W/S and ↑/↓) inside handleInput()
// 2) Add scoring + reset when the ball goes past a paddle
// 3) (Optional) Add win conditions / start + game-over states

/* ----------------- Globals ----------------- */
let leftPaddle, rightPaddle, ball;

let leftScore = 0;
let rightScore = 0;

let gameState = "start";
const WIN_SCORE = 7; 

/* ----------------- Setup & Draw ----------------- */
function setup() {
  createCanvas(640, 360);
  noStroke();

  // paddles: x, y, w, h
  leftPaddle  = new Paddle(30, height / 2 - 30, 10, 60);
  rightPaddle = new Paddle(width - 40, height / 2 - 30, 10, 60);

    // ball starts center (students: make it move by uncommenting code in Ball constructor)
  ball = new Ball(width / 2, height / 2, 8);

  ball.reset(false);
}

function draw() {
  background(18);

  // draw UI first
  drawCourt();
  drawHUD();

  // (Optional) start state
  if (gameState === "start") {
    drawCenterMessage("Press SPACE to Start");
    return;
  }

  // (Optional) gameover state
  if (gameState === "gameover") {
    const winner = leftScore > rightScore ? "LEFT" : "RIGHT";
    drawCenterMessage(`${winner} WINS!\nPress R to Restart`);
    return;
  }

  // 1) read input (students: add paddle movement here)
  handleInput();

  // 2) update world
  leftPaddle.update();
  rightPaddle.update();
  ball.update();

  // 3) handle collisions
  ball.checkWallBounce(); // top & bottom
  ball.checkPaddleBounce(leftPaddle);
  ball.checkPaddleBounce(rightPaddle);

  // 4) scoring + reset when ball goes past a paddle
  checkScoringAndReset();

  // 5) draw objects
  leftPaddle.show();
  rightPaddle.show();
  ball.show();
}

/* ----------------- Input ----------------- */
function handleInput() {
  // Default to stopped unless a key is pressed
  leftPaddle.vy = 0;
  rightPaddle.vy = 0;

  // LEFT paddle: W/S
  if (keyIsDown(87)) leftPaddle.vy = -leftPaddle.speed; // W
  if (keyIsDown(83)) leftPaddle.vy = leftPaddle.speed;  // S

  // RIGHT paddle: Up/Down
  if (keyIsDown(UP_ARROW)) rightPaddle.vy = -rightPaddle.speed;
  if (keyIsDown(DOWN_ARROW)) rightPaddle.vy = rightPaddle.speed;
}

function keyPressed() {
  if (keyCode === 32) { // SPACE
    if (gameState === "start") {
      gameState = "play";
      ball.reset(true); // serve on start
    }
  }

  if (key === "r" || key === "R") {
    if (gameState === "gameover") restartGame();
  }
}

function restartGame() {
  leftScore = 0;
  rightScore = 0;
  gameState = "start";

  leftPaddle.pos.y = height / 2 - leftPaddle.h / 2;
  rightPaddle.pos.y = height / 2 - rightPaddle.h / 2;

  ball.reset(false); // reset but don't auto-serve on start screen
}

/* ----------------- Scoring Logic ----------------- */
// TODO (students): detect when ball passes left or right edge
    // Add scoring and reset the ball to center
    // Hints:
    // if (this.pos.x + this.r < 0) { 
    //   /* right player scores - add to their score */ 
    //   this.reset();
    // }
    // if (this.pos.x - this.r > width) { 
    //   /* left player scores - add to their score */ 
    //   this.reset();
    // }
function checkScoringAndReset() {
  // Right player scores if the ball goes past the left edge
  if (ball.pos.x + ball.r < 0) {
    rightScore++;
    ball.reset(true);
  }

  // Left player scores if the ball goes past the right edge
  if (ball.pos.x - ball.r > width) {
    leftScore++;
    ball.reset(true);
  }

  // (Optional) win condition
  if (leftScore >= WIN_SCORE || rightScore >= WIN_SCORE) {
    gameState = "gameover";
    ball.reset(false);
  }
}

/* ----------------- Classes ----------------- */
class Paddle {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.vy = 0;     // current velocity (students will change this via input)
    this.speed = 5;  // how fast the paddle moves
  }

  update() {
    // basic vertical movement; constrained to canvas
    this.pos.y += this.vy;
    this.pos.y = constrain(this.pos.y, 0, height - this.h);
  }

  show() {
    fill(220);
    rect(this.pos.x, this.pos.y, this.w, this.h, 2);
  }
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;

    // separate speed components (easier for students to adjust)
    this.xSpeed = 3.5;  // horizontal speed (try 2-5)
    this.ySpeed = 2.0;  // vertical speed (try 1-4)

    this.vel = createVector(0, 0); // actual velocity vector
    
     // TODO (students): uncomment to start ball moving immediately
    // this.vel.x = random([-1, 1]) * this.xSpeed;
    // this.vel.y = random([-1, 1]) * this.ySpeed;
  }

  update() {
    this.pos.add(this.vel);
  }

  checkWallBounce() {
    // bounce off top/bottom walls
    if (this.pos.y - this.r <= 0 || this.pos.y + this.r >= height) {
      this.vel.y *= -1;
      this.pos.y = constrain(this.pos.y, this.r, height - this.r);
    }
  }

  checkPaddleBounce(paddle) {
    // Box collision detection (simple & forgiving)
    const withinY = this.pos.y > paddle.pos.y && this.pos.y < paddle.pos.y + paddle.h;
    const withinX = this.pos.x + this.r > paddle.pos.x && this.pos.x - this.r < paddle.pos.x + paddle.w;

    if (withinX && withinY) {
      // push ball out so it doesn't get stuck
      if (this.vel.x < 0) {
        this.pos.x = paddle.pos.x + paddle.w + this.r;
      } else {
        this.pos.x = paddle.pos.x - this.r;
      }

      this.vel.x *= -1; // reflect horizontally

      // TODO (students): add some angle variation based on where ball hits paddle
      // Hint: this.vel.y += (this.pos.y - paddle.pos.y - paddle.h/2) * 0.1;
      this.vel.y += (this.pos.y - paddle.pos.y - paddle.h / 2) * 0.08;
    }
  }

  show() {
    fill(255, 170, 70);
    circle(this.pos.x, this.pos.y, this.r * 2);
  }

  reset(autoServe) {
    // return ball to center and give it a random direction
    this.pos.set(width / 2, height / 2);

    if (!autoServe) {
      this.vel.set(0, 0);
      return;
    }

    // use the xSpeed and ySpeed properties for consistent behavior
    const xDir = random([-1, 1]); // randomly left or right
    const yDir = random([-1, 1]); // randomly up or down
    this.vel.set(xDir * this.xSpeed, yDir * this.ySpeed);
  }
}

/* ----------------- UI helpers ----------------- */
function drawCourt() {
  // center line (dashed)
  stroke(80);
  strokeWeight(2);
  for (let y = 10; y < height; y += 18) {
    line(width / 2, y, width / 2, y + 8);
  }
  noStroke();
}

function drawHUD() {
  fill(220);
  textAlign(CENTER, TOP);
  textSize(20);
  text(leftScore, width / 2 - 60, 12);
  text(rightScore, width / 2 + 60, 12);

  // win target
  textSize(12);
  fill(160);
  text(`First to ${WIN_SCORE}`, width / 2, 36);
}

function drawCenterMessage(msg) {
  fill(240);
  textAlign(CENTER, CENTER);
  textSize(22);
  text(msg, width / 2, height / 2);
}