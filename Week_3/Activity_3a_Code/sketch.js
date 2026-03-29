// DM2008 — Activity 3a
// (Array Sampler, 25 min)

let palette = ["#f06449", "#009988", "#3c78d8", "#ffeb3b"];
let position = [
  {x: 200, y: 200}, 
  {x: 100, y: 100}, 
  {x: 300, y: 100}, 
  {x: 100, y: 300}, 
  {x: 300, y: 300}
];

let currentIndex = 0;
let picked;

function setup() {
  createCanvas(400, 400);
  noStroke();
  picked = random(palette);
  
  palette.push("#000", "#999");
  palette.splice(5); 
}

function draw() {
  background(220);
  fill(picked);
  
  let pos = position[currentIndex];
  
  ellipse(pos.x, pos.y, 100);
}

function mousePressed() {
  picked = random(palette);
}

function keyPressed() {
  // 4. Change the index when a key is pressed
  currentIndex++;
  
  // Reset to 0 when we reach the end of the position array
  if (currentIndex >= position.length) {
    currentIndex = 0;
  }
  
  // Log to check if the index is actually changing
  console.log("New Index:", currentIndex, "Position:", position[currentIndex]);
}

/* TODOs for students:
1. Replace colors with your own data (positions, text, sizes, etc).
2. Try mousePressed() instead of keyPressed().
3. Use push() to add new items, or splice() to remove them, then check how the sketch adapts.
4. Try looping through an array to visualize all the items within it instead of accessing one item at a time.
*/