// DM2008
// Activity 1b (Ryoji Ikeda)

let x;
let w;

function setup() {
  createCanvas(800, 800);
  background(255);
  noStroke();
}

function draw() {
  background(255, 10);
  
  w = random(0.1, 20);

  x = random(width);
  fill(random(255), random(255), random(255));
  rect(x, 0, w, height/10);
  
  x = random(width);
  rect(x, height/10, w, height/10);
  
  x = random(width);
  rect(x, 2 * height/10, w, height/10);
  
  x = random(width);
  rect(x, 3 * height/10, w, height/10);
  
  x = random(width);
  rect(x, 4 * height/10, w, height/10);

  x = random(width);
  rect(x, 5 * height/10, w, height/10);

  x = random(width);
  rect(x, 6 * height/10, w, height/10);

  x = random(width);
  rect(x, 7 * height/10, w, height/10);

  x = random(width);
  rect(x, 8 * height/10, w, height/10);

  x = random(width);
  rect(x, 9 * height/10, w, height/10);
}
  

// function keyPressed() {
//   saveCanvas("activity1b-image", "jpg");
// }