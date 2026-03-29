// DM2008 — Activity 3b
// (One Function Wonder, 20 min)
	
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);

  push();                              
  translate(width/2, height/2);       
  rotate(PI / 4);                   
  recflower(0, 0, 40, 40);             
  recflower02( 0, 0, 40, 40);
  pop();
}

// Custom function
function recflower(x, y, w, h) {
  noStroke();
  fill("#6600cc");
  rect(x, y - h, w/2, h * 1.5);
  rect(x, y + h, w/2, h * 1.5);
  rect(x - w, y, w * 1.5, h/2);
  rect(x + w, y, w * 1.5, h/2);
   fill("#0000cc");
  rotate(PI / 4); 
  rect(x, y - h, w/2, h * 1.5);
  rect(x, y + h, w/2, h * 1.5);
  rect(x - w, y, w * 1.5, h/2);
  rect(x + w, y, w * 1.5, h/2);
}
function recflower02(x, y, w, h) {
   fill("#6600cc");
  rect(x, y - h, w/2, h * 1.5);
  rect(x, y + h, w/2, h * 1.5);
  rect(x - w, y, w * 1.5, h/2);
  rect(x + w, y, w * 1.5, h/2);
   fill("#0000cc");
  rotate(PI / 4); 
  rect(x, y - h, w/2, h * 1.5);
  rect(x, y + h, w/2, h * 1.5);
  rect(x - w, y, w * 1.5, h/2);
  rect(x + w, y, w * 1.5, h/2);
}


  // TODO 1:
  // Define a function that draws something (a shape or group of shapes).
  // It should take at least one parameter (e.g., position, size, or color).

  // TODO 2:
  // Call your function multiple times with different parameter values.
  // myShape(100, 200, 50);
  // myShape(300, 200, 80);

  // TODO 3:
  // (Challenge) Call your function inside a for loop
  // to create a repeating pattern or variation.

// Example starter function:
// function myShape(x, y, s) {
//   ellipse(x, y, s, s);
// }