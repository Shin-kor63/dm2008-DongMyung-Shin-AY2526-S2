let player;
let obstacles = [];
let greenItems = [];
let rails = 2;
let currentStep = 1; 
let gameStartTime = 0; 
let lastObstacleTime = 0;
let lastGreenItemTime = 0;
let gameState = "START";
let winTimer = 0;
let digitalFont = 'Courier New'; 
let globalSpeed = 5; 
let hitEffectTimer = 0;

// Music
let bgm, clickSound, failSound, clearSound, itemSound;
let hasPlayedClearSound = false; 

function preload() {
  bgm = loadSound('Background music.wav');
  clickSound = loadSound('Click_soundreality-sound-of-mouse-click-4-478760.mp3');
  failSound = loadSound('Failed-sfx-438248.mp3');
  clearSound = loadSound('Happy_sergequadrado-announcement-sound-4-21464.mp3');
  itemSound = loadSound('Electronic-click-472367.mp3'); 
}

function setup() {
  createCanvas(800, 600);
  clickSound.rate(1.5); 

}

function draw() {
  manageBGM();

  if (gameState === "START") {
    drawStartScreen();
  } else if (gameState === "PLAY") {
    playGame();
  } else if (gameState === "WIN_SEQUENCE") {
    playWinSequence();
  } else if (gameState === "CLEAR") {
    drawClearScreen();
  } else if (gameState === "GAMEOVER") {
    drawGameOver();
  }
}

function playGame() {
  background(255);
  drawIkedaBackground();

  let playTime = millis() - gameStartTime;
  
  // Speed
  let baseSpeed = 4 + (currentStep - 1) * 2; 
  globalSpeed = baseSpeed;

  // 15s
  if (playTime - lastGreenItemTime > 15000) {
    greenItems.push(new GreenItem());
    lastGreenItemTime = playTime;
  }

  // Difficulty
  let baseInterval;
  let maxSpawn;

  if (currentStep === 1) {
    baseInterval = 1000; 
    maxSpawn = 1;
  } else if (currentStep === 2) {
    baseInterval = 800;
    maxSpawn = 2;
  } else {
    baseInterval = 400;
    maxSpawn = min(rails - 1, 4);
  }

  if (millis() - lastObstacleTime > baseInterval) {
    let spawnCount = floor(random(1, maxSpawn + 1)); 
    let availableRails = [];
    for(let i=0; i<rails; i++) availableRails.push(i);
    
    for(let i=0; i < spawnCount; i++) {
        if (availableRails.length === 0) break;
        let randomIndex = floor(random(availableRails.length));
        let selectedRail = availableRails.splice(randomIndex, 1)[0];
        
        let verticalBuffer = i * (player.h * 2); 
        let randomExtra = random(0, 200); 
        obstacles.push(new Obstacle(selectedRail, verticalBuffer + randomExtra));
    }
    lastObstacleTime = millis() + random(-50, 150); 
  }

  // Player
  player.update();
  player.display();
  
  // Dead
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].display();

    if (obstacles[i].hits(player)) {
      if (currentStep > 1) {
        currentStep--; 
        
        if (rails > 2) {
          rails -= 1; 
          player.railIdx = min(player.railIdx, rails - 1); 
        }
        
        obstacles.splice(i, 1);
        hitEffectTimer = 10;
        continue;
      } else {
        failSound.play(); 
        gameState = "GAMEOVER";
        return;
      }
    }
    if (obstacles[i] && obstacles[i].offscreen()) obstacles.splice(i, 1);
  }

  // Item logic
  for (let i = greenItems.length - 1; i >= 0; i--) {
    greenItems[i].update();
    greenItems[i].display();

    if (greenItems[i].hits(player)) {
      itemSound.play(); 
      rails += 1;
      currentStep++;
      greenItems.splice(i, 1);
      
      if (currentStep === 4) {
        gameState = "WIN_SEQUENCE";
        winTimer = millis();
      }
      continue;
    }
    if (greenItems[i] && greenItems[i].offscreen()) greenItems.splice(i, 1);
  }
  
  if (hitEffectTimer > 0) {
    translate(random(-3, 3), random(-3, 3));
    hitEffectTimer--;
  }
}

// UI

function drawStartScreen() {
  background(255); // 흰색 배경
  fill(0); 
  textFont(digitalFont);
  textAlign(CENTER, CENTER);

  // Title
  textSize(80);
  text("DATATIDE", width / 2, height / 2 - 30);

  // Trinkle Trinkle
  textSize(24);
  if (floor(millis() / 500) % 2 === 0) {
    text("Press RIGHT ARROW to start", width / 2, height / 2 + 50);
  }
}

function drawIkedaBackground() {
  strokeWeight(0.5); 
  for(let i = 0; i < width; i += 40) { 
    stroke(242); 
    line(i, 0, i, height);
  }

  stroke(225);
  strokeWeight(1);
  let rw = width / rails;
  for (let i = 0; i <= rails; i++) {
    line(i * rw, 0, i * rw, height);
  }
}

function playWinSequence() {
  let elapsed = millis() - winTimer;
  background(0, 255, 0);
  fill(0);
  textFont(digitalFont);
  textAlign(CENTER);
  textSize(30);
  text("SYSTEM LOADING...", width / 2, height / 2);
  if (elapsed > 3000) gameState = "CLEAR";
}

function drawGameOver() {
  background(0);
  fill(255, 0, 0);
  textFont(digitalFont);
  textAlign(CENTER);
  textSize(50);
  text("CRITICAL ERROR", width / 2, height / 2);
  textSize(20);
  text("PRESS R TO REBOOT", width / 2, height / 2 + 60);
}

function drawClearScreen() {
  background(0, 255, 0);
  
  if (!hasPlayedClearSound) {
    clearSound.play();
    hasPlayedClearSound = true;
  }
  
  fill(0);
  textFont(digitalFont);
  textAlign(CENTER);
  textSize(40);
  text("Game clear!", width / 2, height / 2);
  textSize(30);
  text("Congratulations!", width / 2, height / 2 + 60);
}

// Start
function keyPressed() {
  if (gameState === "START") {
    if (keyCode === RIGHT_ARROW) {
      clickSound.play();
      resetGame(); 
    }
  } 

  else if (gameState === "PLAY") {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
      clickSound.play(); 
      
      if (keyCode === LEFT_ARROW) player.move(-1);
      if (keyCode === RIGHT_ARROW) player.move(1);
    }
  }
  
  if ((gameState === "GAMEOVER" || gameState === "CLEAR") && (key === 'r' || key === 'R')) {
    resetGame();
  }
}

function resetGame() {
  gameStartTime = millis();
  lastObstacleTime = millis();
  lastGreenItemTime = 0; 
  rails = 2;
  currentStep = 1;
  obstacles = [];
  greenItems = [];
  player = new Player();
  gameState = "PLAY";
  globalSpeed = 4;
  hitEffectTimer = 0;
  hasPlayedClearSound = false; 
  if (bgm) bgm.stop(); 
}

function manageBGM() {
  if (gameState === "PLAY") {
    if (!bgm.isPlaying()) {
      bgm.loop();
      bgm.setVolume(0.4);
    }
    let targetRate = 1.0 + (currentStep - 1) * 0.15; 
    let targetVol = 0.4 + (currentStep - 1) * 0.1;   
    
    bgm.rate(lerp(bgm.rate(), targetRate, 0.05));
    bgm.setVolume(lerp(bgm.getVolume(), targetVol, 0.05));
  } else {
    if (bgm && bgm.isPlaying()) {
      bgm.stop();
    }
  }
}

// Player, Item
class Player {
  constructor() {
    this.railIdx = 0;
    this.h = 44; 
  }
  update() {
    let rw = width / rails;
    this.x = (this.railIdx * rw) + (rw / 2);
    this.y = height - 100;
  }
  display() {
    let rw = width / rails;
    let pw = rw / 3; 
    let padding = 6; 
    
    let innerW = pw - (padding * 2);
    let innerH = this.h - (padding * 2);
    let cw = innerW / 3; 

    rectMode(CENTER);
    
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(this.x, this.y, pw, this.h);

    noStroke();
    fill(0, 255, 0);
    let innerXStart = this.x - innerW / 2;
    
    if (currentStep >= 2) {
      rect(innerXStart + cw / 2, this.y, cw, innerH);
    } 
    if (currentStep >= 3) {
      rect(innerXStart + cw * 1.5, this.y, cw, innerH);
      stroke(255);
      strokeWeight(1);
      line(innerXStart + cw, this.y - innerH/2, innerXStart + cw, this.y + innerH/2);
    } 
    if (currentStep >= 4) {
      noStroke();
      fill(0, 255, 0);
      rect(innerXStart + cw * 2.5, this.y, cw, innerH);
      stroke(255);
      strokeWeight(1);
      line(innerXStart + cw * 2, this.y - innerH/2, innerXStart + cw * 2, this.y + innerH/2);
    }
  }
  move(dir) {
    this.railIdx = constrain(this.railIdx + dir, 0, rails - 1);
  }
}

class Obstacle {
  constructor(rail, yOffset) {
    this.railIdx = rail; 
    let h_prob = random();
    
    if (h_prob < 0.85) this.h = random(1, 10);
    else this.h = random(15, 30);
    
    this.y = -this.h - yOffset; 
  }
  update() { 
    this.y += globalSpeed; 
  }
  display() {
    fill(0);
    noStroke();
    rectMode(CORNER);
    let rw = width / rails;
    rect(this.railIdx * rw, this.y, rw, this.h);
  }
  hits(p) {
    let rw = width / rails;
    return (this.y + this.h > 0 && 
            this.railIdx === p.railIdx && 
            this.y + this.h > p.y - p.h/2 && 
            this.y < p.y + p.h/2);
  }
  offscreen() { return this.y > height; }
}

class GreenItem {
  constructor() {
    this.railIdx = floor(random(rails));
    this.size = 40; 
    this.y = -this.size;
  }
  update() { 
    this.y += globalSpeed * 0.6; 
  }
  display() {
    fill(0, 255, 0);
    noStroke();
    rectMode(CENTER);
    let rw = width / rails;
    let rx = (this.railIdx * rw) + (rw / 2);
    rect(rx, this.y, this.size, this.size);
  }
  hits(p) {
    let rw = width / rails;
    let rx = (this.railIdx * rw) + (rw / 2);
    let d = dist(rx, this.y, p.x, p.y);
    return d < 35;
  }
  offscreen() { return this.y > height; }
}