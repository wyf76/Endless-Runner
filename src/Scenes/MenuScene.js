class MenuScene extends Phaser.Scene {
    constructor() {
      super("MenuScene");
    }
  
    preload() {
      // Load assets for the menu.
      this.load.image("startButton", "./assets/start.png");
      this.load.audio("menuMusic", "./assets/menu_music.wav");
    }
  
    create() {
      // Display game title.
      this.add.text(400, 100, "Endless Runner", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);
  
      // Create start button to begin the game.
      let startButton = this.add.image(400, 300, "startButton").setInteractive().setScale(1.0);
      startButton.on("pointerdown", () => {
        this.sound.stopAll();
        this.scene.start("GameScene");
      });
  
      // Create credits button.
      let creditsButton = this.add.text(400, 350, "Credits", { fontSize: "20px", fill: "#fff" })
                                  .setOrigin(0.5)
                                  .setInteractive();
      creditsButton.on("pointerdown", () => {
        this.sound.stopAll();
        this.scene.start("CreditsScene");
      });
  
      // Play looping menu music.
      this.sound.play("menuMusic", { loop: true });
    }
  }
  