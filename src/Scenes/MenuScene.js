class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.audio("menuMusic", "./assets/menu_music.wav");
        this.load.audio("buttonClick", "./assets/button_click.wav");
    }

    create() {
        // Set background color (optional)
        this.cameras.main.setBackgroundColor("#32CD32"); // Same green as before

        // Game Title
        this.add.text(400, 80, "Endless Runner", { 
            fontSize: "40px", 
            fill: "#000", 
            fontFamily: "monospace" 
        }).setOrigin(0.5);

        // Add a semi-transparent black rectangle to improve text readability
        this.add.rectangle(400, 150, 500, 90, 0x000000, 0.5);

        // Instructions text
        this.add.text(400, 150, 
            "INSTRUCTIONS:\n- Press UP or SPACE to jump.\n- Avoid obstacles and survive.\n- Your high score is saved.", 
            { fontSize: "18px", fill: "#fff", align: "center", fontFamily: "monospace" }
        ).setOrigin(0.5);

        // Create start button using text
        let startButton = this.add.text(400, 250, "START", { 
            fontSize: "48px", 
            fill: "#000", 
            fontFamily: "monospace", 
            fontStyle: "bold"
        }).setOrigin(0.5).setInteractive();

        startButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.scene.start("GameScene");
        });

        // Create credits button
        let creditsButton = this.add.text(400, 350, "Credits", { 
            fontSize: "24px", 
            fill: "#000", 
            fontFamily: "monospace"
        }).setOrigin(0.5).setInteractive();

        creditsButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.scene.start("CreditsScene");
        });

        // Play menu music
        this.sound.play("menuMusic", { loop: true });
    }
}
