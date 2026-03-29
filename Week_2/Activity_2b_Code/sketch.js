// DM2008 — Activity 2b

let shift = 0;       
let spacing = 32;     
let speed = 1;        

let bgColor;
let colorA;
let colorB;

function setup() {
  createCanvas(400, 400);
  noStroke();

  bgColor = color(240);
  colorA = color(20);
  colorB = color(180);
}

  function draw() {
  background(bgColor);


  shift += speed;

    
  if (shift >= spacing) {
    shift -= spacing;
  }

  for (let row = 0; row < 2; row++) {
    let y = height / 2;
    if (row == 0) y -= 22;
    else y += 22;

    // pattern
    for (let i = -spacing; i < width + spacing; i += spacing) {
      let x = i + shift;

      // color
      if (i % (spacing * 2) == 0) {
        fill(colorA);
      } else {
        fill(colorB);
      }

      ellipse(x, y, 7, 7);
    }
  }
}

function keyPressed() {
  switch (key) {
    case '1': // Palette 1 (light)
      bgColor = color(240);
      colorA = color(20);
      colorB = color(180);
      break;

    case '2': // Palette 2 (dark)
      bgColor = color(20);
      colorA = color(255);
      colorB = color(120);
      break;
  }
}

