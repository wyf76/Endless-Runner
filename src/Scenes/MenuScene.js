// scenes/MenuScene.js
class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }
    preload() {
        this.load.image("startButton", "./assets/start_button.png");
        this.load.audio("menuMusic", "./assets/menu_music.wav");
    }
    create() {
        this.add.text(400, 100, "Endless Runner", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);
        let startButton = this.add.image(400, 300, "startButton").setInteractive().setScale(1.5);
        startButton.on("pointerdown", () => this.scene.start("GameScene"));
        this.sound.play("menuMusic", { loop: true });
    }
}