class CreditsScene extends Phaser.Scene {
  constructor() {
    super("CreditsScene");
  }

  create() {
    this.add.rectangle(400, 300, 800, 600, 0xffffff, 0.7);

    const creditsText =
      "Credits:\n\n" +
      "Game Design & Programming: Yufan Weng\n" +
      "Artwork: Yufan Weng\n" +
      "Music: https://freesound.org/\n" +
      "Sound Effects: https://freesound.org/\n\n" +
      "Click anywhere to return to Menu";

    // Use a dark fill color (black) for high contrast against the light rectangle/background.
    this.add.text(400, 300, creditsText, {
      fontSize: "18px",
      fill: "#000",   // Changed from white (#fff) to black (#000)
      align: "center"
    }).setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }
}
