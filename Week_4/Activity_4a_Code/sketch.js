// DM2008 – Activity 4a
// Bake a Cookie (30 min)

let cookie;

// Step 1: define the Cookie class
class Cookie {
  constructor(flavor, sz, x, y) {
    // set up required properties
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
  }

// Step 2: display the cookie
  show() {
    if (this.flavor == "choco-chip") {
        fill(196, 146, 96);
    } else if (this.flavor == "plain") {
        fill(220, 180, 120);
    } else if (this.flavor == "strawberry") {
        fill(255, 182, 193);
    }
    
    ellipse(this.x, this.y, this.sz);
    
    const s = this.sz*0.1;
    
    if (this.flavor == "choco-chip") {
      fill(60, 30, 0);
    } else {
      fill(255);
    }
    
    ellipse(this.x - this.sz*0.22, this.y - this.sz*0.15, s);
    ellipse(this.x + this.sz*0.18, this.y - this.sz*0.10, s);
    ellipse(this.x - this.sz*0.05, this.y + this.sz*0.12, s);
    ellipse(this.x + this.sz*0.20, this.y + this.sz*0.18, s);
  }
}

function setup() {
  createCanvas(400, 400);
  noStroke();
  // Step 3: make one cookie object
  cookie = new Cookie("choco-chip", 80, width/2, height/2);
}

function draw() {
  background(230);
  cookie.show();
}

// Step 5: add movement (keyboard arrows)
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    cookie.x -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    cookie.x += 10;
  } else if (keyCode === UP_ARROW) {
    cookie.y -= 10;
  } else if (keyCode === DOWN_ARROW) {
    cookie.y += 10;
  }
}

// Step 6: add flavor randomizer (mouse click)
function mousePressed() {
  let flavors = ["choco-chip", "plain", "strawberry"];
  cookie.flavor = random(flavors);
}