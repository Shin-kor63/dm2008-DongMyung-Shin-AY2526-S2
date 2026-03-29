// DDM2008
// Activity 1a

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);
  
  // black body
  fill(0);
  noStroke();
  triangle(200, 130, 200, 50, 250, 130); // triangle(250-50, 150-20, ...)
  rect(150, 130, 100, 50);
  rect(180, 110, 80, 80); 
  quad(190, 195, 180, 330, 290, 330, 250, 195);
  rect(160, 300, 30, 30);
  ellipse(190, 205, 20, 20);
  triangle(290, 330, 290, 200, 270, 310);
  
  // face
  fill(255);
  noStroke();
  ellipse(200, 130, 15, 15);
  triangle(153, 135, 153, 152, 168, 135);
  
  // zigzag mouth
  stroke(255); 
  strokeWeight(2);
  line(150, 160, 160, 170); 
  line(160, 170, 170, 160); 
  line(170, 160, 180, 170); 
  line(180, 170, 190, 160); 
  line(190, 160, 200, 170);
  line(200, 170, 210, 160);

  // YOUR CODE HERE
  
  // helperGrid(); // do not edit or remove this line
}