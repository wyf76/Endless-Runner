class MenuScene extends Phaser.Scene {
    constructor() {
      super("MenuScene");
    }
  
    preload() {
      // Load menu assets.
      this.load.image("startButton", "./assets/start.png");
      this.load.audio("menuMusic", "./assets/menu_music.wav");
      // Load button click sound effect (SFX #3).
      this.load.audio("buttonClick", "./assets/button_click.wav");
    }
  
    create() {
      // Display game title.
      this.add.text(400, 100, "Endless Runner", { fontSize: "32px", fill: "#fff" }).setOrigin(0.5);
      
      // Display in-game instructions.
      this.add.text(400, 150, "Press UP or SPACE to jump", { fontSize: "20px", fill: "#fff" }).setOrigin(0.5);
      
      // Create start button.
      let startButton = this.add.image(400, 300, "startButton").setInteractive().setScale(1.0);
      startButton.on("pointerdown", () => {
        this.sound.play("buttonClick");
        this.sound.stopAll();
        this.scene.start("GameScene");
      });
      
      // Create credits button.
      let creditsButton = this.add.text(400, 350, "Credits", { fontSize: "20px", fill: "#fff" })
                                  .setOrigin(0.5)
                                  .setInteractive();
      creditsButton.on("pointerdown", () => {
        this.sound.play("buttonClick");
        this.sound.stopAll();
        this.scene.start("CreditsScene");
      });
      
      // Play looping menu music.
      this.sound.play("menuMusic", { loop: true });
    }
  }
  