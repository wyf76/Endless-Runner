class GameOverScene extends Phaser.Scene {
    constructor() {
      super("GameOverScene");
    }
  
    init(data) {
      // Receive and store the final score (already an integer)
      this.finalScore = data.score;
    }
  
    create() {
      // Display game over text and final score
      this.add.text(400, 150, "Game Over", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);
      this.add.text(400, 200, "Score: " + this.finalScore, { fontSize: "24px", fill: "#fff" }).setOrigin(0.5);
      this.add.text(400, 250, "Click to Restart", { fontSize: "20px", fill: "#fff" }).setOrigin(0.5);
  
      // Restart the game (back to MenuScene) on a pointer (mouse or touch) click
      this.input.once("pointerdown", () => {
        this.scene.start("MenuScene");
      });
    }
  }
  