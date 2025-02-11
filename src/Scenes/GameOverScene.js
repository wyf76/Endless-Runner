// scenes/GameOverScene.js
class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }
    create() {
        this.add.text(400, 200, "Game Over", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);
        this.add.text(400, 250, "Click to Restart", { fontSize: "20px", fill: "#fff" }).setOrigin(0.5);
        this.input.once("pointerdown", () => this.scene.start("MenuScene"));
    }
}