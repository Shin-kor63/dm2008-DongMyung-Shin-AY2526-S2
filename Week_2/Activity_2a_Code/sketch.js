// DM2008 — Activity 2a
// (Mode Switch, 20 min)

let x = 0;         // ellipse x-position
let size = 50;     // ellipse size
let bgColor;       // background color set by switch(key)
let dotColor;      // variable to store the ellipse color
let shapeMode = 1; 

function setup() {
  createCanvas(400, 400);
  bgColor = color(220);
  dotColor = color(0); // Initialize with black
  rectMode(CENTER);
}

function draw() {
  background(bgColor);
  
  fill(dotColor);      
  noStroke();
  
  if (shapeMode == 1) {
    ellipse(x, height / 2, size);
  } else if (shapeMode == 4) {
    triangle(x, height / 2 - size / 2, x - size / 2, height / 2 + size / 2, x + size / 2, height / 2 + size / 2);
  } else if (shapeMode == 5) {
    rect(x, height / 2, size, size);
  }
  
  x += 2;
  
  if (x > width + size / 2) {
    x = -size / 2;
  }
}

function keyPressed() {
  switch (key) {
    case '1':
      bgColor = color(200, 100, 100); 
      shapeMode = 1; // circle
      break;
    case '2':
      bgColor = color(100, 200, 100); 
      break;
    case '3':
      bgColor = color(100, 100, 200); 
      break;
    case '4':
      shapeMode = 4; // triangle
      break;
    case '5':
      shapeMode = 5; // square
      break;
    default:
      bgColor = color(220);
  }
}

function mousePressed() {
  dotColor = color(random(255), random(255), random(255));
}