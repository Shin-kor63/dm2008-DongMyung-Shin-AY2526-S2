// DM2008 — Activity 3c
// (Painting App, 40 min)

// 1) Palette + size
const palette = ["#f06449", "#009988", "#3c78d8", "#ffeb3b", '#ffffff'];
let colorIndex = 0;
let sizeVal = 20;

// 2) Brush registry (array of functions)
const brushes = [brushCircle, brushSquare, brushStreak];
let currentBrush = 0; // 0, 1, or 2

function setup() {
  createCanvas(600, 600);
  background(255);
  rectMode(CENTER);
}

function draw() {
  // paint only while mouse is held
  if (mouseIsPressed) {
    const col = palette[colorIndex];
    
    // call the selected brush function
    brushes[currentBrush](mouseX, mouseY, col, sizeVal);
  }
}

// 2. Brush functions
function brushCircle(x, y, c, s) {
  fill(c);
  noStroke();
  ellipse(x, y, s);
}

function brushSquare(x, y, c, s) {
  push();
  translate(x, y);
  noStroke();
  fill(c);
  rect(0, 0, s, s);
  pop();
}

function brushStreak(x, y, c, s) {
  stroke(c);
  strokeWeight(max(2, s / 8));
  point(x,y);
}

// 3. Input handling
function keyPressed() {
  // select brush
  if (key === '1') currentBrush = 0;
  if (key === '2') currentBrush = 1;
  if (key === '3') currentBrush = 2;

  // cycle color
  if (key === 'c' || key === 'C') {
    colorIndex = (colorIndex + 1) % (palette.length - 1);
  }

  // change size
  if (key === '=' || key === '+') {
    sizeVal += 5;
  }
  if (key === '-' || key === '_') {
    sizeVal = max(5, sizeVal - 5);
  }

  // eraser (uses background color)
  if (key === 'e' || key === 'E') {
    colorIndex = 4;
  }

  // clear canvas
  if (key === 'x' || key === 'X') {
    background(255);
  }
}