# DATATIDE

DATATIDE is a minimal 2D survival arcade game built with p5.js. The visual style and sound design were inspired by the digital artworks of Ryoji Ikeda, expressing the concept of navigating through a "wave of data" using strictly minimalistic elements.

## Gameplay Overview
The player moves across vertical rails, dodging falling black blocks while collecting green items. The game difficulty dynamically scales based on the player's level.

### Controls
* `Left Arrow` / `Right Arrow`: Move between rails
* `R`: Restart the game (on Game Over or Clear screens)

### Rules
* **Obstacles (Black Blocks):** Hitting a black block decreases your level and removes a rail. Hitting an obstacle at Level 1 results in a Game Over.
* **Items (Green Blocks):** Spawns every 15 seconds. Collecting a green block adds a new rail, increases the game speed, and raises your level.
* **Clear Condition:** Upgrade your system to Level 4 to win the game.

## Tech Stack
* **Language:** JavaScript
* **Libraries:** p5.js, p5.sound

## How to Run Locally
Because this project loads local audio files, it must be run on a local web server to avoid CORS (Cross-Origin Resource Sharing) errors.

1. Clone this repository:
   ```bash
   git clone [https://github.com/your-username/datatide.git](https://github.com/your-username/datatide.git)
